import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const VehicleYears: CollectionConfig = {
  slug: 'vehicle-years',
  labels: {
    singular: 'Vehicle Year',
    plural: 'Vehicle Years',
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
    defaultColumns: ['title', 'year', 'slug', 'displayOrder', 'published'],
    description:
      'Общие годы выпуска для всех марок и моделей. Один год создаётся один раз. Публичные страницы годов не создаются.',
  },
  defaultSort: 'year',
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'year', type: 'number', label: 'Year', required: true, unique: true, min: 1900, max: 2100 },
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
