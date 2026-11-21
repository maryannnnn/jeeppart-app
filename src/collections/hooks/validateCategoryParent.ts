import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, PayloadRequest } from 'payload'
import { APIError } from 'payload'

type RelationValue = number | string | { id?: number | string | null } | null | undefined

export function relationId(value: RelationValue): number | string | null {
  if (value == null || value === '') return null
  if (typeof value === 'number' || typeof value === 'string') return value
  if (typeof value === 'object' && value.id != null) return value.id
  return null
}

async function collectDescendantIds(
  req: PayloadRequest,
  categoryId: number | string,
  collected: Array<number | string> = [],
): Promise<Array<number | string>> {
  const children = await req.payload.find({
    collection: 'categories',
    depth: 0,
    limit: 500,
    pagination: false,
    req,
    where: {
      parent: {
        equals: categoryId,
      },
    },
  })

  for (const child of children.docs) {
    collected.push(child.id)
    await collectDescendantIds(req, child.id, collected)
  }

  return collected
}

export async function categoryParentFilter({
  id,
  req,
}: {
  id?: number | string
  req: PayloadRequest
}) {
  if (!id) return true

  const excluded = [id, ...(await collectDescendantIds(req, id))]

  return {
    id: {
      not_in: excluded,
    },
  }
}

async function levelForParent(req: PayloadRequest, parentId: number | string | null) {
  if (!parentId) return 1

  const seen = new Set<string>()
  let current: number | string | null = parentId
  let level = 1

  while (current) {
    const key = String(current)
    if (seen.has(key)) {
      throw new APIError('Обнаружена циклическая связь категорий.', 400)
    }
    seen.add(key)
    level += 1

    const parent = await req.payload.findByID({
      collection: 'categories',
      depth: 0,
      id: current,
      req,
    })

    current = relationId(parent.parent as RelationValue)
  }

  return level
}

export const validateCategoryParent: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  const parentId = relationId(data?.parent as RelationValue)
  const ownId = originalDoc?.id

  if (ownId && parentId && String(parentId) === String(ownId)) {
    throw new APIError('Категория не может быть родителем самой себя.', 400)
  }

  if (ownId && parentId) {
    const descendants = await collectDescendantIds(req, ownId)
    if (descendants.some((descendantId) => String(descendantId) === String(parentId))) {
      throw new APIError('Нельзя выбрать дочернюю категорию в качестве родителя.', 400)
    }
  }

  data.level = await levelForParent(req, parentId)

  return data
}

async function refreshDescendantLevels(req: PayloadRequest, categoryId: number | string) {
  const children = await req.payload.find({
    collection: 'categories',
    depth: 0,
    limit: 500,
    pagination: false,
    req,
    where: {
      parent: {
        equals: categoryId,
      },
    },
  })

  for (const child of children.docs) {
    await req.payload.update({
      collection: 'categories',
      id: child.id,
      context: {
        skipCategoryLevelCascade: true,
      },
      data: {
        parent: child.parent,
      },
      depth: 0,
      req,
    })

    await refreshDescendantLevels(req, child.id)
  }
}

export const cascadeCategoryLevels: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context.skipCategoryLevelCascade) return doc

  const parentChanged =
    String(relationId(previousDoc?.parent) ?? '') !== String(relationId(doc.parent) ?? '')
  const levelChanged = previousDoc?.level !== doc.level

  if (previousDoc && !parentChanged && !levelChanged) return doc

  await refreshDescendantLevels(req, doc.id)

  return doc
}
