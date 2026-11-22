'use client'

import { serviceLinks } from '@/components/storefront/data/site-menu'
import { useStorefront } from '@/components/storefront/storefront-context'

export function ServiceLinks() {
  const { setCartOpen } = useStorefront()

  return (
    <nav aria-label="Компания и клиентам" className="ds-service-links">
      <div className="ds-container ds-service-links-row">
        {serviceLinks.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <button onClick={() => setCartOpen(true)} type="button">
          корзина
        </button>
      </div>
    </nav>
  )
}
