'use client'

import { Eye, MessageSquare, ShoppingBag, Wrench } from 'lucide-react'

import { Badge, Button } from '@/design-system'
import { formatPrice, type DemoProduct } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

export function ProductCard({ product }: { product: DemoProduct }) {
  const { addToCart, fitment, openQuickView } = useStorefront()
  const match = fitment(product)

  return (
    <article className="ds-product-card flex flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="ds-brand">{product.brand}</span>
          <span className="ds-oem ds-oem-chip">OEM {product.oem}</span>
        </div>
        {match ? (
          <p className={`ds-badge ${match.status === 'fit' ? 'ds-fit-yes' : 'ds-fit-no'}`}>{match.text}</p>
        ) : null}
        <div className="ds-product-media">
          <span className="text-center">
            <Wrench className="mx-auto opacity-60" size={36} />
            <span className="ds-caption mt-1 block">{product.brandOrigin}</span>
          </span>
        </div>
        <h3 className="ds-product-name line-clamp-2">{product.name}</h3>
        <p className="ds-caption">
          {product.vehicleName} · {product.yearFrom}–{product.yearTo}
        </p>
        <p className="ds-oem truncate text-[var(--ds-text-secondary)]">{product.crossNumbers.join(' · ')}</p>
        {product.questions.length > 0 ? (
          <button className="ds-small inline-flex items-center gap-1 font-semibold text-[var(--ds-accent)]" onClick={() => openQuickView(product.id)} type="button">
            <MessageSquare size={14} />
            Вопросы: {product.questions.length}
          </button>
        ) : null}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="ds-price">{formatPrice(product.price)}</p>
            {product.oldPrice ? <p className="ds-price-old">{formatPrice(product.oldPrice)}</p> : null}
          </div>
          <Badge tone={product.inStock ? 'success' : 'warning'}>
            {product.inStock ? 'Пример: в наличии' : 'Пример: нет в наличии'}
          </Badge>
        </div>
      </div>
      <div className="ds-product-actions flex gap-2 p-3">
        <Button aria-label="Быстрый просмотр" onClick={() => openQuickView(product.id)} variant="secondary">
          <Eye size={16} />
        </Button>
        <Button className="flex-1" onClick={() => addToCart(product.id)}>
          <ShoppingBag size={16} />
          В корзину
        </Button>
      </div>
    </article>
  )
}
