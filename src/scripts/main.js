/**
 * 主入口文件
 * 初始化倒计时和诗词模块
 */

// 导入CSS样式（让Vite自动处理）
import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/main.css';

import { initCountdown } from './countdown.js';
import { initPoems } from './poems.js';

/**
 * 应用初始化
 */
function initApp() {
  console.log('法考倒计时应用初始化中...');

  // 初始化倒计时
  initCountdown();

  // 初始化诗词模块
  initPoems().then(() => {
    console.log('应用初始化完成');
  }).catch((error) => {
    console.error('应用初始化失败:', error);
  });

  // 监听在线/离线状态（PWA功能）
  window.addEventListener('online', () => {
    console.log('网络已连接');
  });

  window.addEventListener('offline', () => {
    console.log('网络已断开，使用离线模式');
  });
}

/**
 * DOM加载完成后初始化应用
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM已经加载完成
  initApp();
}

// 导出供测试使用
export { initApp };
