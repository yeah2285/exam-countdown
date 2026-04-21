/**
 * UI 渲染和交互模块
 * 提供 UI 工具函数和辅助方法
 */

const UI = {
    /**
     * 格式化倒计时
     * @param {number} diff 时间差（毫秒）
     * @returns {string} 格式化后的倒计时
     */
    formatCountdown(diff) {
        if (diff <= 0) {
            return '考试已开始';
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `还有 ${days} 天 ${hours} 小时`;
    },

    /**
     * 转义 HTML 特殊字符
     * @param {string} text 文本
     * @returns {string} 转义后的文本
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * 显示元素
     * @param {HTMLElement} element 元素
     */
    show(element) {
        element.classList.remove('hidden');
    },

    /**
     * 隐藏元素
     * @param {HTMLElement} element 元素
     */
    hide(element) {
        element.classList.add('hidden');
    },

    /**
     * 切换元素显示状态
     * @param {HTMLElement} element 元素
     * @param {boolean} visible 是否显示
     */
    toggle(element, visible) {
        if (visible) {
            this.show(element);
        } else {
            this.hide(element);
        }
    },

    /**
     * 添加类名
     * @param {HTMLElement} element 元素
     * @param {string} className 类名
     */
    addClass(element, className) {
        element.classList.add(className);
    },

    /**
     * 移除类名
     * @param {HTMLElement} element 元素
     * @param {string} className 类名
     */
    removeClass(element, className) {
        element.classList.remove(className);
    },

    /**
     * 切换类名
     * @param {HTMLElement} element 元素
     * @param {string} className 类名
     */
    toggleClass(element, className) {
        element.classList.toggle(className);
    },

    /**
     * 设置元素内容
     * @param {HTMLElement} element 元素
     * @param {string} content 内容
     */
    setContent(element, content) {
        element.innerHTML = content;
    },

    /**
     * 获取随机励志语录
     * @param {Array} quotes 语录数组
     * @returns {string} 随机语录
     */
    getRandomQuote(quotes) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    },

    /**
     * 获取随机鼓励提示
     * @param {Array} encouragements 鼓励数组
     * @returns {Object} 随机鼓励对象
     */
    getRandomEncouragement(encouragements) {
        const randomIndex = Math.floor(Math.random() * encouragements.length);
        return encouragements[randomIndex];
    },

    /**
     * 创建文档片段
     * @returns {DocumentFragment} 文档片段
     */
    createFragment() {
        return document.createDocumentFragment();
    },

    /**
     * 创建元素
     * @param {string} tag 标签名
     * @param {string} className 类名
     * @param {string} content 内容
     * @returns {HTMLElement} 元素
     */
    createElement(tag, className = '', content = '') {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        if (content) {
            element.innerHTML = content;
        }
        return element;
    }
};

// 导出 UI 对象（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
