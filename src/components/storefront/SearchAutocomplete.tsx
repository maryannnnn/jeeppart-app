'use client'

import { Search, X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'

import { formatPrice } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

export function SearchAutocomplete({ inline = false }: { inline?: boolean }) {
  const inputId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const {
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
    searchResults,
    openQuickView,
  } = useStorefront()
  const showPanel = searchOpen && searchQuery.trim().length > 0

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [setSearchOpen])

  return (
    <div className="ds-search" ref={panelRef}>
      <label className="sr-only" htmlFor={inputId}>
        Поиск по демонстрационным товарам
      </label>
      <Search aria-hidden className="ds-search-icon" size={16} />
      <input
        className="ds-input"
        id={inputId}
        onChange={(event) => {
          setSearchQuery(event.target.value)
          setSearchOpen(true)
        }}
        onFocus={() => setSearchOpen(true)}
        placeholder="Название, OEM, кросс, бренд или модель"
        value={searchQuery}
      />
      {searchQuery ? (
        <button
          aria-label="Очистить поиск"
          className="ds-search-clear rounded-md p-1"
          onClick={() => {
            setSearchQuery('')
            setSearchOpen(false)
          }}
          type="button"
        >
          <X size={16} />
        </button>
      ) : null}

      {showPanel ? (
        <div className={inline ? 'ds-search-panel ds-search-panel-inline' : 'ds-search-panel'} role="listbox">
          <div className="ds-caption flex items-center justify-between px-3 py-2">
            <span>Демо-результаты: {searchResults.length}</span>
            <button className="ds-btn-ghost" onClick={() => setSearchOpen(false)} type="button">
              Закрыть
            </button>
          </div>
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <button
                key={product.id}
                className="ds-search-item"
                onClick={() => openQuickView(product.id)}
                type="button"
              >
                <span className="min-w-0">
                  <span className="ds-oem ds-oem-chip">OEM {product.oem}</span>
                  <span className="ds-product-name mt-1 block truncate">{product.name}</span>
                  <span className="ds-caption block truncate">
                    {product.brand} · {product.vehicleName}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="ds-small font-extrabold">{formatPrice(product.price)}</span>
                  <span className="ds-caption block">демо-цена</span>
                </span>
              </button>
            ))
          ) : (
            <p className="ds-small px-4 py-6 text-center text-[var(--ds-text-secondary)]">
              По запросу «{searchQuery.trim()}» в демонстрационных данных ничего нет. Проверьте OEM
              без пробелов.
            </p>
          )}
        </div>
      ) : null}
    </div>
  )
}
