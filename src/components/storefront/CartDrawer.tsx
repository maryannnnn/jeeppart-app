'use client'

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'

import { Button } from '@/design-system'
import { formatPrice } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

export function CartDrawer() {
  const { cart, cartCount, cartOpen, cartTotal, changeQuantity, removeFromCart, setCartOpen, notify } =
    useStorefront()

  if (!cartOpen) return null

  return (
    <div className="ds-overlay flex justify-end">
      <button aria-label="Закрыть корзину" className="absolute inset-0" onClick={() => setCartOpen(false)} type="button" />
      <aside aria-labelledby="cart-title" aria-modal="true" className="ds-drawer relative z-10 flex flex-col" role="dialog">
        <div className="flex items-center justify-between border-b border-[var(--ds-divider)] p-4">
          <h2 className="ds-h4 inline-flex items-center gap-2" id="cart-title">
            <ShoppingBag size={18} />
            Корзина ({cartCount})
          </h2>
          <button aria-label="Закрыть" className="ds-btn ds-btn-ghost" onClick={() => setCartOpen(false)} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {cart.length > 0 ? (
            cart.map((line) => (
              <article className="ds-card flex items-center gap-3 rounded-[var(--ds-radius-md)] p-3" key={line.productId}>
                <div className="min-w-0 flex-1">
                  <p className="ds-oem text-[var(--ds-primary-ink)]">OEM {line.product.oem}</p>
                  <p className="ds-small truncate font-bold">{line.product.name}</p>
                  <p className="ds-caption">{formatPrice(line.product.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Уменьшить количество"
                    className="ds-btn ds-btn-secondary px-2 py-2"
                    onClick={() => changeQuantity(line.productId, -1)}
                    type="button"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{line.quantity}</span>
                  <button
                    aria-label="Увеличить количество"
                    className="ds-btn ds-btn-secondary px-2 py-2"
                    onClick={() => changeQuantity(line.productId, 1)}
                    type="button"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    aria-label="Удалить товар"
                    className="ds-btn ds-btn-ghost px-2 py-2 text-[var(--ds-error)]"
                    onClick={() => removeFromCart(line.productId)}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="ds-caption py-10 text-center">В демонстрационной корзине пока пусто.</p>
          )}
        </div>

        <div className="grid gap-3 border-t border-[var(--ds-divider)] bg-[var(--ds-muted-bg)] p-4">
          <div className="flex items-center justify-between">
            <span className="ds-h5">Сумма примеров</span>
            <span className="ds-price text-[length:var(--ds-h3)]">{formatPrice(cartTotal)}</span>
          </div>
          <Button
            disabled={cart.length === 0}
            onClick={() => notify('Оформление заказа на этом этапе не подключено. Корзина остаётся локальной.')}
            variant="primary"
          >
            Перейти к оформлению
          </Button>
          <p className="ds-caption">Заказ не создаётся, оплата не запускается.</p>
        </div>
      </aside>
    </div>
  )
}
