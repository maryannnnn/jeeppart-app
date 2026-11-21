'use client'

import { CheckCircle2 } from 'lucide-react'

import { VehicleSelector } from '@/components/storefront/VehicleSelector'

export function HeroSection() {
  return (
    <section className="ds-hero">
      <div className="ds-container relative z-10 grid items-center gap-8 py-10 lg:grid-cols-2 lg:py-16">
        <div className="max-w-xl">
          <p className="ds-kicker">Демонстрационный интерфейс</p>
          <h1 className="ds-h1 mt-4">
            Запчасти для <span className="text-[var(--ds-primary)]">Jeep</span>
          </h1>
          <p className="ds-lead mt-4 text-[var(--ds-hero-muted)]">
            Витрина для оценки дизайна. Модели, поиск и корзина работают на примерах и не подключены
            к каталогу магазина.
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            <li className="ds-badge ds-hero-chip">
              <CheckCircle2 size={14} />
              OEM-номера в карточках — примеры
            </li>
            <li className="ds-badge ds-hero-chip">
              Цены и наличие демонстрационные
            </li>
          </ul>
        </div>
        <div className="ds-panel p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <h2 className="ds-h4">Подбор по автомобилю</h2>
            <span className="ds-caption">Примеры Jeep</span>
          </div>
          <VehicleSelector idPrefix="hero" />
        </div>
      </div>
    </section>
  )
}
