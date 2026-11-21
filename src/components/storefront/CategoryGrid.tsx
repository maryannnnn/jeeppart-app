'use client'

import { CircleDot, Cog, LayoutGrid, Shield, UnfoldVertical, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { categoryCount, demoCategories, type DemoCategory } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

const icons: Record<DemoCategory['icon'], LucideIcon> = {
  all: LayoutGrid,
  suspension: UnfoldVertical,
  brakes: CircleDot,
  engine: Cog,
  drivetrain: Wrench,
  exterior: Shield,
}

export function CategoryGrid() {
  const { categoryId, setCategoryId } = useStorefront()

  return (
    <section className="ds-section border-y border-[var(--ds-divider)] pt-0" id="categories">
      <div className="ds-container">
        <h2 className="ds-h2 mb-4">Категории</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {demoCategories.map((category) => {
            const Icon = icons[category.icon]
            const active = categoryId === category.id
            return (
              <button
                key={category.id}
                className="ds-category-card flex items-center gap-3 p-3 text-left"
                data-active={active ? 'true' : 'false'}
                onClick={() => {
                  setCategoryId(category.id)
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                type="button"
              >
                <span className="ds-category-icon">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="ds-small block font-bold leading-tight">{category.name}</span>
                  <span className="ds-caption">{categoryCount(category.id)} в демо</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
