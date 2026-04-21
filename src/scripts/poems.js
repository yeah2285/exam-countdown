/**
 * 诗词模块
 * 负责加载和显示每日诗词
 */

import { getDaysIndex } from './date.js';
import poemsData from '../data/poems.json';

// 诗词数据缓存
let poemsCache = null;

/**
 * 加载诗词数据
 * @returns {Promise<Array>} 诗词数组
 */
async function loadPoemsData() {
  if (poemsCache) {
    return poemsCache;
  }

  try {
    // 直接使用导入的JSON数据
    poemsCache = poemsData.poems;
    return poemsCache;
  } catch (error) {
    console.error('加载诗词数据失败:', error);
    return null;
  }
}

/**
 * 根据日期获取对应的诗词
 * @param {Date} date - 日期
 * @returns {Promise<Object|null>} 诗词对象
 */
export async function getPoemForDate(date = new Date()) {
  const poems = await loadPoemsData();

  if (!poems || poems.length === 0) {
    console.error('诗词数据为空');
    return null;
  }

  // 使用日期索引映射到诗词（循环使用）
  const dayIndex = getDaysIndex(date);
  const poemIndex = dayIndex % poems.length;

  return poems[poemIndex];
}

/**
 * 渲染诗词到DOM
 * @param {Object} poem - 诗词对象
 */
export function renderPoem(poem) {
  if (!poem) {
    console.error('诗词数据为空，无法渲染');
    renderError();
    return;
  }

  // 获取DOM元素
  const titleElement = document.getElementById('poem-title');
  const authorElement = document.getElementById('poem-author');
  const contentElement = document.getElementById('poem-content');
  const appreciationContainer = document.getElementById('poem-appreciation-container');
  const appreciationText = document.getElementById('poem-appreciation');
  const toggleButton = document.getElementById('toggle-appreciation');

  // 更新诗词内容
  if (titleElement) titleElement.textContent = poem.title;
  if (authorElement) authorElement.textContent = `${poem.dynasty} · ${poem.author}`;
  if (contentElement) contentElement.textContent = poem.content;

  // 更新赏析（如果有）
  if (poem.appreciation && appreciationText) {
    appreciationText.textContent = poem.appreciation;
    if (toggleButton) {
      toggleButton.hidden = false;
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.querySelector('span').textContent = '查看赏析';
    }
    if (appreciationContainer) {
      appreciationContainer.hidden = true;
    }
  } else {
    // 没有赏析，隐藏按钮
    if (toggleButton) {
      toggleButton.hidden = true;
    }
    if (appreciationContainer) {
      appreciationContainer.hidden = true;
    }
  }

  console.log(`已显示诗词：${poem.title} - ${poem.author}`);
}

/**
 * 渲染错误状态
 */
function renderError() {
  const titleElement = document.getElementById('poem-title');
  const authorElement = document.getElementById('poem-author');
  const contentElement = document.getElementById('poem-content');

  if (titleElement) titleElement.textContent = '诗词加载失败';
  if (authorElement) authorElement.textContent = '';
  if (contentElement) contentElement.textContent = '请刷新页面重试';
}

/**
 * 切换赏析显示/隐藏
 */
export function toggleAppreciation() {
  const container = document.getElementById('poem-appreciation-container');
  const button = document.getElementById('toggle-appreciation');
  const buttonText = button?.querySelector('span');

  if (!container || !button) return;

  const isHidden = container.hidden;

  if (isHidden) {
    container.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    if (buttonText) buttonText.textContent = '收起赏析';
  } else {
    container.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    if (buttonText) buttonText.textContent = '查看赏析';
  }
}

/**
 * 初始化诗词模块
 * 加载并显示今日诗词
 */
export async function initPoems() {
  try {
    const poem = await getPoemForDate();
    if (poem) {
      renderPoem(poem);
    } else {
      renderError();
    }
  } catch (error) {
    console.error('初始化诗词模块失败:', error);
    renderError();
  }

  // 绑定切换按钮事件
  const toggleButton = document.getElementById('toggle-appreciation');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleAppreciation);
  }
}
