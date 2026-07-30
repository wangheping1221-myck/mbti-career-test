# Changelog

本文件记录 Career Navigator Canada 的重要开发变化。

**结构说明**

- **[Unreleased](./CHANGELOG.md#unreleased)**：已完成但尚未打正式版本标签、或进行中的变更。发布时移入下方 Released Versions。
- **Released Versions**：已发布版本，按新→旧排列；有 Git tag 的版本会标注 tag 名。

发布步骤见 [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md)。

---

## [Unreleased]

### Added

- CLB core library
- CLB validation
- CLB calculator
- CLB types
- lib/clb README
- CLB Calculator UI (/tools/clb-calculator)
- CLB Calculator page route
- Universal Tool Template integration
- FAQ
- Formula section
- Related tools
- Responsive calculator UI
- OINP / OWP `lib/oinp` Human-Verified scoring tables + package sign-off
- OINP / OWP `OwpScoringInput` validation + factor scorers + `calculateOwpEoi`

### 文档

- 将本文件调整为 `Unreleased` + `Released Versions` 结构
- 新增 `docs/RELEASE_PROCESS.md`（版本发布流程）
- **V2.4 P4.1 UI Design Review 完成**（OWP EOI Calculator 只读产品/UX/路由评审；下一步为 P4.2 UI Implementation；**尚未**创建工具页或 UI 代码）

### 计划中（尚未完成）

- OINP / OWP EOI Calculator **UI**（P4.2：`/tools/oinp-eoi-calculator`）
- `/tools` 工具中心页
- `/career-test` 路由迁移（需单独确认）
- ToolConfig 文案配置层（按需再抽象）

### 仍在仓库外 / 未入库（按需单独发布）

- `app/canada-career-test/` 营销落地页
- `components/landing/`
- `marketing/` 小红书等站外素材

---

## Released Versions

### [2.2.1] — 2026-07-29 — Universal Tool Template

**Git tag**：`v2.2.1-universal-tool-template`  
**Commit**：`e1e28bf`

#### Highlights

- Universal Tool Template completed
- Salary Calculator refactored onto shared components
- Tool Design System established（Tool 级抽象）
- Development Rules established（此前 docs commit，本版本一并纳入发布说明）
- Reusable tool components（`components/tools/*`）

#### Added

- Universal 组件：`tool-layout`、`tool-hero`、`calculator-panel`、`result-panel`、`calculation-details`、`formula-section`、`related-tools`、`disclaimer`、`last-updated`
- 兼容层：`calculator-layout` → 重导出 `CalculatorPanel`
- Salary 页补齐 `LastUpdated`

#### Changed

- Salary 页面与客户端改为组装 Universal 组件（外观与计算公式不变）
- `TOOL_DESIGN_SYSTEM.md` 提升为 Tool 级术语（Primary Result / Result Data / Calculation Details 等）
- 同步 `ARCHITECTURE.md` / `TODO.md` / `AI_CONTEXT.md` / `components/tools/README.md`

#### Not included

- 未开发 CLB / OINP / CRS / Tax / EI
- 未修改 Landing Page、Career Test、Marketing（仍可能为未跟踪文件）

---

### [2.1] — 2026-07-29 — Salary Calculator

> 说明：Salary Calculator 与 Universal Tool Template 在同一发布窗口合入 `main`；正式 annotated tag 打在 **2.2.1**。本条目保留功能发布记录。

#### Added

- 上线 `/tools/salary-calculator`：加拿大年薪 / 时薪转换器（税前）
- 支持年薪↔时薪，以及周薪、双周薪、月薪
- 支持每周工时快捷选项与自定义，每年工作周数可调（上限 52）
- 独立 SEO metadata、FAQ、免责声明、相关工具「即将推出」入口
- `lib/salary/`：`calculator` / `types` / `constants` / `format`
- 首批工具 UI：`result-card`、`tool-card`、`faq-section` 等

#### Not included

- 未开发 CLB / OINP 计算器
- 未修改 `app/page.tsx`、职业算法、解锁逻辑

---

### [2.0.1] — 2026-07-29 — 开发规范文档

**Commit**：`6ee1649`（`docs: add Tool Design System and Development Rules`）

#### Added

- `docs/TOOL_DESIGN_SYSTEM.md`：工具页统一设计规范
- `docs/DEVELOPMENT_RULES.md`：全站开发规范

#### Changed

- 审阅并同步 `AI_CONTEXT.md` / `ARCHITECTURE.md` / `PROJECT_ROADMAP.md`
- 精简 `DEVELOPMENT_RULES.md` Metadata 节，避免与 Design System 重复维护 SEO 清单

---

### [2.0] — 2026-07-29 — 平台化启动与基础架构

**Commit**：`6d0d2dc`（`feat: initialize Career Navigator Canada architecture`）

#### Project direction

- 原项目由 MBTI Career Test 升级为 Career Navigator Canada
- 未来同时提供职业导航、移民工具、工资工具和语言转换工具
- 现有职业测试作为独立模块继续保留

#### First tools planned

- OINP EOI 打分计算器
- 年薪 / 时薪转换计算器
- CLB 转换计算器

#### Architecture decisions

- 三个工具继续放在现有 Next.js 项目中；暂不建立第二个独立网站
- 未来建立统一的 `/tools` 工具中心
- 每个工具使用独立页面和独立 SEO metadata
- 政策评分数据与 UI 组件分离
- 第一版以中文为主

#### Docs & placeholders

- 新增 `PROJECT_ROADMAP.md`、`CHANGELOG.md`、`TODO.md`、`DECISIONS.md`、`AI_CONTEXT.md`、`ARCHITECTURE.md`
- 目录占位：`app/tools/`、`components/tools/`、`lib/calculators|salary|clb|oinp/`（含 README）

#### Not included（当时）

- 未修改 `app/page.tsx` 与职业测试逻辑
- 未建立 `/career-test`
- 未开发 Calculator UI 或算法

---

### Pre-2.0 — Career Test MVP（摘要）

平台化之前的职业测试 MVP 已在 `main` 上线，详见 [`PROJECT_NOTES.md`](./PROJECT_NOTES.md)。摘要：

- 10 题测试 → Top 5 推荐 + 高级报告解锁码
- 职业库与推荐算法 V1.x
- Vercel 部署与 GitHub 联动

该阶段无 `v2.*` 平台 tag。
