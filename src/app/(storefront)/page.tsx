import type { Metadata } from 'next'

import { StorefrontHome } from '@/components/storefront/StorefrontHome'
import { getCategoryTree } from '@/utilities/catalog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'Демонстрационный интерфейс магазина: темы, поиск, гараж и корзина на примерах. Каталог не подключён.',
  title: 'Jeep-Part — демонстрация витрины',
}

export default async function StorefrontPage() {
  const tree = await getCategoryTree()

  return (
    <StorefrontHome
      categories={tree.map((category) => ({
        id: category.id,
        title: category.title,
        href: category.href,
        slug: category.slug,
      }))}
    />
  )
}
