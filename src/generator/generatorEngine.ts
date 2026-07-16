import { genres } from '../data/genres';
import type { Genre } from '../data/genres';
import { settings } from '../data/settings';
import type { Setting } from '../data/settings';
import { mechanics } from '../data/mechanics';
import { generationModes } from '../data/modes';
import { heroArchetypes, loreBackstories, playerObjectives, keyFeatureTemplates, gameplayLoopTemplates, nameTemplates } from '../data/templates';

export interface GeneratorInput {
  genreId: string;
  settingId: string;
  mechanicsCount: number;
  modeId: string;
}

export interface GeneratedGame {
  id: string;
  genre: string;
  setting: string;
  mechanics: string[];
  title: string;
  worldDescription: string;
  lore: string;
  hero: {
    title: string;
    description: string;
    augment: string;
  };
  objective: string;
  camera: string;
  platform: string;
  monetization: string;
  complexity: string;
  gameplayLoop: string;
  keyFeatures: string[];
  finalPrompt: string;
  timestamp: number;
  modeIcon: string;
  modeName: string;
}

// Helper to get random item from array
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper to get multiple random unique items
const getRandomItems = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

// Title Generator
export const generateGameTitle = (): string => {
  const { prefixes, nouns, suffixes } = nameTemplates;
  const useSuffix = Math.random() > 0.4;
  const prefix = getRandomItem(prefixes);
  const noun = getRandomItem(nouns);
  const suffix = useSuffix ? ` ${getRandomItem(suffixes)}` : '';
  
  let title = `${prefix}${noun}${suffix}`;
  
  // Make it sound even cooler occasionally
  if (Math.random() > 0.8) {
    title = `${title.replace(' ', ' - ')}: Overdrive`;
  }
  
  return title;
};

// Main generator engine
export const generateGame = (input: GeneratorInput): GeneratedGame => {
  const timestamp = Date.now();
  const id = `game_${timestamp}_${Math.floor(Math.random() * 1000)}`;

  // 1. Resolve Genre
  let selectedGenre: Genre;
  if (input.genreId === 'random') {
    selectedGenre = getRandomItem(genres);
  } else {
    selectedGenre = genres.find(g => g.id === input.genreId) || genres[0];
  }

  // 2. Resolve Setting
  let selectedSetting: Setting;
  if (input.settingId === 'random') {
    selectedSetting = getRandomItem(settings);
  } else {
    selectedSetting = settings.find(s => s.id === input.settingId) || settings[0];
  }

  // 3. Resolve Mode
  const selectedMode = generationModes.find(m => m.id === input.modeId) || generationModes[0];

  // 4. Resolve Mechanics
  const resolvedCount = Math.max(1, Math.min(10, input.mechanicsCount));
  const selectedMechanics = getRandomItems(mechanics, resolvedCount);
  const mechanicsNames = selectedMechanics.map(m => m.name);

  // 5. Generate Title
  const title = generateGameTitle();

  // 6. Generate Lore and World Description
  const backstory = loreBackstories.find(b => b.settingId === selectedSetting.id) || loreBackstories[0];
  const worldDescription = `Мир игры ${title} выполнен в стиле ${selectedSetting.name}. ${selectedSetting.description} Здесь царит уникальная атмосфера: ${selectedSetting.atmosphere} Важнейшие визуальные маркеры окружения включают: ${selectedSetting.visualTokens.join(', ')}.`;
  
  const lore = `В этом мире произошло историческое событие, известное как ${backstory.cataclysmName}. В настоящее время власть удерживает ${backstory.rulingPower}, которая жестко ${backstory.struggleDetail} Игроку предстоит столкнуться с этой силой лицом к лицу.`;

  // 7. Generate Hero
  const heroArchetype = getRandomItem(heroArchetypes);
  const hero = {
    title: heroArchetype.title,
    description: heroArchetype.description,
    augment: heroArchetype.startingAugment
  };

  // 8. Player Objective
  const objective = `Главная цель протагониста (${hero.title}) — ${getRandomItem(playerObjectives)}`;

  // 9. Camera Type (affected by genre and mode overrides)
  let camera = getRandomItem(selectedGenre.typicalCameras);
  if (selectedMode.cameras.length > 0 && Math.random() > 0.3) {
    camera = getRandomItem(selectedMode.cameras);
  }

  // 10. Platform (affected by genre and mode)
  let platform = getRandomItem(selectedGenre.typicalPlatforms);
  if (selectedMode.platforms.length > 0) {
    // Intersect or fallback
    const matches = selectedGenre.typicalPlatforms.filter(p => selectedMode.platforms.includes(p));
    platform = matches.length > 0 ? getRandomItem(matches) : getRandomItem(selectedMode.platforms);
  }

  // 11. Monetization (affected by genre and mode)
  let monetization = getRandomItem(selectedGenre.typicalMonetizations);
  if (selectedMode.monetizations.length > 0) {
    const matches = selectedGenre.typicalMonetizations.filter(m => selectedMode.monetizations.includes(m));
    monetization = matches.length > 0 ? getRandomItem(matches) : getRandomItem(selectedMode.monetizations);
  }

  // Translate monetization for prompt readability
  const monetizationTranslations: Record<string, string> = {
    'premium': 'Premium (разовая покупка)',
    'free': 'Полностью бесплатная (Open Source / Free)',
    'f2p': 'Free-to-Play с внутриигровыми покупками',
    'ads': 'Рекламная монетизация (Ads-supported)',
    'battle pass': 'Battle Pass и сезонный контент'
  };
  const monetizationText = monetizationTranslations[monetization] || monetization;

  // 12. Complexity (affected by mode)
  const complexity = selectedMode.complexity;

  // 13. Gameplay Loop (dynamic mix of mechanics)
  let gameplayLoop = getRandomItem(gameplayLoopTemplates);
  // Inject some specific mechanic names to make it personalized
  if (selectedMechanics.length > 0) {
    const mecList = selectedMechanics.slice(0, 2).map(m => m.name).join(' и ');
    gameplayLoop = `${gameplayLoop} С особым упором на использование связки механик: ${mecList}.`;
  }

  // 14. Key Features
  const baseFeatures = getRandomItems(keyFeatureTemplates, 2);
  const mechanicsFeatures = selectedMechanics.slice(0, 2).map(m => `Глубокая интеграция механики «${m.name}» в базовое управление персонажем: ${m.promptDescription}`);
  const keyFeatures = [...baseFeatures, ...mechanicsFeatures].slice(0, 4);

  // 15. Create Final Prompt
  const mechanicsPromptSection = selectedMechanics
    .map((m, idx) => `${idx + 1}. **${m.name.toUpperCase()}** — ${m.promptDescription}`)
    .join('\n');

  const featuresPromptSection = keyFeatures.map(f => `- ${f}`).join('\n');

  let promptPrefix = `Создай полноценную игру в жанре ${selectedGenre.name} в стиле ${selectedSetting.name}.

Игра должна быть полностью играбельной.`;

  let promptAIAdditions = '';

  // Mode overrides for prompt
  if (input.modeId === 'aicollector') {
    promptPrefix = `Ты — ведущий ИИ-архитектор кода. Создай ПОЛНОСТЬЮ готовую, расширяемую, чистую игру в жанре ${selectedGenre.name} в стиле ${selectedSetting.name}.
Предоставь модульную структуру файлов, готовые классы на TypeScript/JavaScript и простую HTML5 Canvas / WebGL визуализацию. Никаких заглушек, пиши чистый рабочий код.`;
    
    promptAIAdditions = `
Инструкции для ИИ-кодогенератора:
1. Используй модульную архитектуру (раздели логику рендеринга, ввода, физики и стейта).
2. Напиши полную TypeScript реализацию для ключевых механик, указанных ниже.
3. Добавь авто-генерацию простых геометрических спрайтов с неоновым свечением.
4. Предоставь HTML-файл точки входа с подключенными скриптами.`;
  } else if (input.modeId === 'impossible') {
    promptPrefix = `Создай ЭКСТРЕМАЛЬНО сложную, безумную игру в жанре ${selectedGenre.name} в стиле ${selectedSetting.name}.
Игровой процесс должен бросать вызов своими хаотичными и несовместимыми механиками, заставляя игрока адаптироваться каждую секунду!`;
  } else if (input.modeId === 'retro') {
    promptPrefix = `Создай ретро-игру в жанре ${selectedGenre.name} в стиле ${selectedSetting.name} (8/16-bit эстетика).
Ограничь палитру цветов, используй пиксельную сетку и стилизованный рендеринг под CRT-телевизор.`;
  } else if (input.modeId === 'mobile') {
    promptPrefix = `Создай мобильную игру в жанре ${selectedGenre.name} в стиле ${selectedSetting.name}.
Интерфейс должен быть адаптирован под вертикальный экран смартфона (Portrait mode), управление полностью адаптировано под тач-жесты и свайпы.`;
  }

  const finalPrompt = `${promptPrefix}

Игра должна быть полностью играбельной.

Обязательно реализовать механики:
${mechanicsPromptSection}

Добавить:
- адаптивный футуристический интерфейс (HUD) с неоновым свечением
- систему победы (условие: ${objective.replace('Главная цель протагониста (', '').replace(') — ', ' для ')})
- условия поражения (смерть, потеря всех ресурсов или захват базы врагом)
- систему прогрессии (прокачка навыков персонажа, открытие новых уровней)
- визуальные и звуковые эффекты (неоновые глитчи, частицы, взрывы, вспышки)
- глубокую атмосферу (звуковой эмбиент, динамическое освещение)
- локальные сохранения прогресса (localStorage)
- интерактивное главное меню, экран паузы и панель настроек звука/графики

Описание мира:
${worldDescription}
Лор: ${lore}

Главный герой:
- Имя/Роль: ${hero.title}
- Легенда: ${hero.description}
- Стартовый имплант/модификатор: ${hero.augment}

Технические спецификации проекта:
- Тип камеры: ${camera}
- Целевая платформа: ${platform}
- Монетизация: ${monetizationText}
- Сложность разработки/бюджет: ${complexity.toUpperCase()}
${promptAIAdditions}

Игровой цикл:
${gameplayLoop}

Ключевые особенности игры:
${featuresPromptSection}

Начни генерацию кода с создания архитектурной схемы проекта, структуры файлов и затем переходи к полной реализации ядра игры без сокращений.`;

  return {
    id,
    genre: selectedGenre.name,
    setting: selectedSetting.name,
    mechanics: mechanicsNames,
    title,
    worldDescription,
    lore,
    hero,
    objective,
    camera,
    platform,
    monetization: monetizationText,
    complexity,
    gameplayLoop,
    keyFeatures,
    finalPrompt,
    timestamp,
    modeIcon: selectedMode.icon,
    modeName: selectedMode.name
  };
};
