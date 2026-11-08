<div align="center">
  <img src="public/imgs/logo/logo_256.png" alt="VM汉化组" width="128" height="128" />
</div>

# VM汉化组官网 v4

立即访问：<https://www.vmct.top/>

导航栏的外观菜单提供「浅色」「深色」「跟随系统」。默认跟随系统并实时响应系统主题变化；手动选择会保存在当前浏览器，刷新后继续生效，并实时同步到同一浏览器中打开的其他同源标签页（页面主题与菜单选中状态一并更新）。

主题状态由 VueUse `useColorMode` 管理，保存在 `localStorage.theme`（`light` / `dark` / `auto`）；旧的 `system` 值在初始化时迁移为 `auto`。Markdown 样式表和 `data-theme` 通过 `onChanged` 与实际主题同步。

## 📖 使用与部署

官网采用运行时动态渲染，内容发布无需构建；Vue 内容后台在 VMPM 内嵌并统一登录。架构、联调与部署顺序见 [动态官网说明](DYNAMIC_SITE.md)。

我们推荐使用 VSCode 编辑器进行开发。

在开发前，请先安装 [NodeJS](https://nodejs.org/zh-cn/download/prebuilt-installer)，推荐安装 Node24。

安装依赖：

```sh
pnpm i
```

开发预览：

```sh
pnpm run dev
```

构建：

```sh
pnpm run build
```
