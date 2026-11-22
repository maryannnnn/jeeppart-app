'use client'

import { ThemeScope } from '@/design-system'
import { CartDrawer } from '@/components/storefront/CartDrawer'
import { CategoryGrid, type StorefrontCategoryLink } from '@/components/storefront/CategoryGrid'
import { HeroSection } from '@/components/storefront/HeroSection'
import { MobileNavigation } from '@/components/storefront/MobileNavigation'
import { PopularModels } from '@/components/storefront/PopularModels'
import { ProductGrid } from '@/components/storefront/ProductGrid'
import { ProductQuickView } from '@/components/storefront/ProductQuickView'
import { ServiceLinks } from '@/components/storefront/ServiceLinks'
import { SiteFooter } from '@/components/storefront/SiteFooter'
import { SiteHeader } from '@/components/storefront/SiteHeader'
import { StorefrontProvider, useStorefront } from '@/components/storefront/storefront-context'
import { ThemePreviewToolbar } from '@/components/storefront/ThemePreviewToolbar'
import { ToastNotifications } from '@/components/storefront/ToastNotifications'
import { GarageDialog } from '@/components/storefront/VehicleSelector'

function StorefrontFrame({ categories }: { categories: StorefrontCategoryLink[] }) {
  const { theme } = useStorefront()

  return (
    <ThemeScope className="flex-1" theme={theme}>
      <div className="ds-sticky-top">
        <ThemePreviewToolbar />
        <SiteHeader />
      </div>
      <main>
        <HeroSection />
        <section className="ds-page-title">
          <div className="ds-container">
            <h1 className="ds-h1">Купить аксессуары и автозапчасти для Джипов (Jeep)</h1>
          </div>
        </section>
        <PopularModels />
        <CategoryGrid categories={categories} />
        <ProductGrid />
      </main>
      <ServiceLinks />
      <SiteFooter />
      <MobileNavigation />
      <GarageDialog />
      <ProductQuickView />
      <CartDrawer />
      <ToastNotifications />
    </ThemeScope>
  )
}

export function StorefrontHome({ categories }: { categories: StorefrontCategoryLink[] }) {
  return (
    <StorefrontProvider>
      <StorefrontFrame categories={categories} />
    </StorefrontProvider>
  )
}
