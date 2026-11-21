'use client'

import { Car } from 'lucide-react'

import { listGenerations } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

export function PopularModels() {
  const { garage, applyGeneration } = useStorefront()
  const generations = listGenerations()

  return (
    <section className="ds-section" id="popular-models">
      <div className="ds-container">
        <div className="mb-4">
          <h2 className="ds-h2">Популярные кузова Jeep</h2>
          <p className="ds-caption mt-1">Нажатие выбирает автомобиль в демонстрационном гараже.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {generations.map((generation) => {
            const active = garage?.generationId === generation.id
            return (
              <button
                key={generation.id}
                className="ds-model-card flex flex-col items-center px-3 py-4 text-center"
                data-active={active ? 'true' : 'false'}
                onClick={() => applyGeneration(generation.id)}
                type="button"
              >
                <Car size={28} />
                <span className="ds-h5 mt-2">{generation.modelName}</span>
                <span className="ds-oem text-[var(--ds-primary-ink)]">{generation.code}</span>
                <span className="ds-caption">{generation.yearsLabel}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
