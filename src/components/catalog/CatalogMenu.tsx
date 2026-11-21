import React from 'react'

import { CatalogMenuList } from './CatalogMenuList'
import { getCategoryTree, type CatalogNode } from '@/utilities/catalog'

type Props = {
  activeHref?: string
  nodes?: CatalogNode[]
}

export async function CatalogMenu({ activeHref, nodes }: Props) {
  const tree = nodes || (await getCategoryTree())

  return (
    <nav aria-label="Каталог">
      <h2 className="mb-3 text-xs uppercase tracking-wide text-neutral-500">Каталог</h2>
      <CatalogMenuList activeHref={activeHref} nodes={tree} />
    </nav>
  )
}
