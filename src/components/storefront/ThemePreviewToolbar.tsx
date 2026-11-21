'use client'

import { SHOW_THEME_PREVIEW } from '@/design-system'
import { useStorefront } from '@/components/storefront/storefront-context'

export function ThemePreviewToolbar() {
  const { theme, themes, setThemeId } = useStorefront()

  if (!SHOW_THEME_PREVIEW) return null

  return (
    <div className="ds-themebar">
      <div className="ds-container flex items-center gap-3 py-2">
        <p className="ds-themebar-label">Темы</p>
        <div className="ds-themebar-track" role="listbox" aria-label="Цветовые темы">
          {themes.map((item) => {
            const active = item.id === theme.id
            return (
              <button
                key={item.id}
                aria-pressed={active}
                className="ds-themebar-btn"
                data-active={active ? 'true' : 'false'}
                onClick={() => setThemeId(item.id)}
                title={item.description}
                type="button"
              >
                <span className="ds-swatch" style={{ backgroundColor: item.colors.primary }} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
