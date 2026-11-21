import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import {
  cascadeCategoryLevels,
  categoryParentFilter,
  validateCategoryParent,
} from './hooks/validateCategoryParent'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Категория товаров',
    plural: 'Категории товаров',
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
    defaultColumns: ['title', 'parent', 'level', 'displayOrder', 'slug'],
    description:
      'Категории каталога. Пустой родитель создаёт основную категорию, выбранный родитель создаёт подкатегорию.',
  },
  defaultSort: 'displayOrder',
  hooks: {
    beforeChange: [validateCategoryParent],
    afterChange: [cascadeCategoryLevels],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'longTitle',
      type: 'text',
      label: 'Long Title',
      required: false,
      admin: {
        description: 'Расширенный заголовок страницы категории. Не заменяет название и URL.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Изображение',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Меньшее число показывается раньше среди категорий одного уровня.',
      },
    },
    {
      name: 'level',
      type: 'number',
      label: 'Уровень',
      defaultValue: 1,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: '1 — основная категория. Каждый следующий уровень увеличивает номер.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Родительская категория',
      required: false,
      admin: {
        position: 'sidebar',
        description:
          'Оставьте поле пустым для основной категории. Выберите категорию, чтобы создать подкатегорию любого уровня.',
      },
      filterOptions: categoryParentFilter,
    },
    slugField({
      disableUnique: true,
      overrides: (field) => {
        const checkbox = field.fields.find((item) => 'name' in item && item.name === 'generateSlug')
        if (checkbox && checkbox.type === 'checkbox') {
          checkbox.defaultValue = false
          checkbox.label = 'Генерировать slug из названия'
          checkbox.admin = {
            ...checkbox.admin,
            description:
              'Выключено по умолчанию, чтобы адрес категории не менялся при правке названия.',
          }
        }

        const slug = field.fields.find((item) => 'name' in item && item.name === 'slug')
        if (slug && slug.type === 'text') {
          slug.label = 'URL Slug'
          slug.admin = {
            ...slug.admin,
            description:
              'Только последний сегмент адреса. Например, для /katalog/podveska/amortizator укажите amortizator.',
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
  ],
}
