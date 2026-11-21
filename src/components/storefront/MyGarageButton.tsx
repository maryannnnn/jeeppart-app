'use client'

import { Car } from 'lucide-react'

import { useStorefront } from '@/components/storefront/storefront-context'

export function MyGarageButton() {
  const { garage, setGarageOpen } = useStorefront()
  const label = garage ? `${garage.modelName} ${garage.generationCode}` : 'Выбрать автомобиль'

  return (
    <button
      className="ds-garage-btn flex items-center gap-2 px-2.5 py-1.5"
      data-active={garage ? 'true' : 'false'}
      onClick={() => setGarageOpen(true)}
      type="button"
    >
      <Car size={16} />
      <span className="hidden text-left md:block">
        <span className="ds-label-text block text-[var(--ds-header-muted)]">Мой гараж</span>
        <span className="block max-w-32 truncate text-xs font-bold">{label}</span>
      </span>
    </button>
  )
}
