'use client'

import { useStorefront } from '@/components/storefront/storefront-context'

export function GarageStatusBanner() {
  const { garage, onlyCompatible, setOnlyCompatible, resetGarage } = useStorefront()
  if (!garage) return null

  return (
    <div className="ds-banner">
      <div className="ds-container flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="ds-small font-semibold">
          В гараже: {garage.makeName} {garage.modelName} {garage.generationCode}, {garage.year}.
          Диапазон поколения в примерах: {garage.yearsLabel}.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <label className="ds-small flex items-center gap-2 font-semibold">
            <input
              checked={onlyCompatible}
              className="accent-[var(--ds-success)]"
              onChange={(event) => setOnlyCompatible(event.target.checked)}
              type="checkbox"
            />
            Только демо-товары этого автомобиля
          </label>
          <button className="ds-caption underline" onClick={resetGarage} type="button">
            Сбросить
          </button>
        </div>
      </div>
    </div>
  )
}
