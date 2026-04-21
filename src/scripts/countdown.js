/**
 * 倒计时模块
 * 计算并显示距离2026年法考的剩余天数
 */

// 法考日期：2026年9月19日（使用中国时区 UTC+8）
const EXAM_DATE = new Date('2026-09-19T00:00:00+08:00');

/**
 * 计算距离考试的剩余天数
 * @param {Date} examDate - 考试日期
 * @returns {number} 剩余天数（如果考试已过返回0）
 */
export function calculateDaysRemaining(examDate = EXAM_DATE) {
  const now = new Date();

  // 计算时间差（毫秒）
  const timeDiff = examDate - now;

  // 如果考试已过，返回0
  if (timeDiff <= 0) {
    return 0;
  }

  // 将毫秒转换为天数（向上取整）
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysRemaining;
}

/**
 * 更新倒计时显示
 * 获取DOM元素并更新剩余天数
 */
export function updateCountdown() {
  const daysElement = document.getElementById('days-remaining');

  if (!daysElement) {
    console.error('找不到 days-remaining 元素');
    return;
  }

  try {
    const days = calculateDaysRemaining();

    // 更新显示
    daysElement.textContent = days;

    // 如果考试已过，显示提示
    if (days === 0) {
      daysElement.textContent = '考试日';
      const dateElement = document.querySelector('.countdown__date');
      if (dateElement) {
        dateElement.textContent = '今天是法考日';
      }
    }

    console.log(`倒计时已更新：${days} 天`);
  } catch (error) {
    console.error('更新倒计时失败:', error);
    daysElement.textContent = '---';
  }
}

/**
 * 初始化倒计时
 * 页面加载时调用
 */
export function initCountdown() {
  updateCountdown();

  // 每分钟更新一次（处理跨天情况）
  setInterval(updateCountdown, 60000);
}
