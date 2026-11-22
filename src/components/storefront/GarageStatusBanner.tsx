'use client'

import { Check } from 'lucide-react'

import { useStorefront } from '@/components/storefront/storefront-context'

export function GarageStatusBanner() {
  const { garage, onlyCompatible, setOnlyCompatible, resetGarage } = useStorefront()
  if (!garage) return null

  const name = `${garage.makeName} ${garage.modelName} ${garage.generationCode}`

  return (
    <div className="ds-fitment-filter">
      <p className="ds-fitment-garage">
        <span className="ds-fitment-garage-mark" aria-hidden>
          <Check size={13} strokeWidth={3} />
        </span>
        <span>
          Ваш автомобиль в гараже: <strong>{name}</strong> ({garage.year} г.)
        </span>
      </p>
      <div className="ds-fitment-filter-actions">
        <label className="ds-fitment-filter-label">
          <input
            checked={onlyCompatible}
            onChange={(event) => setOnlyCompatible(event.target.checked)}
            type="checkbox"
          />
          Фильтровать каталог под этот Jeep
        </label>
        <button onClick={resetGarage} type="button">
          Сбросить
        </button>
      </div>
    </div>
  )
}
