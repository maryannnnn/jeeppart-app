import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { homepageModels } from '@/components/storefront/data/site-menu'

export function PopularModels() {
  return (
    <section className="ds-section" id="popular-models">
      <div className="ds-container">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="ds-h2">Популярные модели</h2>
          <Link className="ds-category-all" href="/car">
            Все модели
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="ds-model-grid">
          {homepageModels.map((model) => (
            <Link className="ds-model-photo" href={model.href} key={model.href}>
              <img alt="" src={model.image} />
              <span className="ds-model-photo-copy">
                <span className="ds-h5">{model.title}</span>
                <span className="ds-caption">{model.years}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
