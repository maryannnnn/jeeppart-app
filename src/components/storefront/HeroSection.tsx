'use client'

import { GarageStatusBanner } from '@/components/storefront/GarageStatusBanner'
import { VehicleSelector } from '@/components/storefront/VehicleSelector'

export function HeroSection() {
  return (
    <section className="ds-hero ds-hero-photo">
      <img alt="" className="ds-hero-photo-img" src="/storefront/hero-jeep.jpg" />
      <div className="ds-hero-shade" />
      <div className="ds-container ds-hero-layout">
        <div className="ds-hero-copy">
          <p className="ds-hero-title">
            Оригинальные запчасти
            <span className="ds-hero-title-line">
              и тюнинг для <span className="ds-hero-brand">JEEP</span>
            </span>
          </p>
          <p className="ds-hero-lead">
            <span className="ds-hero-stat">100%</span> сопоставление по{' '}
            <span className="ds-hero-term">OEM-артикулам</span>, проверка по{' '}
            <span className="ds-hero-term">VIN-коду</span> и быстрая фильтрация под ваш кузов.
          </p>
        </div>
        <div className="ds-fitment-block">
          <div className="ds-fitment">
            <p className="ds-fitment-title">Подбор по автомобилю</p>
            <VehicleSelector idPrefix="hero" layout="bar" />
          </div>
          <GarageStatusBanner />
        </div>
      </div>
    </section>
  )
}
