export const IGNORED_FOLDERS = new Set([
  'node_modules',
  'dist',
  '.idea',
  '.git',
  'coverage',
  'out',
  'build',
])

export const FILE_ICONS = {
  '.vue':          '📗',
  '.js':           '📜',
  '.ts':           '📜',
  '.css':          '🎨',
  '.scss':         '🎨',
  '.sass':         '🎨',
  '.less':         '🎨',
  '.html':         '📄',
  '.md':           '📄',
  '.json':         '⚙️',
  '.yaml':         '⚙️',
  '.yml':          '⚙️',
  '.env':          '🔧',
  '.config.js':    '🔧',
  '.gitignore':    '🗂️',
  '.editorconfig': '🗂️',
  '.php':          '🐘',
  '.sql':          '🗄️',
  '.sh':           '🖥️',
  '.bat':          '🖥️',
}

// 📌 Игнорируемые файлы по расширению
export const IGNORED_EXTENSIONS = new Set([
  '.mp4', '.jpg', '.png', '.gif', '.ttf', '.css', '.svg', // Добавь сюда нужные расширения
])

// 📌 Описания папок
export const FOLDER_DESCRIPTIONS = {
  src:        'Исходный код проекта',
  api:        'Модули взаимодействия с сервером',
  components: 'Переиспользуемые Vue-компоненты',
  assets:     'Статические файлы (изображения, иконки, шрифты)',
  modules:    'Функциональные модули системы',
  views:      'Основные страницы приложения',
  store:      'Глобальное хранилище данных (Pinia, Vuex)',
  router:     'Маршрутизация Vue.js',
}

// 📌 Описания файлов
export const FILE_DESCRIPTIONS = {
  'main.js':        'Главный файл инициализации Vue-приложения',
  'index.js':       'Точка входа модуля',
  'axiosConfig.js': 'Настройки Axios для API-запросов',
  'store.js':       'Хранилище данных (Pinia, Vuex)',
  'router.js':      'Конфигурация маршрутизации Vue',
}
