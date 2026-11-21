import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Category } from '@/payload-types'

export type CatalogNode = {
  id: number
  title: string
  slug: string
  href: string
  description?: string | null
  displayOrder: number
  children: CatalogNode[]
}

function parentKey(category: Category) {
  if (category.parent == null) return 'root'
  if (typeof category.parent === 'object') return String(category.parent.id)
  return String(category.parent)
}

export function buildCategoryTree(categories: Category[]): CatalogNode[] {
  const byParent = new Map<string, Category[]>()

  for (const category of categories) {
    const key = parentKey(category)
    const siblings = byParent.get(key) || []
    siblings.push(category)
    byParent.set(key, siblings)
  }

  const walk = (key: string, segments: string[]): CatalogNode[] => {
    return (byParent.get(key) || [])
      .sort((left, right) => {
        const order = (left.displayOrder || 0) - (right.displayOrder || 0)
        if (order !== 0) return order
        return left.title.localeCompare(right.title, 'ru')
      })
      .map((category) => {
        const nextSegments = [...segments, category.slug]
        return {
          id: category.id,
          title: category.title,
          slug: category.slug,
          href: `/katalog/${nextSegments.join('/')}`,
          description: category.description,
          displayOrder: category.displayOrder || 0,
          children: walk(String(category.id), nextSegments),
        }
      })
  }

  return walk('root', [])
}

export function findCategoryTrail(nodes: CatalogNode[], segments: string[]): CatalogNode[] | null {
  const trail: CatalogNode[] = []
  let level = nodes

  for (const segment of segments) {
    const match = level.find((node) => node.slug === segment)
    if (!match) return null
    trail.push(match)
    level = match.children
  }

  return trail
}

export async function getAllCategories() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 500,
    pagination: false,
    sort: 'displayOrder',
  })

  return result.docs
}

export async function getCategoryTree() {
  const categories = await getAllCategories()
  return buildCategoryTree(categories)
}
