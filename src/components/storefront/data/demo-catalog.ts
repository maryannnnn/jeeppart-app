export type DemoGeneration = {
  id: string
  code: string
  yearsLabel: string
  yearFrom: number
  yearTo: number
}

export type DemoModel = {
  id: string
  makeId: string
  name: string
  generations: DemoGeneration[]
}

export type DemoQuestion = {
  id: string
  author: string
  date: string
  question: string
  answer: string
  authorRole: string
}

export type DemoProduct = {
  id: string
  name: string
  description: string
  vehicleName: string
  oem: string
  crossNumbers: string[]
  brand: string
  brandOrigin: string
  price: number
  oldPrice?: number
  inStock: boolean
  categoryId: string
  generationIds: string[]
  yearFrom: number
  yearTo: number
  notes: string
  specs: Record<string, string>
  questions: DemoQuestion[]
}

export type DemoCategory = {
  id: string
  name: string
  icon: 'all' | 'suspension' | 'brakes' | 'engine' | 'drivetrain' | 'exterior'
}

export const demoMakes = [{ id: 'jeep', name: 'Jeep' }]

export const demoYears = Array.from({ length: 2026 - 1993 + 1 }, (_, index) => 2026 - index)

export function modelsForYear(year: number, makeId = 'jeep') {
  return demoModels.flatMap((model) => {
    if (model.makeId !== makeId) return []
    const generations = model.generations.filter(
      (generation) => year >= generation.yearFrom && year <= generation.yearTo,
    )
    if (generations.length === 0) return []
    return [{ ...model, generations }]
  })
}

export function selectableYears(makeId = 'jeep') {
  return demoYears.filter((year) => modelsForYear(year, makeId).length > 0)
}

export const demoModels: DemoModel[] = [
  {
    id: 'wrangler',
    makeId: 'jeep',
    name: 'Wrangler',
    generations: [
      { id: 'wrangler-jl', code: 'JL', yearsLabel: '2018–2024', yearFrom: 2018, yearTo: 2024 },
      { id: 'wrangler-jk', code: 'JK', yearsLabel: '2007–2017', yearFrom: 2007, yearTo: 2017 },
    ],
  },
  {
    id: 'grand-cherokee',
    makeId: 'jeep',
    name: 'Grand Cherokee',
    generations: [
      { id: 'grand-wk2', code: 'WK2', yearsLabel: '2010–2021', yearFrom: 2010, yearTo: 2021 },
      { id: 'grand-zj-wj', code: 'ZJ/WJ', yearsLabel: '1993–2004', yearFrom: 1993, yearTo: 2004 },
    ],
  },
  {
    id: 'cherokee',
    makeId: 'jeep',
    name: 'Cherokee',
    generations: [{ id: 'cherokee-kl', code: 'KL', yearsLabel: '2014–2023', yearFrom: 2014, yearTo: 2023 }],
  },
  {
    id: 'renegade',
    makeId: 'jeep',
    name: 'Renegade',
    generations: [{ id: 'renegade-bu', code: 'BU', yearsLabel: '2015–2024', yearFrom: 2015, yearTo: 2024 }],
  },
  {
    id: 'compass',
    makeId: 'jeep',
    name: 'Compass',
    generations: [{ id: 'compass-mp', code: 'MP', yearsLabel: '2017–2024', yearFrom: 2017, yearTo: 2024 }],
  },
]

export const demoCategories: DemoCategory[] = [
  { id: 'all', name: 'Все детали', icon: 'all' },
  { id: 'suspension', name: 'Подвеска и лифт', icon: 'suspension' },
  { id: 'brakes', name: 'Тормозная система', icon: 'brakes' },
  { id: 'engine', name: 'Двигатель и ТО', icon: 'engine' },
  { id: 'drivetrain', name: 'Трансмиссия и мосты', icon: 'drivetrain' },
  { id: 'exterior', name: 'Силовой обвес', icon: 'exterior' },
]

export const demoProducts: DemoProduct[] = [
  {
    id: 'prod-1',
    name: 'Амортизатор передний газомасляный Heavy Duty',
    description: 'Демонстрационная карточка переднего амортизатора для нелифтованной подвески Wrangler JL.',
    vehicleName: 'Jeep Wrangler JL',
    oem: '68527794AB',
    crossNumbers: ['68527794AA', '68251595AC', 'BIL-24-285642', 'RS999064'],
    brand: 'MOPAR',
    brandOrigin: 'Пример: США / Stellantis',
    price: 18900,
    oldPrice: 21500,
    inStock: true,
    categoryId: 'suspension',
    generationIds: ['wrangler-jl'],
    yearFrom: 2018,
    yearTo: 2024,
    notes: 'Пример примечания: штатная длина для подвески без лифта. На Rubicon и Sahara показан как болт-он.',
    specs: {
      Категория: 'Подвеска / Амортизаторы',
      'Сторона установки': 'Передний мост, левый или правый',
      'Тип конструкции': 'Двухтрубный газомасляный',
      'Оригинальный номер': '68527794AB',
      'Кросс-номера': '68527794AA, 68251595AC, RS999064, BIL-24-285642',
    },
    questions: [
      {
        id: 'qa-1',
        author: 'Сергей К.',
        date: '14 октября 2024',
        question: 'Шток идёт в комплекте с гайкой и отбойником?',
        answer: 'Это демонстрационный ответ: гайка и верхние втулки указаны в комплекте, отбойник в примере переставляется отдельно.',
        authorRole: 'Пример ответа магазина',
      },
    ],
  },
  {
    id: 'prod-2',
    name: 'Тормозной шланг задний левый армированный',
    description: 'Демонстрационная карточка заднего тормозного шланга для Grand Cherokee WK2.',
    vehicleName: 'Jeep Grand Cherokee WK2',
    oem: '68284572AC',
    crossNumbers: ['52124735AD', '52124735AE', '52124735AF', '52124735AG', 'CRW-68284572'],
    brand: 'MOPAR',
    brandOrigin: 'Пример: Mopar Genuine',
    price: 5400,
    oldPrice: 6200,
    inStock: true,
    categoryId: 'brakes',
    generationIds: ['grand-wk2'],
    yearFrom: 2010,
    yearTo: 2021,
    notes: 'Пример примечания: в комплекте показаны медные шайбы. В демо-данных указаны моторы 3.6, 5.7 и 3.0.',
    specs: {
      Категория: 'Тормозная система',
      Расположение: 'Задний мост, левая сторона',
      'Оригинальный номер': '68284572AC',
      'Аналоги / кроссы': '52124735AD, 52124735AE, 52124735AF, 52124735AG',
      Материал: 'Армированная резина',
    },
    questions: [
      {
        id: 'qa-21',
        author: 'Лариса',
        date: '28 мая 2023',
        question: 'Подойдёт ли шланг на Grand Cherokee WK2 3.0 2014 года, и есть ли в комплекте шайба?',
        answer: 'Демонстрационный ответ: в этих примерах шланг указан для WK2 2010–2021, шайбы отмечены как входящие в комплект.',
        authorRole: 'Пример ответа магазина',
      },
      {
        id: 'qa-22',
        author: 'Игорь А.',
        date: '11 февраля 2024',
        question: 'Чем в примере отличается номер Mopar от кросса Crown?',
        answer: 'Демонстрационный ответ: Mopar показан как исходный номер, Crown — как альтернативный кросс в этой карточке.',
        authorRole: 'Пример ответа магазина',
      },
    ],
  },
  {
    id: 'prod-3',
    name: 'Комплект усиленных рычагов подвески 2.5" Lift Alpine Flexarm',
    description: 'Демонстрационная карточка регулируемых нижних рычагов для Wrangler JK и JL.',
    vehicleName: 'Jeep Wrangler JK / JL',
    oem: '77072396AB',
    crossNumbers: ['TF-1255200', 'TF-1415500', 'MOP-77072396'],
    brand: 'TERAFLEX / MOPAR',
    brandOrigin: 'Пример: США',
    price: 46500,
    oldPrice: 52000,
    inStock: true,
    categoryId: 'suspension',
    generationIds: ['wrangler-jl', 'wrangler-jk'],
    yearFrom: 2007,
    yearTo: 2024,
    notes: 'Пример примечания: диапазон лифта 2.0–3.5 дюйма, сайлентблоки показаны как уже установленные.',
    specs: {
      Категория: 'Подвеска и лифт',
      Применимость: 'Wrangler JK 2007–2017, Wrangler JL 2018–2024',
      'Диапазон лифта': '2.0–3.5 дюйма',
      Производитель: 'TeraFlex / Mopar, демонстрационные данные',
    },
    questions: [
      {
        id: 'qa-31',
        author: 'Дмитрий',
        date: '02 ноября 2024',
        question: 'Нужно ли запрессовывать сайлентблоки?',
        answer: 'Демонстрационный ответ: в этой карточке рычаги показаны собранными.',
        authorRole: 'Пример ответа магазина',
      },
    ],
  },
  {
    id: 'prod-4',
    name: 'Ступица переднего колеса в сборе с датчиком ABS',
    description: 'Демонстрационная карточка передней ступицы Grand Cherokee WK2.',
    vehicleName: 'Jeep Grand Cherokee WK2',
    oem: '52124767AE',
    crossNumbers: ['52124767AB', '52124767AC', '52124767AD', 'MOOG-513324', 'CRW-52124767'],
    brand: 'CROWN AUTOMOTIVE',
    brandOrigin: 'Пример: заменитель OEM',
    price: 14200,
    oldPrice: 16800,
    inStock: true,
    categoryId: 'drivetrain',
    generationIds: ['grand-wk2'],
    yearFrom: 2011,
    yearTo: 2021,
    notes: 'Пример примечания: 5 шпилек, левая и правая стороны в карточке указаны одинаковыми.',
    specs: {
      Категория: 'Трансмиссия и подшипники',
      'Оригинал OEM': '52124767AE',
      'Количество отверстий': '5 шпилек M14x1.5',
      Комплектация: 'Ступица, датчик ABS, шпильки',
    },
    questions: [],
  },
  {
    id: 'prod-5',
    name: 'Фильтр масляный картридж 3.6L V6 Pentastar',
    description: 'Демонстрационная карточка масляного фильтра для мотора 3.6 Pentastar.',
    vehicleName: 'Wrangler / Grand Cherokee / Cherokee',
    oem: '68191349AC',
    crossNumbers: ['68191349AB', 'CH11665', 'HU7007Z', 'MO-349'],
    brand: 'MOPAR',
    brandOrigin: 'Пример: США',
    price: 1650,
    oldPrice: 1950,
    inStock: true,
    categoryId: 'engine',
    generationIds: ['wrangler-jl', 'wrangler-jk', 'grand-wk2', 'cherokee-kl'],
    yearFrom: 2014,
    yearTo: 2024,
    notes: 'Пример примечания: в комплекте показано уплотнительное кольцо крышки масляного стакана.',
    specs: {
      Двигатель: '3.6L V6 Pentastar',
      'Оригинальный номер': '68191349AC',
      'Пример интервала': '8 000–10 000 км в демонстрационной карточке',
    },
    questions: [],
  },
  {
    id: 'prod-6',
    name: 'Силовой передний бампер Stubby с площадкой под лебёдку',
    description: 'Демонстрационная карточка силового бампера для Wrangler JL.',
    vehicleName: 'Jeep Wrangler JL',
    oem: '82215121AB',
    crossNumbers: ['RR-11540.32', 'WAR-100340', 'MOP-82215121'],
    brand: 'RUGGED RIDGE',
    brandOrigin: 'Пример: США',
    price: 64000,
    oldPrice: 72000,
    inStock: false,
    categoryId: 'exterior',
    generationIds: ['wrangler-jl'],
    yearFrom: 2018,
    yearTo: 2024,
    notes: 'Пример примечания: сталь 4.5 мм, площадка под лебёдку показана как интегрированная.',
    specs: {
      Категория: 'Силовой обвес',
      'Площадка под лебёдку': 'Показана в карточке, тяга до 12 500 lbs',
      Материал: 'Сталь с порошковым покрытием',
    },
    questions: [],
  },
]

export type FlatGeneration = DemoGeneration & {
  makeId: string
  makeName: string
  modelId: string
  modelName: string
}

export function listGenerations(): FlatGeneration[] {
  return demoModels.flatMap((model) => {
    const make = demoMakes.find((item) => item.id === model.makeId)
    return model.generations.map((generation) => ({
      ...generation,
      makeId: model.makeId,
      makeName: make?.name ?? 'Jeep',
      modelId: model.id,
      modelName: model.name,
    }))
  })
}

export function findGeneration(id: string): FlatGeneration | undefined {
  return listGenerations().find((generation) => generation.id === id)
}

export function representativeYear(generation: DemoGeneration): number {
  const preferred = 2020
  if (preferred >= generation.yearFrom && preferred <= generation.yearTo) return preferred
  return generation.yearTo
}

export function productMatchesQuery(product: DemoProduct, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return false

  const generations = product.generationIds
    .map((id) => findGeneration(id))
    .flatMap((generation) =>
      generation ? [generation.code, generation.modelName, generation.makeName, generation.yearsLabel] : [],
    )

  return [product.name, product.oem, product.brand, product.vehicleName, ...product.crossNumbers, ...generations]
    .join(' ')
    .toLowerCase()
    .includes(normalized)
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
}

export function categoryCount(categoryId: string): number {
  if (categoryId === 'all') return demoProducts.length
  return demoProducts.filter((product) => product.categoryId === categoryId).length
}
