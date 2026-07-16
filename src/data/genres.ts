export interface Genre {
  id: string;
  name: string;
  description: string;
  typicalCameras: string[];
  typicalPlatforms: string[];
  typicalMonetizations: string[];
  gameplayKeywords: string[];
}

export const genres: Genre[] = [
  {
    id: 'racing',
    name: 'Гонки',
    description: 'Высокоскоростные состязания на транспортных средствах, где реакция, тюнинг и знание трасс определяют победителя.',
    typicalCameras: ['TPS', 'FPS', 'сверху'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS'],
    typicalMonetizations: ['premium', 'f2p', 'battle pass'],
    gameplayKeywords: ['трассы', 'дрифт', 'скорость', 'нитро', 'тюнинг', 'болиды', 'заезды на время', 'препятствия']
  },
  {
    id: 'rpg',
    name: 'RPG',
    description: 'Глубокое погружение в роль персонажа с прокачкой характеристик, выбором решений, квестами и детальным развитием сюжета.',
    typicalCameras: ['изометрия', 'TPS', 'FPS'],
    typicalPlatforms: ['PC', 'Console', 'Web'],
    typicalMonetizations: ['premium', 'battle pass'],
    gameplayKeywords: ['квесты', 'прокачка', 'диалоги', 'инвентарь', 'опыт', 'навыки', 'снаряжение', 'выбор и последствия']
  },
  {
    id: 'action',
    name: 'Экшен',
    description: 'Динамичный игровой процесс, сосредоточенный на сражениях, быстроте реакции игрока и зрелищных боевых сценах.',
    typicalCameras: ['TPS', 'сбоку', 'изометрия'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS'],
    typicalMonetizations: ['premium', 'ads'],
    gameplayKeywords: ['битвы', 'тайминги', 'уклонение', 'боссы', 'драйв', 'разрушение', 'оружие ближнего боя']
  },
  {
    id: 'shooter',
    name: 'Шутер',
    description: 'Огнестрельные или энергетические дуэли, требующие тактического позиционирования, меткости и быстрой реакции.',
    typicalCameras: ['FPS', 'TPS', 'сверху'],
    typicalPlatforms: ['PC', 'Console', 'Android'],
    typicalMonetizations: ['premium', 'f2p', 'battle pass'],
    gameplayKeywords: ['стрельба', 'укрытия', 'перезарядка', 'арсенал', 'прицеливание', 'тактика', 'командный бой', 'боеприпасы']
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Выживание в крайне враждебной среде, где управление ресурсами, голод, угрозы и крафт определяют продолжительность жизни.',
    typicalCameras: ['FPS', 'TPS', 'изометрия'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS'],
    typicalMonetizations: ['premium', 'f2p'],
    gameplayKeywords: ['ресурсы', 'голод', 'жажда', 'крафт', 'укрытие', 'ночные угрозы', 'температура', 'болезни']
  },
  {
    id: 'strategy',
    name: 'Стратегия',
    description: 'Планирование планетарного или тактического масштаба, управление базами, экономикой и армиями для доминирования над врагом.',
    typicalCameras: ['сверху', 'изометрия'],
    typicalPlatforms: ['PC', 'Web', 'Android'],
    typicalMonetizations: ['premium', 'f2p'],
    gameplayKeywords: ['строительство', 'добыча ресурсов', 'армия', 'тактическая карта', 'технологии', 'контроль территорий']
  },
  {
    id: 'horror',
    name: 'Хоррор',
    description: 'Игра, погружающая в атмосферу страха, неизвестности и беспомощности перед лицом жутких потусторонних или техногенных угроз.',
    typicalCameras: ['FPS', 'TPS', 'сбоку'],
    typicalPlatforms: ['PC', 'Console'],
    typicalMonetizations: ['premium'],
    gameplayKeywords: ['темнота', 'фонарик', 'прятки', 'звуки', 'скримеры', 'ограниченные ресурсы', 'саспенс', 'безумие']
  },
  {
    id: 'sandbox',
    name: 'Sandbox (Песочница)',
    description: 'Абсолютная творческая свобода, где игрок сам ставит себе цели, изменяет ландшафт, строит и экспериментирует с физикой.',
    typicalCameras: ['FPS', 'TPS', 'изометрия', 'сверху'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS'],
    typicalMonetizations: ['premium', 'free'],
    gameplayKeywords: ['креативность', 'терраформинг', 'физика', 'моддинг', 'строительство', 'генерация мира', 'инструменты']
  },
  {
    id: 'roguelike',
    name: 'Roguelike (Рогалик)',
    description: 'Процедурная генерация уровней, необратимая смерть и создание уникального «билда» персонажа из случайных находок в каждом забеге.',
    typicalCameras: ['изометрия', 'сверху', 'сбоку'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS', 'Web'],
    typicalMonetizations: ['premium', 'f2p'],
    gameplayKeywords: ['пермосмерть', 'процедурная генерация', 'артефакты', 'синергия', 'забеги', 'случайные события', 'мета-прогрессия']
  },
  {
    id: 'metroidvania',
    name: 'Метроидвания',
    description: 'Исследование единого огромного мира, разделенного барьерами, доступ за которые открывается по мере обретения новых способностей.',
    typicalCameras: ['сбоку'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS'],
    typicalMonetizations: ['premium'],
    gameplayKeywords: ['бэктрекинг', 'исследование', 'ключи-способности', 'секреты', 'платформинг', 'карта лабиринта', 'боссы']
  },
  {
    id: 'cardgame',
    name: 'Карточная игра',
    description: 'Тактические дуэли с использованием колод карт, представляющих заклинания, существ или эффекты, требующие стратегического мышления.',
    typicalCameras: ['сверху', 'изометрия'],
    typicalPlatforms: ['PC', 'Android', 'iOS', 'Web'],
    typicalMonetizations: ['f2p', 'ads', 'premium'],
    gameplayKeywords: ['колода', 'синергия карт', 'мана', 'ход игрока', 'коллекционирование', 'редкость', 'пассивные эффекты']
  },
  {
    id: 'towerdefense',
    name: 'Tower Defense',
    description: 'Оборона базы от волн наступающих врагов путем расстановки защитных турелей, ловушек и управления тактическим ландшафтом.',
    typicalCameras: ['сверху', 'изометрия'],
    typicalPlatforms: ['PC', 'Android', 'iOS', 'Web'],
    typicalMonetizations: ['f2p', 'ads', 'premium'],
    gameplayKeywords: ['волны врагов', 'башни', 'апгрейды', 'лабиринт из турелей', 'энергия', 'боссы волн', 'зоны поражения']
  },
  {
    id: 'idle',
    name: 'Idle (Кликер)',
    description: 'Расслабляющий игровой процесс с упором на автоматизацию, постепенный экспоненциальный рост цифр и прогресс в отсутствие игрока.',
    typicalCameras: ['спереди', 'сверху', 'сбоку'],
    typicalPlatforms: ['Android', 'iOS', 'Web'],
    typicalMonetizations: ['f2p', 'ads', 'battle pass'],
    gameplayKeywords: ['автокликер', 'престиж/сброс', 'экспоненциальный рост', 'автоматизация', 'менеджеры', 'офлайн-доход']
  },
  {
    id: 'moba',
    name: 'MOBA',
    description: 'Командное противостояние на арене с целью уничтожения главного здания врага, требующее микроконтроля персонажа и синергии команды.',
    typicalCameras: ['сверху', 'изометрия'],
    typicalPlatforms: ['PC', 'Android', 'iOS'],
    typicalMonetizations: ['f2p', 'battle pass'],
    gameplayKeywords: ['линии', 'крипы', 'башни', 'лесные монстры', 'микроконтроль', 'ультимейт', 'командная синергия', 'закупка']
  },
  {
    id: 'platformer',
    name: 'Платформер',
    description: 'Испытания ловкости, связанные с прыжками по платформам, уклонением от ловушек и акробатическим преодолением уровней.',
    typicalCameras: ['сбоку', 'TPS'],
    typicalPlatforms: ['PC', 'Console', 'Android', 'iOS', 'Web'],
    typicalMonetizations: ['premium', 'ads', 'free'],
    gameplayKeywords: ['прыжки', 'шипы', 'тайминг', 'гравитация', 'акробатика', 'динамические платформы', 'сбор предметов']
  }
];
