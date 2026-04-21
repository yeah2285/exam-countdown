/**
 * 日期工具模块
 * 提供日期相关的辅助函数
 */

/**
 * 获取当前日期（使用中国时区）
 * @returns {Date} 当前日期
 */
export function getCurrentDate() {
  return new Date();
}

/**
 * 获取从某个起始日到现在的天数
 * @param {Date} startDate - 起始日期
 * @returns {number} 经过的天数
 */
export function getDaysSince(startDate) {
  const now = new Date();
  const timeDiff = now - startDate;
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * 获取一年中的第几天
 * @param {Date} date - 日期
 * @returns {number} 一年中的第几天（1-366）
 */
export function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * 获取从2026年1月1日到指定日期的天数
 * 用于诗词索引映射
 * @param {Date} date - 日期
 * @returns {number} 天数索引
 */
export function getDaysIndex(date = new Date()) {
  const examYear = 2026;
  const startDate = new Date(examYear, 0, 1); // 2026年1月1日

  // 如果当前日期在2026年之前，使用当前日期
  let targetDate = date;
  if (date.getFullYear() < examYear) {
    targetDate = date;
  }

  const timeDiff = targetDate - startDate;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // 确保返回非负数
  return Math.max(0, days);
}

/**
 * 格式化日期为中文格式
 * @param {Date} date - 日期
 * @returns {string} 格式化的日期字符串
 */
export function formatDateChinese(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日 星期${weekday}`;
}
