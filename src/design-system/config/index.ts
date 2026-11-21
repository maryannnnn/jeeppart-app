import type { ThemeId } from '@/design-system/themes/types'

/**
 * Верхняя панель выбора тем.
 * false скрывает панель. Сами темы и выбранная тема по умолчанию продолжают работать.
 */
export const SHOW_THEME_PREVIEW = true

/** Тема, которая применяется при открытии витрины. */
export const DEFAULT_THEME_ID: ThemeId = 'quadratec'
