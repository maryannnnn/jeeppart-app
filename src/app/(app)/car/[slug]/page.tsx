import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { ProductGridItem } from '@/components/ProductGridItem'
import { VehicleGallery } from '@/components/vehicle/VehicleGallery'
import type { Media, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const brandLabels: Record<string, string> = {
  hyundai: 'Hyundai',
  jeep: 'Jeep',
}

function formatYears(from?: number | null, to?: number | null) {
  if (typeof from === 'number' && typeof to === 'number') {
    return from === to ? String(from) : `${from}–${to}`
  }
  if (typeof from === 'number') return String(from)
  if (typeof to === 'number') return String(to)
  return ''
}

function photoFrom(resource: number | Media | null | undefined) {
  if (!resource || typeof resource !== 'object' || !resource.url) return null
  return {
    alt: resource.alt || resource.filename || 'Фото модели',
    id: resource.id,
    resource,
  }
}

async function getModel(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'vehicle-models',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const model = await getModel(slug)
  if (!model) return {}

  const canonical = `${getServerSideURL()}/car/${model.slug}`
  const title = model.meta?.title || model.title
  const description = model.meta?.description || model.description || undefined

  return {
    alternates: { canonical },
    description,
    title,
  }
}

export default async function VehicleModelPage({ params }: Args) {
  const { slug } = await params
  const model = await getModel(slug)
  if (!model) notFound()

  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    depth: 1,
    draft: false,
    limit: 24,
    overrideAccess: false,
    sort: 'title',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { compatibleVehicleModels: { contains: model.id } },
      ],
    },
  })

  const canonical = `${getServerSideURL()}/car/${model.slug}`
  const years = formatYears(model.yearFrom, model.yearTo)
  const brand = model.brand ? brandLabels[model.brand] || model.brand : ''
  const specs = [
    brand ? { label: 'Марка', value: brand } : null,
    model.doors ? { label: 'Дверей', value: model.doors } : null,
    years ? { label: 'Годы', value: years } : null,
  ].flatMap((item) => (item ? [item] : []))

  const main = photoFrom(model.mainImage)
  const photos = (model.gallery || []).flatMap((item) => {
    const photo = photoFrom(item.image)
    return photo ? [{ ...photo, id: item.id || photo.id }] : []
  })
  const images = [...(main ? [main.resource.url] : []), ...photos.map((photo) => photo.resource.url)].filter(
    (url): url is string => Boolean(url),
  )

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', item: getServerSideURL(), name: 'Главная', position: 1 },
      { '@type': 'ListItem', item: `${getServerSideURL()}/car`, name: 'Модели', position: 2 },
      { '@type': 'ListItem', item: canonical, name: model.title, position: 3 },
    ],
  }

  const vehicleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    description: model.description || undefined,
    image: images.length ? images : undefined,
    name: model.title,
    numberOfDoors: model.doors ? Number(model.doors) : undefined,
    url: canonical,
    vehicleModelDate: model.yearFrom ? String(model.yearFrom) : undefined,
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
    name: model.title,
  }

  return (
    <div className="container my-10">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
        type="application/ld+json"
      />
      {products.docs.length > 0 ? (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
          type="application/ld+json"
        />
      ) : null}

      <Breadcrumbs
        items={[
          { href: '/', title: 'Главная' },
          { href: '/car', title: 'Модели' },
          { title: model.title },
        ]}
      />
      <h1 className="mt-4 text-3xl font-medium">{model.title}</h1>
      {model.longTitle?.trim() ? (
        <h2 className="mt-2 text-xl text-neutral-700 dark:text-neutral-300">{model.longTitle}</h2>
      ) : null}
      {model.description?.trim() ? (
        <p className="mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">{model.description}</p>
      ) : null}

      {main || photos.length > 0 ? (
        <div className="mt-8">
          <VehicleGallery main={main} photos={photos} />
        </div>
      ) : null}

      {specs.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-medium">Характеристики</h2>
          <dl className="grid max-w-md gap-2">
            {specs.map((spec) => (
              <div className="flex gap-3" key={spec.label}>
                <dt className="w-24 text-neutral-500">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-medium">Совместимые товары</h2>
        {products.docs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.docs.map((product) => (
              <ProductGridItem key={product.id} product={product as Product} />
            ))}
          </div>
        ) : (
          <p>Для этой модели пока нет связанных товаров.</p>
        )}
      </section>
    </div>
  )
}
