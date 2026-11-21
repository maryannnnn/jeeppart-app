import type { ReactNode } from 'react'

import { themeToCssVars } from '@/design-system/themes/css-vars'
import type { StoreTheme } from '@/design-system/themes/types'
import { cn } from '@/utilities/cn'

type ThemeScopeProps = {
  theme: StoreTheme
  children: ReactNode
  className?: string
}

export function ThemeScope({ theme, children, className }: ThemeScopeProps) {
  return (
    <div
      className={cn('ds-root', className)}
      data-ds-dark={theme.dark ? 'true' : 'false'}
      data-ds-theme={theme.id}
      style={themeToCssVars(theme)}
    >
      {children}
    </div>
  )
}
