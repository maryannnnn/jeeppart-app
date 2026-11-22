'use client'

import { ProductCard } from '@/components/storefront/ProductCard'
import { useStorefront } from '@/components/storefront/storefront-context'

export function ProductGrid() {
  const { visibleProducts, garage, onlyCompatible, searchQuery } = useStorefront()
  const vehicle = garage
    ? `${garage.makeName} ${garage.modelName} ${garage.generationCode}`
    : ''
  const note = searchQuery.trim()
    ? `Поиск: «${searchQuery.trim()}».`
    : onlyCompatible && garage
      ? `Детали с подтверждённой совместимостью для ${vehicle}`
      : 'Оригиналы Mopar и альтернативы с независимыми тестами.'

  return (
    <section className="ds-section" id="catalog">
      <div className="ds-container">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="ds-h2">Каталог деталей Jeep</h2>
            <p className="ds-caption mt-1">{note}</p>
          </div>
          <p className="ds-small font-bold">Найдено: {visibleProducts.length}</p>
        </div>
        {visibleProducts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="ds-card rounded-[var(--ds-radius-lg)] px-4 py-10 text-center">
            <p className="ds-h4">Для этого Jeep ничего не найдено</p>
            <p className="ds-caption mt-2">Смените категорию, сбросьте гараж или очистите поиск.</p>
          </div>
        )}
      </div>
    </section>
  )
}
