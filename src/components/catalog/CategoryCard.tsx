import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import type { Category, Media as MediaType } from '@/payload-types'

type Props = {
  category: Category
  href: string
}

function categoryImage(category: Category): MediaType | null {
  if (!category.image || typeof category.image === 'number') return null
  return category.image
}

export function CategoryCard({ category, href }: Props) {
  const image = categoryImage(category)
  const description = category.description?.trim()

  return (
    <Link
      className="flex h-full flex-col rounded-2xl border p-4 transition hover:border-primary"
      href={href}
    >
      {image ? (
        <Media
          className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-primary-foreground"
          imgClassName="h-full w-full object-cover"
          resource={image}
        />
      ) : (
        <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl bg-primary/5 text-sm text-neutral-500">
          {category.title}
        </div>
      )}
      <h3 className="text-lg font-medium">{category.title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
      ) : null}
    </Link>
  )
}
