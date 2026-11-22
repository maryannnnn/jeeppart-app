'use client'

import {
  Armchair,
  Bolt,
  Boxes,
  Cable,
  Car,
  CarFront,
  ChevronDown,
  CircleDot,
  Cog,
  Disc,
  Fan,
  Fuel,
  Funnel,
  Gauge,
  Link2,
  Navigation,
  Radar,
  Settings2,
  Shield,
  Snowflake,
  Truck,
  UnfoldVertical,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const icons: Record<string, LucideIcon> = {
  interer: Armchair,
  bampery: Shield,
  eksterer: Car,
  'diski-shiny': Disc,
  podveska: UnfoldVertical,
  'datchiki-davleniya-shin': Gauge,
  'obves-dlya-avtomobilei': Truck,
  '1000-melochei': Boxes,
  'glavnaya-peredacha': Cog,
  datchiki: Radar,
  dvigatel: Settings2,
  konditsioner: Snowflake,
  'korobka-peredach': Cog,
  krepezh: Bolt,
  kuzov: CarFront,
  'remennyi-privod': Link2,
  'rulevoe-upravleniya': Navigation,
  'sistema-vypuska': Wind,
  'sistema-zazhiganiya': Zap,
  'sistema-okhlazhdeniya': Fan,
  'toplivnaya-sistema': Fuel,
  'tormoznaya-sistema': CircleDot,
  filtry: Funnel,
  elektrika: Cable,
}

type SystemId = 'all' | 'service' | 'chassis' | 'engine' | 'body'

const systems: Array<{ id: SystemId; label: string }> = [
  { id: 'all', label: 'Все узлы' },
  { id: 'service', label: 'ТО и расходники' },
  { id: 'chassis', label: 'Ходовая и тормоза' },
  { id: 'engine', label: 'Двигатель и агрегаты' },
  { id: 'body', label: 'Кузов и тюнинг' },
]

const systemBySlug: Record<string, Exclude<SystemId, 'all'>> = {
  filtry: 'service',
  '1000-melochei': 'service',
  krepezh: 'service',
  'remennyi-privod': 'service',
  datchiki: 'service',
  konditsioner: 'service',
  podveska: 'chassis',
  'tormoznaya-sistema': 'chassis',
  'diski-shiny': 'chassis',
  'rulevoe-upravleniya': 'chassis',
  'datchiki-davleniya-shin': 'chassis',
  'glavnaya-peredacha': 'chassis',
  dvigatel: 'engine',
  'korobka-peredach': 'engine',
  'sistema-okhlazhdeniya': 'engine',
  'toplivnaya-sistema': 'engine',
  'sistema-zazhiganiya': 'engine',
  'sistema-vypuska': 'engine',
  elektrika: 'engine',
  kuzov: 'body',
  bampery: 'body',
  eksterer: 'body',
  interer: 'body',
  'obves-dlya-avtomobilei': 'body',
}

const leadSlugs = [
  'filtry',
  'tormoznaya-sistema',
  'podveska',
  'dvigatel',
  'bampery',
  'diski-shiny',
  'elektrika',
  'kuzov',
  'sistema-okhlazhdeniya',
]

export type StorefrontCategoryLink = {
  id: number
  title: string
  href: string
  slug: string
}

export function CategoryGrid({ categories }: { categories: StorefrontCategoryLink[] }) {
  const [system, setSystem] = useState<SystemId>('all')
  const [open, setOpen] = useState(false)
  const ordered = orderCategories(categories)
  const total = ordered.length

  return (
    <section
      className="ds-section ds-categories border-y border-[var(--ds-divider)]"
      data-open={open ? 'true' : 'false'}
      data-system={system}
      id="categories"
    >
      <div className="ds-container">
        <div className="ds-category-head">
          <div>
            <h2 className="ds-h2">Категории узлов ({total} {plural(total, 'раздел', 'раздела', 'разделов')})</h2>
            <p className="ds-category-kicker">Группировка по инженерным системам и быстрый доступ</p>
          </div>
          <div className="ds-category-systems" role="group" aria-label="Фильтр по назначению">
            {systems.map((item) => {
              const count = item.id === 'all' ? total : ordered.filter((category) => systemBySlug[category.slug] === item.id).length
              return (
                <button
                  aria-pressed={system === item.id}
                  className="ds-category-system"
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSystem(item.id)
                    setOpen(false)
                  }}
                >
                  {item.id === 'all' ? `${item.label} (${count})` : item.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="ds-category-grid">
          {ordered.map((category) => {
            const Icon = icons[category.slug] ?? Car
            return (
              <Link
                className="ds-category-link"
                data-system={systemBySlug[category.slug] ?? 'service'}
                href={category.href}
                key={category.id}
                title={category.title}
              >
                <span className="ds-category-orb">
                  <Icon size={26} />
                </span>
                <span className="ds-category-label">{category.title}</span>
              </Link>
            )
          })}
        </div>
        {system === 'all' && total > 9 ? (
          <div className="ds-category-expand">
            <button
              aria-expanded={open}
              className="ds-btn ds-btn-secondary ds-category-expand-btn"
              type="button"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Свернуть' : `Показать все ${total} ${plural(total, 'категорию', 'категории', 'категорий')}`}
              <ChevronDown size={16} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function plural(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

function orderCategories(categories: StorefrontCategoryLink[]) {
  const bySlug = new Map(categories.map((category) => [category.slug, category]))
  const leading = leadSlugs.flatMap((slug) => {
    const category = bySlug.get(slug)
    return category ? [category] : []
  })
  const rest = categories.filter((category) => !leadSlugs.includes(category.slug))
  return [...leading, ...rest]
}
