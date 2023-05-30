# The frontend app of meter

## Dev

### Prerequisite

- Node v16.18 +
- VSCode (optional)

### Run

```bash
npm install
npm run dev
```

### Project Architecture

- Project Starter Template: [create-t3-app](https://create.t3.gg/) with tRPC and Tailwind CSS
- UI Component: [shadcn/ui](https://ui.shadcn.com/) as component library
- Icon: [iconify](https://iconify.design/) as icon library
- `src/components`
  - `/ui`: 使用 `npx shadcn-ui add [component]` 安裝的 shadcn/ui 元件，詳情請見 [shadcn/ui CLI](https://ui.shadcn.com/docs/cli)
  - others: 放各種非 pages 的 React Component
- `src/pages`
  - 檔名和路徑即決定 frontend website 的 routing，請見 [Next.js Pages](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)
  - 每個 Pages 內的元件即為一個頁面，應以 JS 邏輯為主，UI 能拆就拆到 components
  - `/api`: tRPC API 介面
- `src/server`: server-side code，目前還沒用到
