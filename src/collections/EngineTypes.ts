import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const EngineTypes: CollectionConfig = {
  slug: 'engine-types',
  labels: {
    singular: 'Engine Type',
    plural: 'Engine Types',
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
    defaultColumns: ['title', 'slug', 'featured', 'displayOrder', 'published'],
    description:
      'Типы двигателей для классификации товаров. Это не технический справочник. Публичный адрес будет задан отдельно.',
  },
  defaultSort: 'displayOrder',
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'description', type: 'textarea', label: 'Description', required: false },
    { name: 'longTitle', type: 'text', label: 'Long Title', required: false },
    {
      name: 'mainImage',
      type: 'upload',
      label: 'Main Image',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
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
        if (checkbox && checkbox.type === 'checkbox') {
          checkbox.defaultValue = false
          checkbox.admin = {
            ...checkbox.admin,
            description: 'Slug редактируется вручную и не меняется при правке названия.',
          }
        }
        const slug = field.fields.find((item) => 'name' in item && item.name === 'slug')
        if (slug && slug.type === 'text') {
          slug.admin = {
            ...slug.admin,
            description:
              'Внутренний идентификатор. Публичный URL не создаётся, точный slug старого сайта можно вписать позже.',
          }
        }
        return field
      },
    }),
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', label: 'SEO Title' },
        { name: 'description', type: 'textarea', label: 'SEO Description' },
      ],
    },
  ],
}
