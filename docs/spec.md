# 技术规格：法考倒计时 PWA

## 目标（Objective）

构建一个极简的 Progressive Web App (PWA)，为2026年法考考生（特别是边工作边备考的在职考生）提供每日倒计时和古典诗词情感支持。

### 用户故事
- 作为一名在职法考生，我希望每天打开APP快速看到距离考试还有多少天
- 我希望看到一首精心挑选的古典诗词，获得精神支持和情感共鸣
- 我希望这个过程极简、快速、无干扰

### 成功标准
- 3秒内完成页面加载（在4G网络下）
- 可以离线使用（Service Worker缓存）
- 可安装到Android桌面（作为原生APP体验）
- Lighthouse PWA评分 ≥ 90
- 每日回访率目标：用户每周至少打开3次

## 技术栈（Tech Stack）

### 核心技术
- **HTML5**：语义化标签
- **CSS3**：原生CSS，使用CSS Grid/Flexbox布局
- **Vanilla JavaScript (ES6+)**：无框架，保持极致轻量
- **Service Worker API**：离线缓存和PWA功能

### 开发工具
- **Vite 5.x**：开发服务器和构建工具
- **@vitejs/plugin-pwa**：自动生成Service Worker
- **workbox**：Google的PWA工具集

### 打包部署
- **PWABuilder.com**：将PWA打包成Android APK
- **GitHub Pages**：免费静态托管（可选）
- **Netlify**：免费静态托管，支持自动部署（可选）

## 命令（Commands）

### 开发命令
```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查（如果配置了ESLint）
npm run lint
```

### PWA相关命令
```bash
# 生成PWA图标（使用pwa-asset-generator）
npm run generate-icons

# 测试PWA（使用Lighthouse CLI）
npm run test-pwa
```

### 部署命令
```bash
# 部署到GitHub Pages
npm run deploy:gh

# 部署到Netlify（使用netlify-cli）
npm run deploy:netlify
```

## 项目结构（Project Structure）

```
law-exam-app/
├── public/                    # 静态资源（不经过Vite处理）
│   ├── icon.svg              # 源图标文件
│   ├── manifest.json         # PWA清单文件（可选，vite-plugin-pwa自动生成）
│   └── robots.txt            # SEO配置
├── src/
│   ├── data/
│   │   └── poems.json        # 诗词数据库（100-150首）
│   ├── styles/
│   │   ├── reset.css         # CSS重置
│   │   ├── variables.css     # CSS变量（颜色、字体等）
│   │   └── main.css          # 主样式文件
│   ├── scripts/
│   │   ├── countdown.js      # 倒计时逻辑
│   │   ├── poems.js          # 诗词加载和显示逻辑
│   │   ├── date.js           # 日期计算工具
│   │   └── main.js           # 入口文件
│   └── index.html            # 主HTML文件
├── tests/
│   ├── unit/                 # 单元测试
│   │   ├── countdown.test.js
│   │   └── poems.test.js
│   └── e2e/                  # 端到端测试（可选）
│       └── user-flow.test.js
├── docs/
│   ├── ideas/
│   │   └── fa-kao-countdown.md    # 产品定义
│   └── spec.md                     # 本文档
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD配置（可选）
├── vite.config.js            # Vite配置
├── package.json              # 项目配置
└── README.md                 # 项目说明
```

## 代码风格（Code Style）

### 命名约定
- **文件名**：kebab-case（如 `countdown.js`）
- **变量名/函数名**：camelCase（如 `daysRemaining`）
- **常量名**：UPPER_SNAKE_CASE（如 `EXAM_DATE`）
- **CSS类名**：BEM风格（如 `.countdown__display`）

### 代码示例

**JavaScript模块风格：**
```javascript
// countdown.js
const EXAM_DATE = new Date('2026-09-19T00:00:00+08:00');

function calculateDaysRemaining(examDate) {
  const now = new Date();
  const diff = examDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

function updateCountdown() {
  const days = calculateDaysRemaining(EXAM_DATE);
  const element = document.getElementById('days-remaining');
  if (element) {
    element.textContent = `${days}天`;
  }
}

export { updateCountdown, calculateDaysRemaining };
```

**CSS风格：**
```css
/* main.css */
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.countdown__display {
  font-size: clamp(3rem, 15vw, 8rem);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
  text-align: center;
}

.countdown__label {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-top: 1rem;
}
```

**HTML风格：**
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>法考倒计时 2026</title>
</head>
<body>
  <main class="app">
    <section class="countdown">
      <div class="countdown__display">
        <span id="days-remaining">---</span>
        <span class="countdown__label">天</span>
      </div>
      <p class="countdown__date">距离 2026年9月19日</p>
    </section>

    <section class="poem">
      <h2 class="poem__title" id="poem-title">加载中...</h2>
      <p class="poem__author" id="poem-author"></p>
      <div class="poem__content" id="poem-content"></div>
    </section>
  </main>

  <script type="module" src="/scripts/main.js"></script>
</body>
</html>
```

### 格式规则
- **缩进**：2空格
- **分号**：总是使用
- **引号**：优先使用单引号（HTML属性除外）
- **行宽**：软限制100字符
- **尾随逗号**：多行对象/数组中使用

## 测试策略（Testing Strategy）

### 测试框架
- **Vitest**：单元测试（与Vite原生集成）
- **Playwright**：端到端测试（可选，用于PWA功能验证）
- **Lighthouse CI**：性能和PWA标准测试

### 测试覆盖范围
- **单元测试**：核心逻辑函数
  - 日期计算（`countdown.js`）
  - 诗词选择逻辑（`poems.js`）
  - 工具函数（`date.js`）
- **集成测试**：模块交互
  - 倒计时更新与DOM渲染
  - 诗词加载与显示
- **E2E测试**：用户流程（可选）
  - 打开APP → 显示倒计时 → 显示诗词
  - 离线功能验证

### 测试位置
```
tests/
├── unit/
│   ├── countdown.test.js    # 倒计时逻辑测试
│   ├── poems.test.js        # 诗词加载测试
│   └── date.test.js         # 日期工具测试
└── e2e/
    └── user-flow.test.js    # 用户流程测试
```

### 覆盖率目标
- 核心逻辑文件：≥ 80%
- 整体项目：≥ 60%

### 测试运行命令
```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行E2E测试
npm run test:e2e

# 生成覆盖率报告
npm run test:coverage
```

## 边界（Boundaries）

### Always（总是要做）
- ✅ 提交代码前运行测试并确保通过
- ✅ 遵循上述代码风格约定
- ✅ 添加新功能时更新相应的测试
- ✅ 保持文件结构清晰，不创建过深的目录层级
- ✅ 提交信息清晰描述改动内容
- ✅ 修改诗词数据后验证JSON格式正确性

### Ask First（需要先询问）
- ❓ 添加新的npm依赖包（尤其是大型库）
- ❓ 修改项目目录结构
- ❓ 更改Vite或PWA配置
- ❓ 修改诗词数据源或格式
- ❓ 实现规格中未提及的新功能

### Never（永远不做）
- ❌ 提交API密钥、密码等敏感信息
- ❌ 修改 `node_modules` 或 `dist` 目录中的文件
- ❌ 在没有测试的情况下修改核心逻辑
- ❌ 删除或注释掉失败的测试（除非获得批准）
- ❌ 使用外部CDN加载关键资源（保持离线能力）
- ❌ 硬编码配置值（应使用环境变量或配置文件）

## 验收标准（Success Criteria）

### 功能验收
- [ ] APP显示从当前日期到2026-09-19的准确倒计时
- [ ] APP根据日期显示对应的诗词（每日不同）
- [ ] 用户可以点击诗词查看完整内容
- [ ] APP可以安装到Android桌面
- [ ] APP在离线状态下仍可正常使用

### 性能验收
- [ ] Lighthouse性能评分 ≥ 90
- [ ] Lighthouse PWA评分 ≥ 90
- [ ] 首次内容绘制（FCP）< 1.5秒
- [ ] 最大内容绘制（LCP）< 2.5秒
- [ ] 总包大小 < 500KB（包含诗词数据）

### 兼容性验收
- [ ] 在Chrome 90+上正常工作
- [ ] 在Android 7+上可安装
- [ ] 在iOS Safari上可作为Web App使用（PWA功能受限但可用）

### 用户体验验收
- [ ] 页面加载后3秒内显示完整内容
- [ ] 布局在竖屏手机上正确显示
- [ ] 布局在横屏手机上可接受
- [ ] 文字大小在手机上易读（无需缩放）
- [ ] 触摸目标足够大（至少44x44px）

## 待解决问题（Open Questions）

### 技术问题
1. **诗词数据源**：需要准备100-150首精选古典诗词JSON文件
   - 来源：自行整理还是使用现有数据集？
   - 格式：需要包含哪些字段（标题、作者、朝代、正文、赏析）？

2. **PWA图标**：需要设计APP图标
   - 尺寸：需要512x512px源图标
   - 风格：建议简洁、中国风、书法元素

3. **初始内容**：APP首次打开时显示什么？
   - 选项A：显示"距离考试还有XXX天" + 今日诗词
   - 选项B：显示欢迎页 + 使用说明

### 次要问题
1. **主题颜色**：主色调是什么？（建议：中国红、水墨黑、竹绿）
2. **APP名称**：上架应用商店时用什么名字？
   - 建议："法考倒计时"、"法考·诗"、"2026法考"
3. **错误处理**：如果诗词数据加载失败怎么办？
   - 选项A：显示预设的"备用诗词"
   - 选项B：显示错误信息 + 重试按钮

## 下一步行动

1. ✅ 技术规格文档编写（完成）
2. ⏭️ 等待用户确认规格文档
3. ⏭️ 准备诗词数据（100-150首JSON）
4. ⏭️ 初始化Vite项目
5. ⏭️ 开始任务分解和实施
