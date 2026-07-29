# Changelog

本文件记录 Career Navigator Canada 的重要开发变化。

## 2026-07-29 — Version 2.0 启动

### 项目定位调整

- 原项目由 MBTI Career Test 升级为 Career Navigator Canada。
- 网站不再只提供职业性格测试。
- 未来将同时提供职业导航、移民工具、工资工具和语言转换工具。
- 现有职业测试作为网站中的独立模块继续保留。

### 第一批计划工具

- OINP EOI 打分计算器
- 年薪 / 时薪转换计算器
- CLB 转换计算器

### 架构决策

- 三个工具继续放在现有 Next.js 项目中。
- 暂不建立第二个独立网站。
- 未来建立统一的 `/tools` 工具中心。
- 每个工具使用独立页面和独立 SEO metadata。
- 政策评分数据与 UI 组件分离。
- 后续考虑中英文双语，但第一版以中文为主。

### 文档

- 新增 PROJECT_ROADMAP.md
- 新增 CHANGELOG.md
- 新增 TODO.md
- 新增 DECISIONS.md
- 新增 AI_CONTEXT.md

---

## 2026-07-29 — Version 2 基础架构（仅目录与文档）

### 架构文档

- 新增 `docs/ARCHITECTURE.md`：记录当前真实目录、Version 2 规划目录，以及已存在 / 未来新增的区分。

### 目录占位（无业务代码）

- 新建 `app/tools/`（含 README）
- 新建 `components/tools/`（含 README，列出共用组件规划，未实现）
- 新建 `lib/calculators/`（含 README：算法不得写在 page.tsx）
- 新建 `lib/salary/`、`lib/clb/`、`lib/oinp/`（含 README 占位）

### 明确未做

- 未修改 `app/page.tsx` 与职业测试逻辑
- 未建立 `/career-test`，未迁移测试
- 未开发任何 Calculator UI 或算法
- 未修改 SEO
