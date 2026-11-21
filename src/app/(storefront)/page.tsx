import type { Metadata } from 'next'

import { StorefrontHome } from '@/components/storefront/StorefrontHome'

export const metadata: Metadata = {
  description:
    'Демонстрационный интерфейс магазина: темы, поиск, гараж и корзина на примерах. Каталог не подключён.',
  title: 'Jeep-Part — демонстрация витрины',
}

export default function StorefrontPage() {
  return <StorefrontHome />
}
