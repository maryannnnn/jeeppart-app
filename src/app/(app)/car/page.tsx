import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/car`,
  },
  description: 'Модели автомобилей Jeep Parts',
  title: 'Модели автомобилей',
}

export default async function VehicleModelsPage() {
  const payload = await getPayload({ config: configPromise })
  const models = await payload.find({
    collection: 'vehicle-models',
    depth: 1,
    limit: 100,
    pagination: false,
    sort: 'displayOrder',
  })

  return (
    <div className="container my-10">
      <h1 className="mb-6 text-3xl font-medium">Модели автомобилей</h1>
      {models.docs.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {models.docs.map((model) => (
            <li key={model.id}>
              <Link className="block rounded-2xl border p-4 hover:bg-primary-foreground" href={`/car/${model.slug}`}>
                <span className="text-lg font-medium">{model.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Моделей пока нет.</p>
      )}
    </div>
  )
}
