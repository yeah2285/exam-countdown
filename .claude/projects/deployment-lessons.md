# GitHub Pages 部署完整指南与常见问题

## 核心经验教训

### 问题：CSS/JS 404错误的根本原因

在使用 `npm run deploy` (gh-pages) 成功部署后，访问GitHub Pages URL时遇到CSS和JS文件404错误，通常是因为：

1. **GitHub Pages 功能未启用**
   - gh-pages 分支存在且代码已上传
   - 但 GitHub 仓库设置中 Pages 功能未启用
   - 或未指向正确的分支

2. **路径配置问题**
   - `vite.config.js` 中 `base` 属性设置错误
   - 应该是 `/仓库名/` 而不是 `/`

3. **构建入口点缺失**
   - HTML 中缺少 Vite 的入口 script 标签
   - 导致 Vite 不处理 CSS/JS 打包

## 完整的 GitHub Pages 部署流程

### 第一步：在 GitHub 上启用 Pages 功能（必须在部署前）

**重要：这一步必须在运行 `npm run deploy` 之前完成！**

1. 访问您的 GitHub 仓库
2. 点击顶部的 **Settings** 标签
3. 在左侧边栏找到并点击 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 **Deploy from a branch**
   - **Branch**: 选择 **gh-pages** 分支
   - **Folder**: 选择 **/ (root)**
5. 点击 **Save** 保存设置
6. 等待几秒钟，直到页面顶部出现绿色提示：**"Your site is live"**

### 第二步：配置项目的 base 路径

在 `vite.config.js` 中设置正确的 base：

```javascript
export default defineConfig({
  // 对于 GitHub Pages，base 必须是 /仓库名/
  base: '/exam-countdown/',  // 注意前后的斜杠
  
  // 如果是用户名.github.io 这种格式，base 应该是 '/'
  // base: '/',  // 仅用于用户名.github.io
```

### 第三步：确保 HTML 有正确的入口点

在 `index.html` 中必须有 Vite 入口点：

```html
<!-- Vite 入口点 - 开发模式和生产模式都需要 -->
<script type="module" src="/src/scripts/main.js"></script>
```

**注意**：不要删除这个 script 标签！Vite 会在构建时自动替换成正确的打包文件路径。

### 第四步：部署应用

```bash
# 构建并部署
npm run deploy

# 这个命令会：
# 1. 运行 npm run build 构建
# 2. 将 dist 目录上传到 gh-pages 分支
# 3. 推送到 GitHub
```

### 第五步：验证部署

访问您的 GitHub Pages URL：
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

## 常见问题排查

### 问题 1：CSS 和 JS 文件 404

**症状**：页面能访问，但样式丢失，JavaScript 不工作

**原因**：
1. GitHub Pages 功能未启用
2. Vite 配置的 base 路径错误
3. 构建时缺少入口点

**解决方案**：
1. 检查 GitHub 仓库 Settings → Pages 是否已启用
2. 确认 `vite.config.js` 中 base 设置正确
3. 确认 `index.html` 中有 script 入口点

### 问题 2：Service Worker 拦截请求

**症状**：PWA 缓存了旧的错误版本

**解决方案**：
1. 在浏览器中清除所有缓存
2. 在开发者工具 Application 标签中注销 Service Worker
3. 强制刷新页面 (Ctrl+Shift+R)

### 问题 3：图标文件 404

**解决方案**：
- 使用内联 SVG data URI，不依赖外部文件
- 或确保图标文件在 `public/` 目录中

## 关键配置文件清单

### vite.config.js

```javascript
export default defineConfig({
  base: '/your-repo-name/',  // 必须与仓库名一致
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',  // 确保 Service Worker 自动更新
      // ... 其他配置
    })
  ],
  // ... 其他配置
});
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <!-- meta 标签 -->
</head>
<body>
  <!-- 应用内容 -->
  
  <!-- 关键：Vite 入口点 -->
  <script type="module" src="/src/scripts/main.js"></script>
</body>
</html>
```

### package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 部署前检查清单

在运行 `npm run deploy` 之前，确保：

- [ ] GitHub 仓库中已启用 Pages 功能
- [ ] Pages 设置指向 gh-pages 分支
- [ ] `vite.config.js` 中 base 设置正确
- [ ] `index.html` 中有 script 入口点
- [ ] 本地构建测试通过 (`npm run build`)
- [ ] 本地预览正常 (`npm run preview`)

## 部署后验证清单

部署完成后，验证：

- [ ] 访问 GitHub Pages URL 能打开页面
- [ ] 按 F12 检查 Network 标签，确认 CSS/JS 文件状态为 200
- [ ] 检查 Console 标签，无 404 错误
- [ ] UI 显示正常（样式、布局、功能）
- [ ] PWA 功能可测试（可安装到桌面）

## 技术细节：为什么需要这些步骤

### gh-pages 命令的作用

`npm run deploy` 实际运行的是 `gh-pages -d dist`，它会：
1. 将 `dist/` 目录的内容上传到一个独立的 `gh-pages` 分支
2. 推送到 GitHub
3. **但不会**自动启用 GitHub Pages 功能

### GitHub Pages 的要求

GitHub Pages 需要：
1. 一个特定的分支（通常是 gh-pages 或 main）
2. 在仓库设置中明确启用 Pages 功能
3. 配置正确的源分支和目录

### Vite 的 base 路径

`base` 配置影响：
1. 构建时资源的引用路径
2. HTML 中自动注入的 CSS/JS 链接
3. PWA manifest 的路径

如果设置错误，会导致：
- CSS/JS 文件找不到（404）
- PWA manifest 加载失败
- 相对路径资源加载错误

## 最佳实践建议

1. **创建新仓库时立即启用 Pages**
   - 在第一次部署前就完成 Pages 设置
   - 避免部署后才发现无法访问

2. **使用一致的命名**
   - 仓库名、base 路径保持一致
   - 避免大小写和特殊字符

3. **本地先测试**
   - `npm run build` 确认构建成功
   - `npm run preview` 本地预览
   - 确认无误后再部署

4. **版本控制**
   - 将 `dist/` 目录加入 `.gitignore`
   - 只通过 `npm run deploy` 部署
   - 不要手动提交 dist 目录

5. **缓存管理**
   - 部署后通知用户清除缓存
   - 使用强缓存刷新 (Ctrl+Shift+R)
   - 考虑添加版本号强制刷新缓存

## 给用户的说明模板

当部署 GitHub Pages 项目时，应该提供以下说明：

### 部署前准备

1. 在 GitHub 仓库中启用 Pages 功能：
   - Settings → Pages → Deploy from a branch → gh-pages

2. 确认仓库名称与 `vite.config.js` 中的 `base` 一致

### 部署命令

```bash
npm run deploy
```

### 部署后访问

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### 重要提示

- 部署后请强制刷新浏览器 (Ctrl+Shift+R)
- 如有样式问题，请清除浏览器缓存
- 首次访问可能需要等待 1-2 分钟让 GitHub Pages 生效
