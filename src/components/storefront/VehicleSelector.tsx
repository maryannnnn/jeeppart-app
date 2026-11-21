'use client'

import { Button } from '@/design-system'
import {
  demoMakes,
  demoModels,
  demoYears,
} from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

type VehicleSelectorProps = {
  idPrefix: string
  onApply?: () => void
}

export function VehicleSelector({ idPrefix, onApply }: VehicleSelectorProps) {
  const { draft, setDraft, applyDraft } = useStorefront()
  const models = demoModels.filter((model) => model.makeId === draft.makeId)
  const generations = models.find((model) => model.id === draft.modelId)?.generations ?? []

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        applyDraft()
        onApply?.()
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="ds-label-text">Год выпуска</span>
          <select
            className="ds-select"
            id={`${idPrefix}-year`}
            onChange={(event) => setDraft({ year: Number(event.target.value) })}
            value={draft.year}
          >
            {demoYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="ds-label-text">Марка</span>
          <select
            className="ds-select"
            id={`${idPrefix}-make`}
            onChange={(event) => setDraft({ makeId: event.target.value })}
            value={draft.makeId}
          >
            {demoMakes.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
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
            value={draft.modelId}
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="ds-label-text">Поколение / кузов</span>
          <select
            className="ds-select"
            id={`${idPrefix}-generation`}
            onChange={(event) => setDraft({ generationId: event.target.value })}
            value={draft.generationId}
          >
            {generations.map((generation) => (
              <option key={generation.id} value={generation.id}>
                {generation.code} ({generation.yearsLabel})
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button type="submit">Показать демонстрационные детали</Button>
      <p className="ds-caption">
        Подбор идёт по примерам на этой странице и не сверяется с рабочим каталогом.
      </p>
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
