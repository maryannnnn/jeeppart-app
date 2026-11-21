import { getPayload, type Where } from 'payload'

import config from '../src/payload.config'
import { jeepCategories, type JeepCategoryNode } from '../src/data/jeep-categories'

type Stats = {
  created: number
  updated: number
}

function parentConstraint(parentId: number | null): Where {
  if (parentId) {
    return {
      parent: {
        equals: parentId,
      },
    }
  }

  return {
    or: [
      {
        parent: {
          exists: false,
        },
      },
      {
        parent: {
          equals: null,
        },
      },
    ],
  }
}

async function upsertCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  node: JeepCategoryNode,
  parentId: number | null,
  displayOrder: number,
  stats: Stats,
) {
  const existing = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: node.slug,
          },
        },
        parentConstraint(parentId),
      ],
    },
  })

  const data = {
    displayOrder,
    generateSlug: false,
    parent: parentId,
    slug: node.slug,
    title: node.title,
  }

  const category = existing.docs[0]
    ? await payload.update({
        collection: 'categories',
        data,
        depth: 0,
        id: existing.docs[0].id,
      })
    : await payload.create({
        collection: 'categories',
        data,
        depth: 0,
      })

  if (existing.docs[0]) stats.updated += 1
  else stats.created += 1

  for (const [index, child] of node.children.entries()) {
    await upsertCategory(payload, child, category.id, index + 1, stats)
  }

  return category
}

async function verifyHierarchy(payload: Awaited<ReturnType<typeof getPayload>>) {
  const suspension = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 1,
    where: {
      and: [{ slug: { equals: 'podveska' } }, parentConstraint(null)],
    },
  })
  const parent = suspension.docs[0]
  if (!parent) throw new Error('Подвеска was not imported')

  const shock = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 1,
    where: {
      and: [{ slug: { equals: 'amortizator' } }, { parent: { equals: parent.id } }],
    },
  })
  if (!shock.docs[0]) throw new Error('Амортизатор was not linked to Подвеска')

  const child = await payload.create({
    collection: 'categories',
    data: {
      displayOrder: 999,
      generateSlug: false,
      parent: shock.docs[0].id,
      slug: 'hierarchy-check-child',
      title: 'Проверка вложенности',
    },
    depth: 0,
  })

  try {
    if (child.level !== 3) {
      throw new Error(`Expected third-level category, received level ${child.level}`)
    }

    let circularRejected = false
    try {
      await payload.update({
        collection: 'categories',
        id: parent.id,
        data: {
          parent: child.id,
        },
      })
    } catch {
      circularRejected = true
    }

    if (!circularRejected) {
      await payload.update({
        collection: 'categories',
        id: parent.id,
        data: {
          parent: null,
        },
      })
      throw new Error('Circular parent relationship was accepted')
    }
  } finally {
    await payload.delete({
      collection: 'categories',
      id: child.id,
    })
  }
}

async function main() {
  const payload = await getPayload({ config })
  const stats: Stats = { created: 0, updated: 0 }

  try {
    for (const [index, category] of jeepCategories.entries()) {
      await upsertCategory(payload, category, null, index + 1, stats)
    }

    await verifyHierarchy(payload)

    const all = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 500,
      pagination: false,
    })
    const roots = all.docs.filter((category) => !category.parent)
    const children = all.docs.filter((category) => category.parent)

    console.log(
      JSON.stringify(
        {
          children: children.length,
          created: stats.created,
          roots: roots.length,
          total: all.docs.length,
          updated: stats.updated,
        },
        null,
        2,
      ),
    )
  } finally {
    await payload.destroy()
  }
}

await main()
