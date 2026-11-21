'use client'

import Link from 'next/link'

import {
  catalogMenu,
  homepageModels,
  menuSideLinks,
} from '@/components/storefront/data/site-menu'
import { useStorefront } from '@/components/storefront/storefront-context'

export function MainNavigation() {
  const { setCartOpen } = useStorefront()

  return (
    <nav aria-label="Меню сайта" className="ds-nav hidden lg:block">
      <div className="ds-container ds-nav-row">
        <Link className="ds-nav-link" href="/">
          главная
        </Link>
        <div className="ds-nav-item">
          <Link className="ds-nav-link" href="/car">
            модели
          </Link>
          <div className="ds-nav-drop">
            {homepageModels.map((model) => (
              <Link href={model.href} key={model.href}>
                {model.title} {model.years}
              </Link>
            ))}
          </div>
        </div>
        <div className="ds-nav-item">
          <Link className="ds-nav-link" href="/katalog">
            каталог
          </Link>
          <div className="ds-nav-drop">
            {catalogMenu.map((item) =>
              item.href.startsWith('http') ? (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
        <a className="ds-nav-link" href="https://jeep-part.ru/klientam/dostavka">
          доставка
        </a>
        <button className="ds-nav-link" onClick={() => setCartOpen(true)} type="button">
          корзина
        </button>
        <span className="ds-nav-side">
          {menuSideLinks.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </span>
      </div>
    </nav>
  )
}
