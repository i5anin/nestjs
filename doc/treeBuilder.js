import fs from 'fs'
import path from 'path'
import {
  IGNORED_FOLDERS,
  IGNORED_EXTENSIONS,
  FILE_ICONS,
  FOLDER_DESCRIPTIONS,
  FILE_DESCRIPTIONS,
} from './config.js'

/**
 * Возвращает эмодзи по расширению файла
 * @param {string} fileName
 * @returns {string}
 */
function getFileEmoji(fileName) {
  return FILE_ICONS[path.extname(fileName).toLowerCase()] || '📃'
}

/**
 * Подсчитывает количество строк в файле
 * @param {string} filePath
 * @returns {number}
 */
function countFileLines(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8').split('\n').length
  } catch {
    return 0
  }
}

/**
 * Возвращает описание файла или папки
 * @param {string} name
 * @param {string} filePath
 * @param {boolean} [isDir=false]
 * @returns {string}
 */
function getDescription(name, filePath, isDir = false) {
  if (isDir) {
    return FOLDER_DESCRIPTIONS[name] ? `⭐ ${FOLDER_DESCRIPTIONS[name]}` : ''
  }

  if (name === 'index.js') {
    const parentFolder = path.basename(path.dirname(filePath))
    return `Точка входа модуля "${parentFolder}"`
  }

  return FILE_DESCRIPTIONS[name] || ''
}

/**
 * Рекурсивно сканирует директорию и возвращает дерево файлов
 * @param {string} dir
 * @param {string} baseDir
 * @param {number} depth
 * @param {object} stats
 * @param {string} prefix
 * @returns {string}
 */
export function scanDirectory(dir, baseDir, depth = 1, stats, prefix = '') {
  if (!fs.existsSync(dir)) return ''

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => {
      if (IGNORED_FOLDERS.has(entry.name)) return false
      if (!entry.isDirectory() && IGNORED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

  if (entries.length === 0) return ''

  const result = []

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1
    const connector = isLast ? '└── ' : '├── '
    const newPrefix = prefix + (isLast ? '    ' : '│   ')
    const filePath = path.join(dir, entry.name)
    const fileName = entry.name
    const isDir = entry.isDirectory()

    if (isDir) {
      const description = getDescription(fileName, filePath, true)
      const entryLine = `${prefix}${connector}📂 ${fileName}${description ? ` — ${description}` : ''}`
      const subTree = scanDirectory(filePath, baseDir, depth + 1, stats, newPrefix)

      result.push(entryLine)
      if (subTree) result.push(subTree)
    } else {
      const ext = path.extname(fileName).toLowerCase()
      stats.fileCount[ext] = (stats.fileCount[ext] || 0) + 1
      const lines = countFileLines(filePath)
      stats.fileLines[ext] = (stats.fileLines[ext] || 0) + lines
      stats.totalLines += lines
      stats.fileLineCounts.push({ file: fileName, lines })

      const description = getDescription(fileName, filePath)
      result.push(`${prefix}${connector}${getFileEmoji(fileName)} ${fileName} ${description ? ` — ${description}` : ''}`)
    }

    const nextEntry = entries[index + 1]
    if (!isLast) {
      const isCurrentDir = isDir
      const isNextDir = nextEntry?.isDirectory?.()

      // Добавляем разделитель, если текущий или следующий элемент — директория
      if (isCurrentDir || isNextDir) {
        result.push(`${prefix}│`)
      }
    }
  })

  return result.join('\n')
}






