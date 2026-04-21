/**
 * 法考备考倒计时工具
 * 核心业务逻辑
 */

const App = {
    // 配置
    config: {
        targetDate: new Date('2026-09-12T00:00:00'), // 考试日期
        quotes: [
            "星光不问赶路人<br>时光不负有心人",
            "每天进步一点点，坚持就是胜利",
            "今天的努力，是明天的底气",
            "你的坚持，终将美好",
            "博观而约取，厚积而薄发",
            "路虽远，行则将至",
            "不积跬步，无以至千里",
            "宝剑锋从磨砺出，梅花香自苦寒来",
            "长风破浪会有时，直挂云帆济沧海",
            "千淘万漉虽辛苦，吹尽狂沙始到金"
        ],
        encouragements: [
            { icon: '🎉', text: '太棒了！今日目标全部完成！', sub: '你的坚持，终将美好！✨' },
            { icon: '🌟', text: '了不起！今天也很充实！', sub: '明天继续加油！💪' },
            { icon: '✨', text: '完成度满分！你真棒！', sub: '继续保持这个势头！🎯' }
        ]
    },

    // 状态
    state: {
        tasks: [],
        countdownTimer: null
    },

    /**
     * 初始化应用
     */
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateCountdown();
        this.displayQuote();
        this.renderTasks();
    },

    /**
     * 缓存 DOM 元素
     */
    cacheDOM() {
        this.dom = {
            countdown: document.getElementById('countdown'),
            quote: document.getElementById('quote'),
            taskList: document.getElementById('taskList'),
            taskInput: document.getElementById('taskInput'),
            addButton: document.getElementById('addButton'),
            emptyState: document.getElementById('emptyState'),
            encouragement: document.getElementById('encouragement')
        };
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        // 添加任务
        this.dom.addButton.addEventListener('click', () => this.addTask());
        this.dom.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // 任务列表事件委托
        this.dom.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = parseInt(taskItem.dataset.id);

            // 点击复选框或任务内容
            if (e.target.classList.contains('task-checkbox') ||
                e.target.classList.contains('task-content')) {
                this.toggleTask(taskId);
            }

            // 点击删除按钮
            if (e.target.classList.contains('task-delete')) {
                this.deleteTask(taskId);
            }
        });
    },

    /**
     * 更新倒计时
     */
    updateCountdown() {
        const calculate = () => {
            const now = new Date();
            const diff = this.config.targetDate - now;

            if (diff <= 0) {
                this.dom.countdown.textContent = '考试已开始';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            this.dom.countdown.textContent = `还有 ${days} 天 ${hours} 小时`;
        };

        // 立即计算一次
        calculate();

        // 每小时更新一次
        this.state.countdownTimer = setInterval(calculate, 60 * 60 * 1000);
    },

    /**
     * 显示励志语录
     */
    displayQuote() {
        const randomIndex = Math.floor(Math.random() * this.config.quotes.length);
        this.dom.quote.innerHTML = this.config.quotes[randomIndex];
    },

    /**
     * 添加任务
     */
    addTask() {
        const content = this.dom.taskInput.value.trim();

        if (!content) {
            this.dom.taskInput.focus();
            return;
        }

        const task = {
            id: Date.now(),
            content: content,
            completed: false,
            createdAt: Date.now()
        };

        this.state.tasks.push(task);
        this.dom.taskInput.value = '';
        this.dom.taskInput.focus();

        this.renderTasks();
    },

    /**
     * 切换任务完成状态
     */
    toggleTask(id) {
        const task = this.state.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    },

    /**
     * 删除任务
     */
    deleteTask(id) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== id);
        this.renderTasks();
    },

    /**
     * 渲染任务列表
     */
    renderTasks() {
        const { tasks } = this.state;
        const { taskList, emptyState, encouragement } = this.dom;

        // 清空列表
        taskList.innerHTML = '';

        // 显示/隐藏空状态
        if (tasks.length === 0) {
            emptyState.classList.remove('hidden');
            encouragement.style.display = 'none';
            return;
        } else {
            emptyState.classList.add('hidden');
        }

        // 检查是否全部完成
        const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

        // 显示/隐藏鼓励提示
        if (allCompleted) {
            encouragement.style.display = 'block';
            const randomEncouragement = this.config.encouragements[
                Math.floor(Math.random() * this.config.encouragements.length)
            ];
            encouragement.querySelector('.encouragement-icon').textContent = randomEncouragement.icon;
            encouragement.querySelector('.encouragement-text').textContent = randomEncouragement.text;
            encouragement.querySelector('.encouragement-sub').textContent = randomEncouragement.sub;
        } else {
            encouragement.style.display = 'none';
        }

        // 渲染任务列表
        const fragment = document.createDocumentFragment();

        tasks.forEach(task => {
            const taskItem = this.createTaskElement(task);
            fragment.appendChild(taskItem);
        });

        taskList.appendChild(fragment);
    },

    /**
     * 创建任务元素
     */
    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.dataset.id = task.id;

        if (task.completed) {
            div.classList.add('completed');
        }

        div.innerHTML = `
            <div class="task-checkbox"></div>
            <p class="task-content">${this.escapeHtml(task.content)}</p>
            <button class="task-delete" title="删除">🗑️</button>
        `;

        return div;
    },

    /**
     * 转义 HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
