import { Media } from '@/components/Media'
import { ProductGridItem } from '@/components/ProductGridItem'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { CatalogMenu } from '@/components/catalog/CatalogMenu'
import { CategoryCard } from '@/components/catalog/CategoryCard'
import { ProductListItem } from '@/components/catalog/ProductListItem'
import type { Category } from '@/payload-types'
import { findCategoryTrail, getCategoryTree } from '@/utilities/catalog'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const sorts = [
  { label: 'По названию', value: 'title' },
  { label: 'Сначала новые', value: '-createdAt' },
  { label: 'Цена: по возрастанию', value: 'priceInUSD' },
  { label: 'Цена: по убыванию', value: '-priceInUSD' },
]

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function allowedSort(value?: string) {
  if (value && sorts.some((sort) => sort.value === value)) return value
  return 'title'
}

function pageHref(
  pathname: string,
  current: Record<string, string | undefined>,
  patch: Record<string, string | undefined>,
) {
  const params = new URLSearchParams()
  const next = { ...current, ...patch }

  for (const [key, value] of Object.entries(next)) {
    if (value) params.set(key, value)
  }

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { segments = [] } = await params
  const tree = await getCategoryTree()
  const canonicalPath = segments.length ? `/katalog/${segments.join('/')}` : '/katalog'
  const canonical = `${getServerSideURL()}${canonicalPath}`

  if (!segments.length) {
    return {
      alternates: { canonical },
      description: 'Каталог запчастей Jeep Parts',
      title: 'Каталог',
    }
  }

  const trail = findCategoryTrail(tree, segments)
  if (!trail) return {}

  const payload = await getPayload({ config: configPromise })
  const category = await payload.findByID({
    collection: 'categories',
    depth: 0,
    id: trail[trail.length - 1].id,
  })
  const title = category.meta?.title || category.title
  const description =
    category.meta?.description || category.description || `Категория ${category.title}`

  return {
    alternates: { canonical },
    description,
    title,
  }
}

export default async function CatalogPage({ params, searchParams }: Args) {
  const [{ segments = [] }, query] = await Promise.all([params, searchParams])
  const tree = await getCategoryTree()
  const pathname = segments.length ? `/katalog/${segments.join('/')}` : '/katalog'

  if (!segments.length) {
    return (
      <CatalogLayout activeHref={pathname} tree={tree}>
        <h1 className="mb-6 text-3xl font-medium">Каталог</h1>
        <CategoryGrid
          categories={await categoriesWithMedia(tree.map((node) => node.id))}
          hrefFor={(category) => {
            const node = tree.find((item) => item.id === category.id)
            return node?.href || `/katalog/${category.slug}`
          }}
        />
      </CatalogLayout>
    )
  }

  const trail = findCategoryTrail(tree, segments)
  if (!trail) notFound()

  const current = trail[trail.length - 1]
  const payload = await getPayload({ config: configPromise })
  const category = await payload.findByID({
    collection: 'categories',
    depth: 1,
    id: current.id,
  })

  const childCategories = await categoriesWithMedia(current.children.map((child) => child.id))
  const view = one(query.view) === 'list' ? 'list' : 'grid'
  const sort = allowedSort(one(query.sort))
  const search = one(query.q)?.trim()
  const page = Math.max(1, Number(one(query.page) || 1) || 1)
  const currentQuery = {
    page: page > 1 ? String(page) : undefined,
    q: search || undefined,
    sort: sort === 'title' ? undefined : sort,
    view: view === 'list' ? 'list' : undefined,
  }

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    draft: false,
    limit: 12,
    overrideAccess: false,
    page,
    sort,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { categories: { contains: category.id } },
        ...(search
          ? [
              {
                title: {
                  like: search,
                },
              },
            ]
          : []),
      ],
    },
  })

  const seoTitle = category.meta?.title || category.title
  const seoDescription =
    category.meta?.description || category.description || `Категория ${category.title}`
  const canonical = `${getServerSideURL()}${pathname}`
  const crumbs = [
    { href: '/', title: 'Главная' },
    { href: '/katalog', title: 'Каталог' },
    ...trail.map((node, index) => ({
      href: index === trail.length - 1 ? undefined : node.href,
      title: node.title,
    })),
  ]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      item: crumb.href ? `${getServerSideURL()}${crumb.href}` : canonical,
      name: crumb.title,
      position: index + 1,
    })),
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.docs.map((product, index) => ({
      '@type': 'ListItem',
      name: product.title,
      position: index + 1,
      url: `${getServerSideURL()}/products/${product.slug}`,
    })),
    name: seoTitle,
  }

  return (
    <CatalogLayout activeHref={pathname} tree={tree}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        type="application/ld+json"
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 text-3xl font-medium">{category.title}</h1>
      {category.longTitle?.trim() ? (
        <h2 className="mt-2 text-xl text-neutral-700 dark:text-neutral-300">{category.longTitle}</h2>
      ) : null}
      <p className="sr-only">{seoDescription}</p>
      {category.image && typeof category.image === 'object' ? (
        <div className="mt-6 max-w-xl">
          <CategoryImage category={category} />
        </div>
      ) : null}
      {category.description?.trim() ? (
        <p className="mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">
          {category.description}
        </p>
      ) : null}

      {childCategories.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-medium">Подкатегории</h2>
          <CategoryGrid
            categories={childCategories}
            hrefFor={(item) =>
              current.children.find((child) => child.id === item.id)?.href || pathname
            }
          />
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-xl font-medium">Товары</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form action={pathname} className="flex gap-2">
              {currentQuery.sort ? (
                <input name="sort" type="hidden" value={currentQuery.sort} />
              ) : null}
              {currentQuery.view ? (
                <input name="view" type="hidden" value={currentQuery.view} />
              ) : null}
              <input
                className="h-9 rounded-md border bg-transparent px-3 text-sm"
                defaultValue={search || ''}
                name="q"
                placeholder="Поиск в категории"
                type="search"
              />
              <button className="h-9 rounded-md border px-3 text-sm" type="submit">
                Найти
              </button>
            </form>
            <div className="flex flex-wrap gap-2 text-sm">
              {sorts.map((item) => (
                <Link
                  className={sort === item.value ? 'font-semibold underline' : 'hover:underline'}
                  href={pageHref(pathname, currentQuery, {
                    page: undefined,
                    sort: item.value === 'title' ? undefined : item.value,
                  })}
                  key={item.value}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 text-sm">
              <Link
                className={
                  view === 'grid'
                    ? 'rounded-md border px-3 py-1 font-semibold'
                    : 'rounded-md border px-3 py-1'
                }
                href={pageHref(pathname, currentQuery, { view: undefined })}
              >
                Сетка
              </Link>
              <Link
                className={
                  view === 'list'
                    ? 'rounded-md border px-3 py-1 font-semibold'
                    : 'rounded-md border px-3 py-1'
                }
                href={pageHref(pathname, currentQuery, { view: 'list' })}
              >
                Список
              </Link>
            </div>
          </div>
        </div>

        {products.docs.length > 0 ? (
          view === 'list' ? (
            <div className="flex flex-col gap-3">
              {products.docs.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.docs.map((product) => (
                <ProductGridItem key={product.id} product={product} />
              ))}
            </div>
          )
        ) : (
          <p>В этой категории пока нет товаров.</p>
        )}

        {products.totalPages > 1 ? (
          <div className="mt-6 flex gap-3 text-sm">
            {products.hasPrevPage ? (
              <Link
                href={pageHref(pathname, currentQuery, {
                  page: (products.page || 1) - 1 > 1 ? String((products.page || 1) - 1) : undefined,
                })}
              >
                Назад
              </Link>
            ) : null}
            <span>
              {products.page || 1} / {products.totalPages}
            </span>
            {products.hasNextPage ? (
              <Link
                href={pageHref(pathname, currentQuery, { page: String((products.page || 1) + 1) })}
              >
                Дальше
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>
    </CatalogLayout>
  )
}

async function categoriesWithMedia(ids: number[]) {
  if (!ids.length) return []

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: ids.length,
    pagination: false,
    where: {
      id: {
        in: ids,
      },
    },
  })

  const byId = new Map(result.docs.map((category) => [category.id, category]))
  return ids.flatMap((id) => {
    const category = byId.get(id)
    return category ? [category] : []
  })
}

function CategoryImage({ category }: { category: Category }) {
  if (!category.image || typeof category.image !== 'object') return null

  return (
    <Media
      className="overflow-hidden rounded-2xl border"
      imgClassName="h-auto w-full object-cover"
      resource={category.image}
    />
  )
}

function CategoryGrid({
  categories,
  hrefFor,
}: {
  categories: Category[]
  hrefFor: (category: Category) => string
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard category={category} href={hrefFor(category)} key={category.id} />
      ))}
    </div>
  )
}

async function CatalogLayout({
  activeHref,
  children,
  tree,
}: {
  activeHref: string
  children: React.ReactNode
  tree: Awaited<ReturnType<typeof getCategoryTree>>
}) {
  return (
    <div className="container my-10 flex flex-col gap-8 md:flex-row">
      <aside className="w-full shrink-0 md:w-72">
        <CatalogMenu activeHref={activeHref} nodes={tree} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
