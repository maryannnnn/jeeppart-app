'use client'

import { VehicleSelector } from '@/components/storefront/VehicleSelector'

export function HeroSection() {
  return (
    <section className="ds-hero ds-hero-photo">
      <img alt="" className="ds-hero-photo-img" src="/storefront/hero-jeep.jpg" />
      <div className="ds-hero-shade" />
      <div className="ds-container relative z-10 py-10 lg:py-16">
        <h1 className="ds-hero-title">Запчасти для Джип</h1>
        <div className="ds-fitment">
          <p className="ds-fitment-title">Подбор по автомобилю</p>
          <VehicleSelector idPrefix="hero" layout="bar" />
        </div>
      </div>
    </section>
  )
}
