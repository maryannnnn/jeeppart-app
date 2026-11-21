'use client'

import { Menu, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { MainNavigation } from '@/components/storefront/MainNavigation'
import { MyGarageButton } from '@/components/storefront/MyGarageButton'
import { SearchAutocomplete } from '@/components/storefront/SearchAutocomplete'
import { phoneLink, topBarLinks } from '@/components/storefront/data/site-menu'
import { useStorefront } from '@/components/storefront/storefront-context'

export function SiteHeader() {
  const { cartCount, setCartOpen, setMobileOpen } = useStorefront()

  return (
    <header className="ds-header">
      <div className="ds-topbar">
        <div className="ds-container ds-topbar-row">
          <nav aria-label="Верхнее меню" className="ds-topbar-links">
            {topBarLinks.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <button onClick={() => setCartOpen(true)} type="button">
              корзина
            </button>
          </nav>
          <a className="ds-topbar-phone" href={phoneLink.href}>
            {phoneLink.label}
          </a>
        </div>
      </div>

      <div className="ds-container ds-header-main">
        <button
          aria-label="Открыть меню"
          className="ds-icon-btn ds-header-burger p-2 lg:hidden"
          onClick={() => setMobileOpen(true)}
          type="button"
        >
          <Menu size={22} />
        </button>

        <Link className="ds-header-logo" href="/">
          <span className="ds-logo-title">Jeep</span>
          <span className="ds-logo-sub">Запчасти и аксессуары</span>
        </Link>

        <div className="ds-header-search">
          <SearchAutocomplete />
        </div>

        <div className="ds-header-actions">
          <MyGarageButton />
          <button
            aria-label={`Корзина, ${cartCount} шт.`}
            className="ds-cart-btn"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <ShoppingBag size={18} />
            <span className="ds-cart-count">{cartCount}</span>
          </button>
        </div>
      </div>

      <MainNavigation />
    </header>
  )
}
