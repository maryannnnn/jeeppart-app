import type { FieldHook } from 'payload'

export const defaultVehicleMake: FieldHook = async ({ operation, req, value }) => {
  if (operation !== 'create' || value) return value

  const jeep = await req.payload.find({
    collection: 'vehicle-makes',
    depth: 0,
    limit: 1,
    where: {
      slug: {
        equals: 'jeep',
      },
    },
  })

  return jeep.docs[0]?.id ?? value
}
