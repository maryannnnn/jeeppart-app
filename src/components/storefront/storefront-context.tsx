'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { DEFAULT_THEME_ID, getTheme, themes, type StoreTheme, type ThemeId } from '@/design-system'
import {
  demoModels,
  demoProducts,
  findGeneration,
  productMatchesQuery,
  representativeYear,
  type DemoProduct,
} from '@/components/storefront/data/demo-catalog'

export type VehicleDraft = {
  year: number
  makeId: string
  modelId: string
  generationId: string
}

export type GarageVehicle = {
  year: number
  makeId: string
  makeName: string
  modelId: string
  modelName: string
  generationId: string
  generationCode: string
  yearsLabel: string
}

export type CartLine = {
  productId: string
  quantity: number
}

type StorefrontContextValue = {
  theme: StoreTheme
  themes: StoreTheme[]
  setThemeId: (id: ThemeId) => void
  draft: VehicleDraft
  setDraft: (patch: Partial<VehicleDraft>) => void
  garage: GarageVehicle | null
  onlyCompatible: boolean
  setOnlyCompatible: (value: boolean) => void
  applyDraft: () => void
  applyGeneration: (generationId: string) => void
  resetGarage: () => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  searchOpen: boolean
  setSearchOpen: (value: boolean) => void
  searchResults: DemoProduct[]
  categoryId: string
  setCategoryId: (id: string) => void
  visibleProducts: DemoProduct[]
  quickView: DemoProduct | null
  openQuickView: (id: string) => void
  closeQuickView: () => void
  cartOpen: boolean
  setCartOpen: (value: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (value: boolean) => void
  garageOpen: boolean
  setGarageOpen: (value: boolean) => void
  cart: Array<CartLine & { product: DemoProduct }>
  cartCount: number
  cartTotal: number
  addToCart: (productId: string) => void
  changeQuantity: (productId: string, delta: number) => void
  removeFromCart: (productId: string) => void
  toast: string | null
  notify: (message: string) => void
  fitment: (product: DemoProduct) => { status: 'fit' | 'not-fit'; text: string } | null
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null)

const initialDraft: VehicleDraft = {
  year: 2021,
  makeId: 'jeep',
  modelId: 'wrangler',
  generationId: 'wrangler-jl',
}

function garageFromGeneration(generationId: string, year: number): GarageVehicle | null {
  const generation = findGeneration(generationId)
  if (!generation) return null

  return {
    year,
    makeId: generation.makeId,
    makeName: generation.makeName,
    modelId: generation.modelId,
    modelName: generation.modelName,
    generationId: generation.id,
    generationCode: generation.code,
    yearsLabel: generation.yearsLabel,
  }
}

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID)
  const [draft, setDraftState] = useState<VehicleDraft>(initialDraft)
  const [garage, setGarage] = useState<GarageVehicle | null>(null)
  const [onlyCompatible, setOnlyCompatible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [categoryId, setCategoryId] = useState('all')
  const [quickViewId, setQuickViewId] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [garageOpen, setGarageOpen] = useState(false)
  const [cartLines, setCartLines] = useState<CartLine[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = (message: string) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }

  const setDraft = (patch: Partial<VehicleDraft>) => {
    setDraftState((current) => {
      const next = { ...current, ...patch }
      if (patch.modelId && patch.modelId !== current.modelId) {
        const firstGeneration = demoModels.find((model) => model.id === patch.modelId)?.generations[0]
        if (firstGeneration) next.generationId = firstGeneration.id
      }
      return next
    })
  }

  const applyGarage = (generationId: string, year: number, message: string) => {
    const nextGarage = garageFromGeneration(generationId, year)
    if (!nextGarage) return
    setDraftState({
      year,
      makeId: nextGarage.makeId,
      modelId: nextGarage.modelId,
      generationId: nextGarage.generationId,
    })
    setGarage(nextGarage)
    setOnlyCompatible(true)
    setGarageOpen(false)
    setMobileOpen(false)
    notify(message)
  }

  const applyDraft = () => {
    applyGarage(
      draft.generationId,
      draft.year,
      `Гараж: Jeep ${labelFor(draft.generationId)} ${draft.year}. Фильтр включён на демо-товарах.`,
    )
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const applyGeneration = (generationId: string) => {
    const generation = findGeneration(generationId)
    if (!generation) return
    const year = representativeYear(generation)
    applyGarage(
      generationId,
      year,
      `Гараж: ${generation.makeName} ${generation.modelName} ${generation.code}, ${year}.`,
    )
  }

  const resetGarage = () => {
    setGarage(null)
    setOnlyCompatible(false)
    notify('Автомобиль сброшен. Снова показаны все демонстрационные товары.')
  }

  const searchResults = useMemo(() => {
    const query = searchQuery.trim()
    if (query.length < 1) return []
    return demoProducts.filter((product) => productMatchesQuery(product, query))
  }, [searchQuery])

  const visibleProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      if (categoryId !== 'all' && product.categoryId !== categoryId) return false
      if (onlyCompatible && garage) {
        const matchesGeneration = product.generationIds.includes(garage.generationId)
        const matchesYear = garage.year >= product.yearFrom && garage.year <= product.yearTo
        if (!matchesGeneration || !matchesYear) return false
      }
      if (searchQuery.trim()) return productMatchesQuery(product, searchQuery)
      return true
    })
  }, [categoryId, garage, onlyCompatible, searchQuery])

  const cart = cartLines.flatMap((line) => {
    const product = demoProducts.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  })
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0)
  const cartTotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  const addToCart = (productId: string) => {
    const product = demoProducts.find((item) => item.id === productId)
    if (!product) return
    setCartLines((current) => {
      const existing = current.find((line) => line.productId === productId)
      if (!existing) return [...current, { productId, quantity: 1 }]
      return current.map((line) =>
        line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line,
      )
    })
    notify(`«${product.name}» добавлен в демонстрационную корзину`)
  }

  const changeQuantity = (productId: string, delta: number) => {
    setCartLines((current) =>
      current.flatMap((line) => {
        if (line.productId !== productId) return [line]
        const quantity = line.quantity + delta
        return quantity > 0 ? [{ ...line, quantity }] : []
      }),
    )
  }

  const removeFromCart = (productId: string) => {
    setCartLines((current) => current.filter((line) => line.productId !== productId))
  }

  const openQuickView = (id: string) => {
    setQuickViewId(id)
    setSearchOpen(false)
  }

  useEffect(() => {
    const locked = cartOpen || mobileOpen || garageOpen || Boolean(quickViewId)
    const previous = document.body.style.overflow
    document.body.style.overflow = locked ? 'hidden' : previous
    return () => {
      document.body.style.overflow = previous
    }
  }, [cartOpen, garageOpen, mobileOpen, quickViewId])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setSearchOpen(false)
      setCartOpen(false)
      setMobileOpen(false)
      setGarageOpen(false)
      setQuickViewId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  const value: StorefrontContextValue = {
    theme: getTheme(themeId),
    themes,
    setThemeId,
    draft,
    setDraft,
    garage,
    onlyCompatible,
    setOnlyCompatible,
    applyDraft,
    applyGeneration,
    resetGarage,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
    searchResults,
    categoryId,
    setCategoryId,
    visibleProducts,
    quickView: demoProducts.find((product) => product.id === quickViewId) ?? null,
    openQuickView,
    closeQuickView: () => setQuickViewId(null),
    cartOpen,
    setCartOpen,
    mobileOpen,
    setMobileOpen,
    garageOpen,
    setGarageOpen,
    cart,
    cartCount,
    cartTotal,
    addToCart,
    changeQuantity,
    removeFromCart,
    toast,
    notify,
    fitment: (product) => {
      if (!garage) return null
      const matchesGeneration = product.generationIds.includes(garage.generationId)
      const matchesYear = garage.year >= product.yearFrom && garage.year <= product.yearTo
      const label = `${garage.makeName} ${garage.modelName} ${garage.generationCode} (${garage.year})`
      if (matchesGeneration && matchesYear) {
        return { status: 'fit', text: `Демо: есть в списке для ${label}` }
      }
      return { status: 'not-fit', text: `Демо: нет в списке для ${label}` }
    },
  }

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

export function useStorefront() {
  const value = useContext(StorefrontContext)
  if (!value) throw new Error('useStorefront must be used within StorefrontProvider')
  return value
}

function labelFor(generationId: string): string {
  const generation = findGeneration(generationId)
  if (!generation) return 'Jeep'
  return `${generation.modelName} ${generation.code}`
}
