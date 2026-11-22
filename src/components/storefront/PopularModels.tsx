'use client'

import { useState } from 'react'
import Link from 'next/link'

import { homepageModels } from '@/components/storefront/data/site-menu'

const visibleCount = 6

/** Parts demand in this market: Grand Cherokee and Wrangler ahead of Compass and Renegade. */
const modelOrder = [
  '/car/jeep-grand-cherokee-wk2-2013-2015',
  '/car/jeep-grand-cherokee-wk2-2016-2018',
  '/car/jeep-wrangler-jk-2007-2015',
  '/car/jeep-grand-cherokee-wk2-2010-2012',
  '/car/jeep-wrangler-jl-2018',
  '/car/jeep-cherokee-kl-2014-2015',
  '/car/jeep-wrangler-unlimited-jk-2007-2015',
  '/car/jeep-compass-mp-2017-2018',
  '/car/jeep-compass-2011-2015',
  '/car/jeep-renegade-2014-2016',
]

const models = modelOrder.map((href) => {
  const model = homepageModels.find((item) => item.href === href)
  if (!model) {
    throw new Error(`Homepage model is missing: ${href}`)
  }
  return model
})

export function PopularModels() {
  const [open, setOpen] = useState(false)
  const leading = models.slice(0, visibleCount)
  const rest = models.slice(visibleCount)

  return (
    <section className="ds-models" id="popular-models" data-open={open ? 'true' : 'false'}>
      <div className="ds-container">
        <div className="ds-model-grid">
          {leading.map((model) => (
            <ModelCard key={model.href} model={model} />
          ))}
          <div className="ds-models-more" id="more-models">
            {rest.map((model) => (
              <ModelCard key={model.href} model={model} />
            ))}
          </div>
        </div>
        <button
          aria-controls="more-models"
          aria-expanded={open}
          className="ds-btn ds-btn-secondary ds-models-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Свернуть' : `Все модели (${models.length})`}
        </button>
      </div>
    </section>
  )
}

function ModelCard({ model }: { model: (typeof models)[number] }) {
  return (
    <Link className="ds-model-photo" href={model.href}>
      <span className="ds-model-stage">
        <img alt="" src={model.image} />
      </span>
      <span className="ds-model-photo-copy">
        <span className="ds-h5">{model.title}</span>
        <span className="ds-caption">{model.years}</span>
      </span>
    </Link>
  )
}
