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

---

## 2026-07-29 — Version 2.1 Salary Calculator

### 新增功能

- 上线 `/tools/salary-calculator`：加拿大年薪 / 时薪转换器（税前）
- 支持年薪↔时薪，以及周薪、双周薪、月薪
- 支持每周工时快捷选项与自定义，每年工作周数可调（上限 52）
- 独立 SEO metadata、FAQ、免责声明、相关工具「即将推出」入口

### 新增文件

- `app/tools/salary-calculator/page.tsx`
- `app/tools/salary-calculator/layout.tsx`
- `components/tools/salary-calculator.tsx`
- `components/tools/calculator-layout.tsx`
- `components/tools/result-card.tsx`
- `components/tools/tool-card.tsx`
- `components/tools/faq-section.tsx`
- `lib/salary/calculator.ts`
- `lib/salary/types.ts`
- `lib/salary/constants.ts`
- `lib/salary/format.ts`

### 明确未做

- 未开发 CLB / OINP 计算器
- 未修改 `app/page.tsx`、职业算法、解锁逻辑
- 未纳入 marketing / 落地页未跟踪文件

---

## 2026-07-29 — 正式开发规范文档

### 文档

- 新增 `docs/TOOL_DESIGN_SYSTEM.md`：全站工具页统一设计规范（页面结构、Token、响应式、SEO、无障碍、扩展清单）
- 新增 `docs/DEVELOPMENT_RULES.md`：全站开发规范（目录、路由、组件、计算器分层、TS、Git、质量门禁、AI 协作流程）

### 明确未做

- 未修改任何业务代码或 Salary Calculator 实现
- 未 Commit / 未 Push

---

## 2026-07-29 — 规范文档审阅与同步

### 文档

- Review `TOOL_DESIGN_SYSTEM.md` / `DEVELOPMENT_RULES.md` 与既有文档的冲突与重复
- 同步 `AI_CONTEXT.md`：权威文档表、Salary 已完成、公式与 SEO 改为引用规范
- 同步 `ARCHITECTURE.md`：去掉过时的「无 Calculator」表述，更新 app/components/lib/docs 状态
- 同步 `PROJECT_ROADMAP.md`：Version 2.1、Salary 与可复用组件勾选完成
- 精简 `DEVELOPMENT_RULES.md` Metadata 节，避免与 Design System 双份维护 SEO 长列表

### 明确未做

- 未修改业务代码
- 未补齐 Salary Last Updated UI（仍在 TODO）
