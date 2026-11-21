'use client'

import { Button } from '@/design-system'
import { demoModels, modelsForYear, selectableYears } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

type VehicleSelectorProps = {
  idPrefix: string
  layout?: 'stack' | 'bar'
  onApply?: () => void
}

export function VehicleSelector({ idPrefix, layout = 'stack', onApply }: VehicleSelectorProps) {
  const { draft, setDraft, applyDraft } = useStorefront()
  const years = selectableYears()
  const models = modelsForYear(draft.year)
  const model = models.find((item) => item.id === draft.modelId) ?? models[0]
  const generations = demoModels.find((item) => item.id === model?.id)?.generations ?? []
  const generation = generations.find((item) => item.id === draft.generationId) ?? generations[0]

  return (
    <form
      className={layout === 'bar' ? 'ds-fitment-form' : 'grid gap-3'}
      onSubmit={(event) => {
        event.preventDefault()
        applyDraft()
        onApply?.()
      }}
    >
      <label className="grid gap-1">
        <span className="ds-label-text">Год</span>
        <select
          className="ds-select"
          id={`${idPrefix}-year`}
          onChange={(event) => setDraft({ year: Number(event.target.value) })}
          value={draft.year}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1">
        <span className="ds-label-text">Модель</span>
        <select
          className="ds-select"
          id={`${idPrefix}-model`}
          onChange={(event) => setDraft({ modelId: event.target.value })}
          value={model?.id ?? ''}
        >
          {models.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1">
        <span className="ds-label-text">Поколение</span>
        <select
          className="ds-select"
          id={`${idPrefix}-generation`}
          onChange={(event) => setDraft({ generationId: event.target.value })}
          value={generation?.id ?? ''}
        >
          {generations.map((item) => (
            <option key={item.id} value={item.id}>
              {item.code} ({item.yearsLabel})
            </option>
          ))}
        </select>
      </label>
      <Button className="w-full" disabled={!generation} type="submit">
        Найти запчасти
      </Button>
    </form>
  )
}

export function GarageDialog() {
  const { garageOpen, setGarageOpen, resetGarage, garage } = useStorefront()
  if (!garageOpen) return null

  return (
    <div className="ds-overlay flex items-end justify-center p-4 sm:items-center">
      <button aria-label="Закрыть выбор автомобиля" className="absolute inset-0" onClick={() => setGarageOpen(false)} type="button" />
      <div
        aria-labelledby="garage-title"
        aria-modal="true"
        className="ds-modal relative z-10 w-full max-w-lg p-5"
        role="dialog"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="ds-h3" id="garage-title">
              Мой гараж
            </h2>
            <p className="ds-caption mt-1">Выбор сохранится только в этом окне браузера.</p>
          </div>
          <button className="ds-btn ds-btn-ghost" onClick={() => setGarageOpen(false)} type="button">
            Закрыть
          </button>
        </div>
        <VehicleSelector idPrefix="garage" />
        {garage ? (
          <button className="ds-btn ds-btn-secondary mt-3 w-full" onClick={resetGarage} type="button">
            Сбросить выбранный автомобиль
          </button>
        ) : null}
      </div>
    </div>
  )
}
