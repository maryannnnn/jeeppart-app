'use client'

import { Menu, Phone, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { formatPrice } from '@/components/storefront/data/demo-catalog'
import { MainNavigation } from '@/components/storefront/MainNavigation'
import { MyGarageButton } from '@/components/storefront/MyGarageButton'
import { SearchAutocomplete } from '@/components/storefront/SearchAutocomplete'
import { useStorefront } from '@/components/storefront/storefront-context'

function GrilleMark() {
  return (
    <svg aria-hidden className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 4h2v16H3V4zm4 0h2v16H7V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4zM1 20h22v2H1z" />
    </svg>
  )
}

export function SiteHeader() {
  const { cartCount, cartTotal, setCartOpen, setMobileOpen } = useStorefront()

  return (
    <header className="ds-header">
      <div className="ds-container flex items-center gap-3 py-3">
        <button
          aria-label="Открыть меню"
          className="ds-icon-btn p-2 lg:hidden"
          onClick={() => setMobileOpen(true)}
          type="button"
        >
          <Menu size={22} />
        </button>

        <Link className="flex min-w-0 items-center gap-2" href="/">
          <span className="ds-logo-mark">
            <GrilleMark />
          </span>
          <span className="min-w-0">
            <span className="ds-logo-title block">
              JEEP-PART<span>.RU</span>
            </span>
            <span className="ds-logo-sub hidden sm:block">Демонстрационная витрина</span>
          </span>
        </Link>

        <div className="mx-auto hidden min-w-0 max-w-xl flex-1 sm:block">
          <SearchAutocomplete />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <MyGarageButton />
          <div className="ds-contact hidden items-center gap-2 xl:flex">
            <Phone size={14} />
            <span>
              <span className="block font-bold text-[var(--ds-header-text)]">Контакты</span>
              Телефон будет добавлен
            </span>
          </div>
          <button
            aria-label={`Корзина, ${cartCount} шт.`}
            className="ds-cart-btn"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">{formatPrice(cartTotal)}</span>
            {cartCount > 0 ? <span className="ds-cart-count">{cartCount}</span> : null}
          </button>
        </div>
      </div>

      <div className="ds-container pb-3 sm:hidden">
        <SearchAutocomplete />
      </div>
      <MainNavigation />
    </header>
  )
}
