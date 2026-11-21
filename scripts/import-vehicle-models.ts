import { getPayload } from 'payload'

import config from '../src/payload.config'
import { vehicleModels } from '../src/data/vehicle-models'

async function main() {
  const payload = await getPayload({ config })
  const stats = { created: 0, updated: 0 }

  try {
    for (const [index, model] of vehicleModels.entries()) {
      const existing = await payload.find({
        collection: 'vehicle-models',
        depth: 0,
        limit: 1,
        where: {
          slug: {
            equals: model.slug,
          },
        },
      })

      const data = {
        displayOrder: index + 1,
        generateSlug: false,
        slug: model.slug,
        title: model.title,
      }

      if (existing.docs[0]) {
        await payload.update({
          collection: 'vehicle-models',
          data,
          depth: 0,
          id: existing.docs[0].id,
        })
        stats.updated += 1
      } else {
        await payload.create({
          collection: 'vehicle-models',
          data,
          depth: 0,
        })
        stats.created += 1
      }
    }

    const all = await payload.find({
      collection: 'vehicle-models',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'displayOrder',
    })

    console.log(
      JSON.stringify(
        {
          created: stats.created,
          slugs: all.docs.map((model) => model.slug),
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
