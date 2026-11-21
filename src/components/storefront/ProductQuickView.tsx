'use client'

import { ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/design-system'
import { formatPrice, type DemoProduct } from '@/components/storefront/data/demo-catalog'
import { useStorefront } from '@/components/storefront/storefront-context'

export function ProductQuickView() {
  const { quickView } = useStorefront()
  if (!quickView) return null
  return <QuickViewDialog key={quickView.id} product={quickView} />
}

function QuickViewDialog({ product }: { product: DemoProduct }) {
  const { closeQuickView, addToCart, fitment } = useStorefront()
  const [question, setQuestion] = useState('')
  const [localQuestions, setLocalQuestions] = useState<string[]>([])
  const quickView = product

  const match = fitment(quickView)
  const generations = quickView.generationIds.join(', ')

  return (
    <div className="ds-overlay flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button aria-label="Закрыть карточку" className="absolute inset-0" onClick={closeQuickView} type="button" />
      <div
        aria-labelledby="quick-view-title"
        aria-modal="true"
        className="ds-modal relative z-10"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--ds-divider)] p-5">
          <div>
            <p className="ds-oem text-[var(--ds-primary-ink)]">
              OEM {quickView.oem} · {quickView.brand}
            </p>
            <h2 className="ds-h3 mt-1" id="quick-view-title">
              {quickView.name}
            </h2>
          </div>
          <button aria-label="Закрыть" className="ds-btn ds-btn-ghost" onClick={closeQuickView} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-5 p-5">
          <p className="ds-lead">{quickView.description}</p>
          {match ? (
            <p className={`ds-badge ${match.status === 'fit' ? 'ds-fit-yes' : 'ds-fit-no'}`}>{match.text}</p>
          ) : null}

          <section>
            <h3 className="ds-label-text mb-2">Характеристики</h3>
            <div className="overflow-hidden rounded-[var(--ds-radius-md)] border border-[var(--ds-border)]">
              {Object.entries(quickView.specs).map(([name, value]) => (
                <div className="ds-spec-row sm:flex-row sm:justify-between" key={name}>
                  <span className="ds-small font-semibold text-[var(--ds-text-secondary)] sm:w-1/3">{name}</span>
                  <span className="ds-oem sm:w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ds-qa p-4">
            <h3 className="ds-h5">Совместимость в демо-данных</h3>
            <p className="ds-small mt-1">{quickView.vehicleName}</p>
            <p className="ds-caption">
              Годы примера: {quickView.yearFrom}–{quickView.yearTo}. Коды поколений: {generations}.
            </p>
            <p className="ds-small mt-2">{quickView.notes}</p>
          </section>

          <section>
            <h3 className="ds-label-text mb-2">Вопросы и ответы</h3>
            <div className="grid gap-3">
              {quickView.questions.length > 0 ? (
                quickView.questions.map((item) => (
                  <article className="ds-qa grid gap-3 p-4" key={item.id}>
                    <div>
                      <p className="ds-small font-bold">
                        {item.author} <span className="ds-caption font-normal">{item.date}</span>
                      </p>
                      <p className="ds-small mt-1">{item.question}</p>
                    </div>
                    <div className="border-l-2 border-[var(--ds-success)] pl-3">
                      <p className="ds-caption font-bold text-[var(--ds-success)]">{item.authorRole}</p>
                      <p className="ds-small mt-1">{item.answer}</p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="ds-caption">В этой карточке нет готовых вопросов.</p>
              )}
              {localQuestions.map((item) => (
                <article className="ds-qa p-4" key={item}>
                  <p className="ds-small font-bold">Вы</p>
                  <p className="ds-small mt-1">{item}</p>
                  <p className="ds-caption mt-2">Вопрос виден только здесь и никуда не отправлен.</p>
                </article>
              ))}
            </div>
            <form
              className="mt-3 flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault()
                const next = question.trim()
                if (!next) return
                setLocalQuestions((current) => [...current, next])
                setQuestion('')
              }}
            >
              <input
                className="ds-input"
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Вопрос останется только в этом окне"
                value={question}
              />
              <Button type="submit" variant="secondary">
                Добавить
              </Button>
            </form>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ds-divider)] bg-[var(--ds-muted-bg)] p-5">
          <div>
            <p className="ds-caption">Демонстрационная цена</p>
            <p className="ds-price">{formatPrice(quickView.price)}</p>
          </div>
          <Button
            onClick={() => {
              addToCart(quickView.id)
              closeQuickView()
            }}
          >
            <ShoppingBag size={16} />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  )
}
