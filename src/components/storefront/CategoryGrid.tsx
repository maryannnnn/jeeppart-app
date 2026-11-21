import {
  Armchair,
  Bolt,
  Boxes,
  Cable,
  Car,
  CarFront,
  ChevronRight,
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

export type StorefrontCategoryLink = {
  id: number
  title: string
  href: string
  slug: string
}

export function CategoryGrid({ categories }: { categories: StorefrontCategoryLink[] }) {
  return (
    <section className="ds-section border-y border-[var(--ds-divider)] pt-0" id="categories">
      <div className="ds-container">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="ds-h2">Категории</h2>
          <Link className="ds-category-all" href="/katalog">
            Все категории
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="ds-category-grid">
          {categories.map((category) => {
            const Icon = icons[category.slug] ?? Car
            return (
              <Link className="ds-category-link" href={category.href} key={category.id} title={category.title}>
                <span className="ds-category-orb">
                  <Icon size={26} />
                </span>
                <span className="ds-category-label">{category.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
