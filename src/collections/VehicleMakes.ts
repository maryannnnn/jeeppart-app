import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const VehicleMakes: CollectionConfig = {
  slug: 'vehicle-makes',
  labels: {
    singular: 'Vehicle Make',
    plural: 'Vehicle Makes',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: ({ req: { user } }) => {
      if (user) return true
      return { published: { equals: true } }
    },
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'displayOrder', 'published'],
    description: 'Марки автомобилей для выбора в товарах и моделях. Публичные страницы марок не создаются.',
  },
  defaultSort: 'displayOrder',
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
      required: false,
    },
    { name: 'description', type: 'textarea', label: 'Description', required: false },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    slugField({
      overrides: (field) => {
        const checkbox = field.fields.find((item) => 'name' in item && item.name === 'generateSlug')
        if (checkbox && checkbox.type === 'checkbox') checkbox.defaultValue = false
        return field
      },
    }),
  ],
}
