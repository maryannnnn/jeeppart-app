'use client'

import { ProductCard } from '@/components/storefront/ProductCard'
import { useStorefront } from '@/components/storefront/storefront-context'

export function ProductGrid() {
  const { visibleProducts, garage, onlyCompatible, searchQuery } = useStorefront()
  const note = searchQuery.trim()
    ? `Поиск по демонстрационным данным: «${searchQuery.trim()}».`
    : onlyCompatible && garage
      ? `Показаны примеры для ${garage.makeName} ${garage.modelName} ${garage.generationCode}, ${garage.year}.`
      : 'Полный набор демонстрационных карточек. Это не рабочий каталог.'

  return (
    <section className="ds-section" id="catalog">
      <div className="ds-container">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="ds-h2">Демонстрационные товары</h2>
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
            <p className="ds-h4">В этом сочетании примеров ничего нет</p>
            <p className="ds-caption mt-2">Смените категорию, сбросьте гараж или очистите поиск.</p>
          </div>
        )}
      </div>
    </section>
  )
}
