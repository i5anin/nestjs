// 📌 Функция генерации статистики по типам файлов
export function generateFileStats(stats) {
  return Object.entries(stats.fileCount)
    .map(
      ([ext, count]) =>
        `  - ${ext || '📃 Другое'}: ${count} файлов, ${stats.fileLines[ext] || 0} строк`,
    )
    .join('\n')
}

// 📌 Функция определения топ-5 файлов с наибольшим числом строк
export function getTopFiles(stats) {
  return stats.fileLineCounts
    .sort((a, b) => b.lines - a.lines)
    .slice(0, 5)
    .map(({ file, lines }) => `- 🔍 ${file} — ${lines} строк`)
    .join('\n')
}
