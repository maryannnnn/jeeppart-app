import Link from 'next/link'
import React from 'react'

type Crumb = {
  href?: string
  title: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li className="flex items-center gap-2" key={`${item.title}-${index}`}>
              {index > 0 ? <span aria-hidden>/</span> : null}
              {item.href && !isLast ? (
                <Link className="hover:underline" href={item.href}>
                  {item.title}
                </Link>
              ) : (
                <span className={isLast ? 'text-primary' : undefined}>{item.title}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
