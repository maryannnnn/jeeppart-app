'use client'

import Link from 'next/link'
import React from 'react'

import type { CatalogNode } from '@/utilities/catalog'
import { cn } from '@/utilities/cn'

type Props = {
  activeHref?: string
  nodes: CatalogNode[]
}

export function CatalogMenuList({ activeHref, nodes }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {nodes.map((node) => {
        const isCurrent = node.href === activeHref
        const isBranch = Boolean(
          activeHref && (isCurrent || activeHref.startsWith(`${node.href}/`)),
        )

        return (
          <li key={node.id}>
            {node.children.length > 0 ? (
              <details open={isBranch}>
                <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-2">
                    <Link
                      className={cn('hover:underline', { 'font-semibold': isCurrent })}
                      href={node.href}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {node.title}
                    </Link>
                    <span aria-hidden className="text-neutral-400">
                      {isBranch ? '−' : '+'}
                    </span>
                  </span>
                </summary>
                <div className="mt-1 border-l pl-3">
                  <CatalogMenuList activeHref={activeHref} nodes={node.children} />
                </div>
              </details>
            ) : (
              <Link
                className={cn('hover:underline', { 'font-semibold': isCurrent })}
                href={node.href}
              >
                {node.title}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
