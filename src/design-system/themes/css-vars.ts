import type { CSSProperties } from 'react'

import type { StoreTheme, ThemeColors } from '@/design-system/themes/types'

const colorVarMap = {
  page: '--ds-page',
  card: '--ds-card',
  text: '--ds-text',
  textSecondary: '--ds-text-secondary',
  headerBg: '--ds-header-bg',
  headerText: '--ds-header-text',
  headerMuted: '--ds-header-muted',
  primary: '--ds-primary',
  primaryHover: '--ds-primary-hover',
  primaryText: '--ds-primary-text',
  primaryInk: '--ds-primary-ink',
  primarySoft: '--ds-primary-soft',
  accent: '--ds-accent',
  success: '--ds-success',
  successSoft: '--ds-success-soft',
  warning: '--ds-warning',
  warningSoft: '--ds-warning-soft',
  error: '--ds-error',
  errorSoft: '--ds-error-soft',
  border: '--ds-border',
  divider: '--ds-divider',
  badgeBg: '--ds-badge-bg',
  inputBg: '--ds-input-bg',
  mutedBg: '--ds-muted-bg',
  heroBg: '--ds-hero-bg',
  heroText: '--ds-hero-text',
  heroMuted: '--ds-hero-muted',
} as const satisfies Record<keyof ThemeColors, string>

export function themeToCssVars(theme: StoreTheme): CSSProperties {
  const style: Record<string, string> = {}

  for (const [key, cssVariable] of Object.entries(colorVarMap)) {
    style[cssVariable] = theme.colors[key as keyof ThemeColors]
  }

  return style as CSSProperties
}
