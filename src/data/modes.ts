export interface GenerationMode {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  complexity: 'маленькая' | 'средняя' | 'AAA';
  platforms: string[];
  cameras: string[];
  monetizations: string[];
}

export const generationModes: GenerationMode[] = [
  {
    id: 'random',
    name: 'Random Game',
    icon: '🎲',
    tagline: 'СЛУЧАЙНЫЙ СИНТЕЗ КИБЕРНЕТИКИ',
    description: 'Сбалансированное объединение случайных элементов в единую игровую концепцию без ограничений по бюджету или масштабу.',
    complexity: 'средняя',
    platforms: ['PC', 'Console'],
    cameras: ['TPS', 'FPS', 'изометрия'],
    monetizations: ['premium', 'f2p']
  },
  {
    id: 'indie',
    name: 'Indie Idea',
    icon: '🧠',
    tagline: 'ГЛУБОКИЙ КОНЦЕПТ И НЕОБЫЧНЫЕ МЕХАНИКИ',
    description: 'Инновационные механики, сильный фокус на атмосфере, уникальном визуальном стиле, глубоком лоре и нестандартных решениях.',
    complexity: 'маленькая',
    platforms: ['PC', 'Web', 'Console'],
    cameras: ['сбоку', 'изометрия', 'сверху'],
    monetizations: ['premium', 'free']
  },
  {
    id: 'aaa',
    name: 'AAA Generator',
    icon: '⚡',
    tagline: 'МАСШТАБНЫЙ МУЛЬТИПЛЕЕР И ФОТОРЕАЛИЗМ',
    description: 'Масштабный проект с огромным бюджетом, фотореалистичной графикой, элементами живого сервиса (live-service), глубоким геймплеем и сложной мета-прогрессией.',
    complexity: 'AAA',
    platforms: ['PC', 'Console'],
    cameras: ['FPS', 'TPS'],
    monetizations: ['premium', 'battle pass', 'f2p']
  },
  {
    id: 'solodev',
    name: 'Solo Dev Mode',
    icon: '👤',
    tagline: 'СУЖЕННЫЙ CORE-LOOP И СОЧНАЯ ФИЗИКА',
    description: 'Концепт, идеально оптимизированный для одного разработчика. Упор на ультра-полированный основной цикл (core loop), простой крафт или физику и минимальное количество ассетов.',
    complexity: 'маленькая',
    platforms: ['PC', 'Web', 'Android', 'iOS'],
    cameras: ['сбоку', 'сверху', 'изометрия'],
    monetizations: ['premium', 'ads', 'free']
  },
  {
    id: 'team',
    name: 'Team Mode',
    icon: '👥',
    tagline: 'СИНЕРГИЯ И КООПЕРАТИВНЫЕ МЕХАНИКИ',
    description: 'Проект среднего масштаба, ориентированный на совместное прохождение или соревновательный мультиплеер. Сбалансированный объем контента.',
    complexity: 'средняя',
    platforms: ['PC', 'Console', 'Android'],
    cameras: ['TPS', 'изометрия', 'сверху'],
    monetizations: ['premium', 'f2p', 'battle pass']
  },
  {
    id: 'impossible',
    name: 'Impossible Mode',
    icon: '💀',
    tagline: 'ХАОТИЧНЫЕ МЕХАНИКИ И БЕЗУМНЫЙ ВЫЗОВ',
    description: 'Синтез абсолютно несовместимых механик, безумная кривая сложности и хаотичный мир. Вызов как для игрока, так и для разработчика, пытающегося это собрать!',
    complexity: 'AAA',
    platforms: ['PC'],
    cameras: ['FPS', 'сбоку'],
    monetizations: ['premium']
  },
  {
    id: 'mobile',
    name: 'Mobile Game Mode',
    icon: '📱',
    tagline: 'ВЕРТИКАЛЬНЫЙ ЭКРАН И ТАЧ-УПРАВЛЕНИЕ',
    description: 'Адаптировано под смартфоны. Короткие игровые сессии, портретный/ландшафтный интерфейс, казуальная донатная петля и интуитивное тач-управление.',
    complexity: 'маленькая',
    platforms: ['Android', 'iOS'],
    cameras: ['сверху', 'сбоку', 'изометрия'],
    monetizations: ['f2p', 'ads', 'battle pass']
  },
  {
    id: 'retro',
    name: 'Retro Generator',
    icon: '🕹',
    tagline: '8/16-БИТНЫЙ СТИЛЬ И ОГРАНИЧЕНИЯ ПАМЯТИ',
    description: 'Аутентичный дух старой школы: пиксель-арт, чиптюн музыка, строгие ограничения по памяти и палитре, но безупречный игровой дизайн.',
    complexity: 'маленькая',
    platforms: ['PC', 'Web', 'Console'],
    cameras: ['сбоку', 'сверху'],
    monetizations: ['premium', 'free']
  },
  {
    id: 'experimental',
    name: 'Experimental Mode',
    icon: '🌌',
    tagline: 'ГЛИТЧ-АРТ И СЮРРЕАЛИСТИЧНЫЙ ИГРОВОЙ ЦИКЛ',
    description: 'Сюрреалистичные правила, слом четвертой стены, динамическая смена гравитации, глитч-эффекты и процедурное безумие.',
    complexity: 'средняя',
    platforms: ['PC', 'Web'],
    cameras: ['FPS', 'сбоку', 'изометрия'],
    monetizations: ['free', 'premium']
  },
  {
    id: 'aicollector',
    name: 'AI Game Builder Mode',
    icon: '🤖',
    tagline: 'МОДУЛИ КОДА И ИНСТРУКЦИИ ДЛЯ ИИ',
    description: 'Специальный формат генерации, оптимизированный под ИИ-кодогенераторы (Cursor, Bolt.new, v0). Содержит архитектуру классов, модули кода и строгие спецификации.',
    complexity: 'средняя',
    platforms: ['PC', 'Web'],
    cameras: ['изометрия', 'сбоку', 'сверху'],
    monetizations: ['premium', 'f2p']
  }
];
