'use client'

import { SlidersHorizontal } from 'lucide-react'

const links = [
  { href: '#popular-models', label: 'Модели Jeep' },
  { href: '#categories', label: 'Категории' },
  { href: '#catalog', label: 'Витрина' },
]

export function MainNavigation() {
  return (
    <nav aria-label="Разделы витрины" className="ds-nav hidden lg:block">
      <div className="ds-container flex items-center gap-5 overflow-x-auto py-2">
        <a className="ds-nav-link inline-flex items-center gap-1 text-[var(--ds-header-text)]" href="#categories">
          <SlidersHorizontal size={14} />
          Демо-категории
        </a>
        {links.map((link) => (
          <a className="ds-nav-link whitespace-nowrap" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
