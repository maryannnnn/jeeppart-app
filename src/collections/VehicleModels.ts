import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const VehicleModels: CollectionConfig = {
  slug: 'vehicle-models',
  labels: {
    singular: 'Vehicle Model',
    plural: 'Vehicle Models',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'brand', 'yearFrom', 'yearTo', 'displayOrder', 'slug'],
    description:
      'Модели автомобилей. Название и slug задаются вручную. Товары выбирают совместимые модели в своей карточке.',
  },
  defaultSort: 'displayOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'longTitle',
      type: 'text',
      label: 'Long Title',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
    },
    {
      name: 'mainImage',
      type: 'upload',
      label: 'Main Image',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      labels: {
        singular: 'Photo',
        plural: 'Photos',
      },
      admin: {
        description: 'Несколько фотографий. Порядок меняется перетаскиванием строк.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'brand',
      type: 'select',
      label: 'Brand',
      required: false,
      admin: {
        description: 'Старое поле выбора. Для связи с коллекцией марок используйте Vehicle Make.',
      },
      options: [
        { label: 'Jeep', value: 'jeep' },
        { label: 'Hyundai', value: 'hyundai' },
      ],
    },
    {
      name: 'make',
      type: 'relationship',
      relationTo: 'vehicle-makes',
      label: 'Vehicle Make',
      required: false,
    },
    {
      name: 'years',
      type: 'relationship',
      relationTo: 'vehicle-years',
      hasMany: true,
      label: 'Vehicle Years',
      required: false,
      admin: {
        description: 'Один и тот же год можно выбрать у разных моделей. Отдельные годы для каждой марки не создаются.',
      },
    },
    {
      name: 'doors',
      type: 'select',
      label: 'Doors',
      required: false,
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    },
    {
      name: 'yearFrom',
      type: 'number',
      label: 'Year From',
      required: false,
      min: 1900,
      max: 2100,
      admin: {
        step: 1,
      },
    },
    {
      name: 'yearTo',
      type: 'number',
      label: 'Year To',
      required: false,
      min: 1900,
      max: 2100,
      admin: {
        step: 1,
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      overrides: (field) => {
        const checkbox = field.fields.find((item) => 'name' in item && item.name === 'generateSlug')
        if (checkbox && checkbox.type === 'checkbox') {
          checkbox.defaultValue = false
          checkbox.admin = {
            ...checkbox.admin,
            description: 'Выключено, чтобы адрес модели не менялся при правке названия.',
          }
        }

        const slug = field.fields.find((item) => 'name' in item && item.name === 'slug')
        if (slug && slug.type === 'text') {
          slug.label = 'Slug'
          slug.admin = {
            ...slug.admin,
            description: 'Адрес страницы: /car/этот-slug/',
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
        {
          name: 'title',
          type: 'text',
          label: 'SEO Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'SEO Description',
        },
      ],
    },
    {
      name: 'compatibleProducts',
      type: 'join',
      collection: 'products',
      on: 'compatibleVehicleModels',
      label: 'Compatible products',
      admin: {
        allowCreate: false,
        defaultColumns: ['title', 'slug'],
        description: 'Товары, в которых выбрана эта модель. Список берётся из коллекции Products.',
      },
    },
  ],
}
