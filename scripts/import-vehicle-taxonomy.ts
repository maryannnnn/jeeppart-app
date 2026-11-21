import { getPayload } from 'payload'

import config from '../src/payload.config'
import { engineTypeSeeds } from '../src/data/vehicle-taxonomy'

async function main() {
  const payload = await getPayload({ config })

  try {
    const existingMake = await payload.find({
      collection: 'vehicle-makes',
      depth: 0,
      limit: 1,
      where: { slug: { equals: 'jeep' } },
    })
    const jeep = existingMake.docs[0]
      ? existingMake.docs[0]
      : await payload.create({
          collection: 'vehicle-makes',
          data: {
            displayOrder: 1,
            generateSlug: false,
            published: true,
            slug: 'jeep',
            title: 'Jeep',
          },
          depth: 0,
        })

    let yearsCreated = 0
    for (let year = 2010; year <= 2026; year += 1) {
      const existing = await payload.find({
        collection: 'vehicle-years',
        depth: 0,
        limit: 1,
        where: { year: { equals: year } },
      })
      if (existing.docs[0]) continue
      await payload.create({
        collection: 'vehicle-years',
        data: {
          displayOrder: year,
          generateSlug: false,
          published: true,
          slug: String(year),
          title: String(year),
          year,
        },
        depth: 0,
      })
      yearsCreated += 1
    }

    let enginesCreated = 0
    for (const engine of engineTypeSeeds) {
      const existing = await payload.find({
        collection: 'engine-types',
        depth: 0,
        limit: 1,
        where: { title: { equals: engine.title } },
      })
      if (existing.docs[0]) continue
      await payload.create({
        collection: 'engine-types',
        data: {
          displayOrder: engine.displayOrder,
          featured: false,
          generateSlug: false,
          published: true,
          slug: engine.slug,
          title: engine.title,
        },
        depth: 0,
      })
      enginesCreated += 1
    }

    const models = await payload.find({
      collection: 'vehicle-models',
      depth: 0,
      limit: 100,
      pagination: false,
    })
    let modelsLinked = 0
    for (const model of models.docs) {
      if (model.make) continue
      await payload.update({
        collection: 'vehicle-models',
        id: model.id,
        data: { make: jeep.id },
        depth: 0,
      })
      modelsLinked += 1
    }

    const [makes, years, engines, modelCheck] = await Promise.all([
      payload.find({ collection: 'vehicle-makes', depth: 0, limit: 20, pagination: false }),
      payload.count({ collection: 'vehicle-years' }),
      payload.find({ collection: 'engine-types', depth: 0, limit: 20, pagination: false, sort: 'displayOrder' }),
      payload.find({ collection: 'vehicle-models', depth: 0, limit: 20, pagination: false, sort: 'displayOrder' }),
    ])

    console.log(
      JSON.stringify(
        {
          engines: engines.docs.map((item) => item.slug),
          enginesCreated,
          makes: makes.docs.map((item) => item.slug),
          modelsLinked,
          modelSlugs: modelCheck.docs.map((item) => item.slug),
          yearsCreated,
          yearsTotal: years.totalDocs,
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
