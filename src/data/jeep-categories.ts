export type JeepCategoryNode = {
  title: string
  slug: string
  href: string
  children: JeepCategoryNode[]
}

export const jeepCategories: JeepCategoryNode[] = [
  {
    "title": "Интерьер",
    "slug": "interer",
    "href": "/katalog/interer",
    "children": [
      {
        "title": "Звукоизоляция",
        "slug": "zvukoizolyatsiya",
        "href": "/katalog/interer/zvukoizolyatsiya",
        "children": []
      },
      {
        "title": "Коврики",
        "slug": "kovriki",
        "href": "/katalog/interer/kovriki",
        "children": []
      },
      {
        "title": "Педали",
        "slug": "pedali",
        "href": "/katalog/interer/pedali",
        "children": []
      },
      {
        "title": "Ручки",
        "slug": "ruchki",
        "href": "/katalog/interer/ruchki",
        "children": []
      },
      {
        "title": "Центральная консоль",
        "slug": "tsentralnaya-konsol",
        "href": "/katalog/interer/tsentralnaya-konsol",
        "children": []
      }
    ]
  },
  {
    "title": "Бамперы",
    "slug": "bampery",
    "href": "/katalog/bampery",
    "children": []
  },
  {
    "title": "Экстерьер",
    "slug": "eksterer",
    "href": "/katalog/eksterer",
    "children": [
      {
        "title": "Аксессуары",
        "slug": "aksessuary",
        "href": "/katalog/eksterer/aksessuary",
        "children": []
      },
      {
        "title": "Багажники",
        "slug": "bagazhniki",
        "href": "/katalog/eksterer/bagazhniki",
        "children": []
      },
      {
        "title": "Брызговики",
        "slug": "bryzgoviki",
        "href": "/katalog/eksterer/bryzgoviki",
        "children": []
      },
      {
        "title": "Вставки",
        "slug": "vstavki",
        "href": "/katalog/eksterer/vstavki",
        "children": []
      },
      {
        "title": "Дефлекторы",
        "slug": "deflektory",
        "href": "/katalog/eksterer/deflektory",
        "children": []
      },
      {
        "title": "Запасное колесо",
        "slug": "zapasnoe-koleso",
        "href": "/katalog/eksterer/zapasnoe-koleso",
        "children": []
      },
      {
        "title": "Защита",
        "slug": "zashchita",
        "href": "/katalog/eksterer/zashchita",
        "children": []
      },
      {
        "title": "Зеркала",
        "slug": "zerkala",
        "href": "/katalog/eksterer/zerkala",
        "children": []
      },
      {
        "title": "Капот",
        "slug": "kapot",
        "href": "/katalog/eksterer/kapot",
        "children": []
      },
      {
        "title": "Крылья",
        "slug": "krylya",
        "href": "/katalog/eksterer/krylya",
        "children": []
      },
      {
        "title": "Лючки",
        "slug": "lyuchki",
        "href": "/katalog/eksterer/lyuchki",
        "children": []
      },
      {
        "title": "Молдинги",
        "slug": "moldingi",
        "href": "/katalog/eksterer/moldingi",
        "children": []
      },
      {
        "title": "Накладки",
        "slug": "nakladki",
        "href": "/katalog/eksterer/nakladki",
        "children": []
      },
      {
        "title": "Наклейки",
        "slug": "nakleiki",
        "href": "/katalog/eksterer/nakleiki",
        "children": []
      },
      {
        "title": "Подножки",
        "slug": "podnozhki",
        "href": "/katalog/eksterer/podnozhki",
        "children": []
      },
      {
        "title": "Решетки",
        "slug": "reshetki",
        "href": "/katalog/eksterer/reshetki",
        "children": []
      },
      {
        "title": "Стеклоочистители",
        "slug": "stekloochistiteli",
        "href": "/katalog/eksterer/stekloochistiteli",
        "children": []
      },
      {
        "title": "Фары",
        "slug": "fary",
        "href": "/katalog/eksterer/fary",
        "children": []
      }
    ]
  },
  {
    "title": "Диски, шины",
    "slug": "diski-shiny",
    "href": "/katalog/diski-shiny",
    "children": [
      {
        "title": "Гайки, болты, шайбы",
        "slug": "gaiki-bolty-shaiby",
        "href": "/katalog/diski-shiny/gaiki-bolty-shaiby",
        "children": []
      },
      {
        "title": "Диски",
        "slug": "diski",
        "href": "/katalog/diski-shiny/diski",
        "children": []
      }
    ]
  },
  {
    "title": "Подвеска",
    "slug": "podveska",
    "href": "/katalog/podveska",
    "children": [
      {
        "title": "Амортизатор",
        "slug": "amortizator",
        "href": "/katalog/podveska/amortizator",
        "children": []
      },
      {
        "title": "Крепление стойки амортизатора",
        "slug": "kreplenie-stoiki-amortizatora",
        "href": "/katalog/podveska/kreplenie-stoiki-amortizatora",
        "children": []
      },
      {
        "title": "Пневматическая подвеска",
        "slug": "pnevmaticheskaya-podveska",
        "href": "/katalog/podveska/pnevmaticheskaya-podveska",
        "children": []
      },
      {
        "title": "Поворотный кулак",
        "slug": "povorotnyi-kulak",
        "href": "/katalog/podveska/povorotnyi-kulak",
        "children": []
      },
      {
        "title": "Подвеска амортизатора",
        "slug": "podveska-amortizatora",
        "href": "/katalog/podveska/podveska-amortizatora",
        "children": []
      },
      {
        "title": "Стабилизатор",
        "slug": "stabilizator",
        "href": "/katalog/podveska/stabilizator",
        "children": []
      },
      {
        "title": "Ступица колеса",
        "slug": "stupitsa-kolesa",
        "href": "/katalog/podveska/stupitsa-kolesa",
        "children": []
      },
      {
        "title": "Ходовая часть",
        "slug": "khodovaya-chast",
        "href": "/katalog/podveska/khodovaya-chast",
        "children": []
      },
      {
        "title": "Шарнирные элементы",
        "slug": "sharnirnye-elementy",
        "href": "/katalog/podveska/sharnirnye-elementy",
        "children": []
      }
    ]
  },
  {
    "title": "Датчики давления шин",
    "slug": "datchiki-davleniya-shin",
    "href": "/katalog/datchiki-davleniya-shin",
    "children": []
  },
  {
    "title": "Обвес для автомобилей",
    "slug": "obves-dlya-avtomobilei",
    "href": "/katalog/obves-dlya-avtomobilei",
    "children": []
  },
  {
    "title": "1000 Мелочей",
    "slug": "1000-melochei",
    "href": "/katalog/1000-melochei",
    "children": []
  },
  {
    "title": "Главная передача",
    "slug": "glavnaya-peredacha",
    "href": "/katalog/glavnaya-peredacha",
    "children": [
      {
        "title": "Дифференциал",
        "slug": "differentsial",
        "href": "/katalog/glavnaya-peredacha/differentsial",
        "children": []
      },
      {
        "title": "Масла",
        "slug": "masla",
        "href": "/katalog/glavnaya-peredacha/masla",
        "children": []
      },
      {
        "title": "Раздаточная коробка",
        "slug": "razdatochnaya-korobka",
        "href": "/katalog/glavnaya-peredacha/razdatochnaya-korobka",
        "children": []
      },
      {
        "title": "Сцепление",
        "slug": "stseplenie",
        "href": "/katalog/glavnaya-peredacha/stseplenie",
        "children": []
      }
    ]
  },
  {
    "title": "Датчики",
    "slug": "datchiki",
    "href": "/katalog/datchiki",
    "children": []
  },
  {
    "title": "Двигатель",
    "slug": "dvigatel",
    "href": "/katalog/dvigatel",
    "children": [
      {
        "title": "Головка цилиндра",
        "slug": "golovka-tsilindra",
        "href": "/katalog/dvigatel/golovka-tsilindra",
        "children": []
      },
      {
        "title": "Двигатель в сборе",
        "slug": "dvigatel-v-sbore",
        "href": "/katalog/dvigatel/dvigatel-v-sbore",
        "children": []
      },
      {
        "title": "Защита двигателя",
        "slug": "zashchita-dvigatelya",
        "href": "/katalog/dvigatel/zashchita-dvigatelya",
        "children": []
      },
      {
        "title": "Картер",
        "slug": "karter",
        "href": "/katalog/dvigatel/karter",
        "children": []
      },
      {
        "title": "Кожух двигателя",
        "slug": "kozhukh-dvigatelya",
        "href": "/katalog/dvigatel/kozhukh-dvigatelya",
        "children": []
      },
      {
        "title": "Крепление двигателя",
        "slug": "kreplenie-dvigatelya",
        "href": "/katalog/dvigatel/kreplenie-dvigatelya",
        "children": []
      },
      {
        "title": "Кривошипношатунный механизм",
        "slug": "krivoshipnoshatunnyi-mekhanizm",
        "href": "/katalog/dvigatel/krivoshipnoshatunnyi-mekhanizm",
        "children": []
      },
      {
        "title": "Механизм газораспределения",
        "slug": "mekhanizm-gazoraspredeleniya",
        "href": "/katalog/dvigatel/mekhanizm-gazoraspredeleniya",
        "children": []
      },
      {
        "title": "Прокладки",
        "slug": "prokladki",
        "href": "/katalog/dvigatel/prokladki",
        "children": []
      },
      {
        "title": "Система подачи воздуха",
        "slug": "sistema-podachi-vozdukha",
        "href": "/katalog/dvigatel/sistema-podachi-vozdukha",
        "children": []
      },
      {
        "title": "Система смазки",
        "slug": "sistema-smazki",
        "href": "/katalog/dvigatel/sistema-smazki",
        "children": []
      },
      {
        "title": "Электроника двигателя",
        "slug": "elektronika-dvigatelya",
        "href": "/katalog/dvigatel/elektronika-dvigatelya",
        "children": []
      }
    ]
  },
  {
    "title": "Кондиционер",
    "slug": "konditsioner",
    "href": "/katalog/konditsioner",
    "children": [
      {
        "title": "Датчики",
        "slug": "datchiki",
        "href": "/katalog/konditsioner/datchiki",
        "children": []
      },
      {
        "title": "Испаритель",
        "slug": "isparitel",
        "href": "/katalog/konditsioner/isparitel",
        "children": []
      },
      {
        "title": "Компрессор",
        "slug": "kompressor",
        "href": "/katalog/konditsioner/kompressor",
        "children": []
      },
      {
        "title": "Осушитель",
        "slug": "osushitel",
        "href": "/katalog/konditsioner/osushitel",
        "children": []
      },
      {
        "title": "Шланги",
        "slug": "shlangi",
        "href": "/katalog/konditsioner/shlangi",
        "children": []
      }
    ]
  },
  {
    "title": "Коробка передач",
    "slug": "korobka-peredach",
    "href": "/katalog/korobka-peredach",
    "children": []
  },
  {
    "title": "Крепеж",
    "slug": "krepezh",
    "href": "/katalog/krepezh",
    "children": []
  },
  {
    "title": "Кузов",
    "slug": "kuzov",
    "href": "/katalog/kuzov",
    "children": []
  },
  {
    "title": "Ременный привод",
    "slug": "remennyi-privod",
    "href": "/katalog/remennyi-privod",
    "children": []
  },
  {
    "title": "Рулевое управления",
    "slug": "rulevoe-upravleniya",
    "href": "/katalog/rulevoe-upravleniya",
    "children": []
  },
  {
    "title": "Система выпуска",
    "slug": "sistema-vypuska",
    "href": "/katalog/sistema-vypuska",
    "children": []
  },
  {
    "title": "Система зажигания",
    "slug": "sistema-zazhiganiya",
    "href": "/katalog/sistema-zazhiganiya",
    "children": []
  },
  {
    "title": "Система охлаждения",
    "slug": "sistema-okhlazhdeniya",
    "href": "/katalog/sistema-okhlazhdeniya",
    "children": []
  },
  {
    "title": "Топливная система",
    "slug": "toplivnaya-sistema",
    "href": "/katalog/toplivnaya-sistema",
    "children": []
  },
  {
    "title": "Тормозная система",
    "slug": "tormoznaya-sistema",
    "href": "/katalog/tormoznaya-sistema",
    "children": []
  },
  {
    "title": "Фильтры",
    "slug": "filtry",
    "href": "/katalog/filtry",
    "children": [
      {
        "title": "Воздушный фильтр",
        "slug": "vozdushnyi-filtr",
        "href": "/katalog/filtry/vozdushnyi-filtr",
        "children": []
      },
      {
        "title": "Гидравлический фильтр",
        "slug": "gidravlicheskii-filtr",
        "href": "/katalog/filtry/gidravlicheskii-filtr",
        "children": []
      },
      {
        "title": "Масляный фильтр",
        "slug": "maslyanyi-filtr",
        "href": "/katalog/filtry/maslyanyi-filtr",
        "children": []
      },
      {
        "title": "Топливный фильтр",
        "slug": "toplivnyi-filtr",
        "href": "/katalog/filtry/toplivnyi-filtr",
        "children": []
      },
      {
        "title": "Фильтр салона",
        "slug": "filtr-salona",
        "href": "/katalog/filtry/filtr-salona",
        "children": []
      }
    ]
  },
  {
    "title": "Электрика",
    "slug": "elektrika",
    "href": "/katalog/elektrika",
    "children": [
      {
        "title": "Аккумулятор",
        "slug": "akkumulyator",
        "href": "/katalog/elektrika/akkumulyator",
        "children": []
      },
      {
        "title": "Выключатель",
        "slug": "vyklyuchatel",
        "href": "/katalog/elektrika/vyklyuchatel",
        "children": []
      },
      {
        "title": "Генератор",
        "slug": "generator",
        "href": "/katalog/elektrika/generator",
        "children": []
      },
      {
        "title": "Датчики",
        "slug": "datchiki",
        "href": "/katalog/elektrika/datchiki",
        "children": []
      },
      {
        "title": "Дополнительная фара",
        "slug": "dopolnitelnaya-fara",
        "href": "/katalog/elektrika/dopolnitelnaya-fara",
        "children": []
      },
      {
        "title": "Звуковой сигнал",
        "slug": "zvukovoi-signal",
        "href": "/katalog/elektrika/zvukovoi-signal",
        "children": []
      },
      {
        "title": "Основная фара",
        "slug": "osnovnaya-fara",
        "href": "/katalog/elektrika/osnovnaya-fara",
        "children": []
      },
      {
        "title": "Реле",
        "slug": "rele",
        "href": "/katalog/elektrika/rele",
        "children": []
      }
    ]
  }
]
