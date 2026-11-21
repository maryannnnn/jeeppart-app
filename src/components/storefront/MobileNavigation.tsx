'use client'

import { Car, LayoutGrid, Search, ShoppingBag, X } from 'lucide-react'

import { demoCategories } from '@/components/storefront/data/demo-catalog'
import { SearchAutocomplete } from '@/components/storefront/SearchAutocomplete'
import { useStorefront } from '@/components/storefront/storefront-context'

export function MobileNavigation() {
  const {
    cartCount,
    categoryId,
    garage,
    mobileOpen,
    setCartOpen,
    setCategoryId,
    setGarageOpen,
    setMobileOpen,
  } = useStorefront()

  return (
    <>
      {mobileOpen ? (
        <div className="ds-overlay ds-mobile-only flex lg:hidden">
          <div aria-modal="true" className="ds-drawer ds-drawer-left flex w-[min(100%,22rem)] flex-col" role="dialog">
            <div className="flex items-center justify-between border-b border-[var(--ds-divider)] p-4">
              <h2 className="ds-h4">Меню</h2>
              <button aria-label="Закрыть меню" className="ds-btn ds-btn-ghost" onClick={() => setMobileOpen(false)} type="button">
                <X size={20} />
              </button>
            </div>
            <div className="grid gap-4 overflow-y-auto p-4">
              <SearchAutocomplete inline />
              <button
                className="ds-btn ds-btn-secondary justify-between"
                onClick={() => {
                  setMobileOpen(false)
                  setGarageOpen(true)
                }}
                type="button"
              >
                <span className="inline-flex items-center gap-2">
                  <Car size={16} />
                  {garage ? `${garage.modelName} ${garage.generationCode}` : 'Выбрать автомобиль'}
                </span>
              </button>
              <div className="grid gap-1">
                <p className="ds-label-text">Категории демо-витрины</p>
                {demoCategories.map((category) => (
                  <button
                    key={category.id}
                    className="ds-btn ds-menu-link"
                    data-active={categoryId === category.id ? 'true' : 'false'}
                    onClick={() => {
                      setCategoryId(category.id)
                      setMobileOpen(false)
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    type="button"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <p className="ds-caption">Телефон и адрес магазина будут добавлены отдельно.</p>
            </div>
          </div>
          <button aria-label="Закрыть меню" className="flex-1" onClick={() => setMobileOpen(false)} type="button" />
        </div>
      ) : null}

      <nav aria-label="Мобильная навигация" className="ds-bottom-nav lg:hidden">
        <a className="flex flex-col items-center gap-0.5 text-[10px] font-semibold" href="#catalog">
          <LayoutGrid size={18} />
          Витрина
        </a>
        <button className="flex flex-col items-center gap-0.5 text-[10px] font-semibold" onClick={() => setGarageOpen(true)} type="button">
          <Car size={18} />
          Гараж
        </button>
        <button className="flex flex-col items-center gap-0.5 text-[10px] font-semibold" onClick={() => setMobileOpen(true)} type="button">
          <Search size={18} />
          Поиск
        </button>
        <button className="relative flex flex-col items-center gap-0.5 text-[10px] font-semibold" onClick={() => setCartOpen(true)} type="button">
          <ShoppingBag size={18} />
          Корзина
          {cartCount > 0 ? <span className="ds-cart-count">{cartCount}</span> : null}
        </button>
      </nav>
    </>
  )
}
