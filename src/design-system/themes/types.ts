export type ThemeId =
  | 'quadratec'
  | 'mopar'
  | 'trail-olive'
  | 'moab'
  | 'dark-garage'
  | 'engineering'
  | 'winter'
  | 'heavy-yellow'
  | 'restoration'
  | 'monochrome'

export type ThemeColors = {
  page: string
  card: string
  text: string
  textSecondary: string
  headerBg: string
  headerText: string
  headerMuted: string
  primary: string
  primaryHover: string
  primaryText: string
  primaryInk: string
  primarySoft: string
  accent: string
  success: string
  successSoft: string
  warning: string
  warningSoft: string
  error: string
  errorSoft: string
  border: string
  divider: string
  badgeBg: string
  inputBg: string
  mutedBg: string
  heroBg: string
  heroText: string
  heroMuted: string
}

export type StoreTheme = {
  id: ThemeId
  name: string
  description: string
  dark: boolean
  colors: ThemeColors
}
