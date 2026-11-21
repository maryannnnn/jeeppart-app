export function SiteFooter() {
  return (
    <footer className="ds-footer">
      <div className="ds-container grid gap-6 py-10 md:grid-cols-3">
        <div>
          <p className="ds-h4">JEEP-PART.RU</p>
          <p className="ds-caption mt-2 text-[var(--ds-header-muted)]">
            Демонстрационная витрина. Каталог, наличие и заказы на этом этапе не подключены.
          </p>
        </div>
        <div>
          <p className="ds-label-text text-[var(--ds-header-muted)]">На этой странице</p>
          <div className="mt-2 grid gap-1">
            <a href="#popular-models">Модели</a>
            <a href="#categories">Категории</a>
            <a href="#catalog">Товары</a>
          </div>
        </div>
        <div>
          <p className="ds-label-text text-[var(--ds-header-muted)]">Контакты</p>
          <p className="ds-caption mt-2 text-[var(--ds-header-muted)]">
            Телефон и адрес будут добавлены отдельно. Сейчас это место оставлено пустым специально.
          </p>
        </div>
      </div>
    </footer>
  )
}
