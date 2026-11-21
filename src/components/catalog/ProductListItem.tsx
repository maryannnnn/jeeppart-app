import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Product } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product>
}

function productPrice(product: Partial<Product>) {
  const variant = product.variants?.docs?.[0]
  if (variant && typeof variant === 'object' && typeof variant.priceInUSD === 'number') {
    return variant.priceInUSD
  }

  return product.priceInUSD
}

function productImage(product: Partial<Product>) {
  const image = product.gallery?.[0]?.image
  if (!image || typeof image === 'number') return null
  return image
}

export function ProductListItem({ product }: Props) {
  const image = productImage(product)
  const price = productPrice(product)

  return (
    <Link
      className="grid grid-cols-[96px_1fr] items-center gap-4 rounded-2xl border p-3 hover:border-primary sm:grid-cols-[120px_1fr_auto]"
      href={`/products/${product.slug}`}
    >
      {image ? (
        <Media
          className="relative aspect-square overflow-hidden rounded-xl bg-primary-foreground"
          imgClassName="h-full w-full object-cover"
          resource={image}
        />
      ) : (
        <div className="aspect-square rounded-xl bg-primary/5" />
      )}
      <div className="font-medium">{product.title}</div>
      {typeof price === 'number' ? (
        <Price amount={price} className="col-span-2 text-sm sm:col-span-1 sm:text-right" />
      ) : (
        <span className="hidden sm:block" />
      )}
    </Link>
  )
}
