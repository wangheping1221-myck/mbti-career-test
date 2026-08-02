# Changelog

本文件记录 Career Navigator Canada 的重要开发变化。

**结构说明**

- **[Unreleased](./CHANGELOG.md#unreleased)**：已完成但尚未打正式版本标签、或进行中的变更。发布时移入下方 Released Versions。
- **Released Versions**：已发布版本，按新→旧排列；有 Git tag 的版本会标注 tag 名。

发布步骤见 [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md)。

---

## [Unreleased]

### Docs（P5.7A）

- 同步项目文档至 `p5.6-complete`：平台首页 `/`、Career Test `/career-test`、Tools hub、三计算器已上线、共享导航、unlock 兼容重定向、OWP HV 保护与未跟踪材料非 SSOT

### 计划中（尚未完成）

- **P5.7B**：共享 `SITE_URL` helper、`app/sitemap.ts`、`app/robots.ts`、canonical 一致性（仅 metadata；无 trailingSlash 路由重定向）
- Related Tools 全面迁入 `lib/tools/catalog`（推迟至后续统一重构）
- ToolConfig 文案配置层（按需再抽象）
- 未跟踪 `app/canada-career-test/` 脏构建风险的未来清理

### 仍在仓库外 / 未入库（按需单独决策；非产品 SSOT）

- `app/canada-career-test/` 营销落地页
- `components/landing/`
- `marketing/` 小红书等站外素材
- 部分历史 PRD / Implementation Plan / 研究文档（本地未跟踪）

---

## Released Versions

### Platformization milestones（Git tags）

| Tag | Commit | 说明 |
|-----|--------|------|
| `p5.6-complete` | `536ea18` | Career Test 迁至 `/career-test`；`/` = PlatformHome；`/?unlock=` 临时重定向 |
| `p5.5-complete` | （见 git） | Career Test 结果 Related Tools 等 |
| `p5.2`–`p5.4` 相关提交 | `main` 历史 | 共享导航、Tools hub、平台首页组成 |

#### P5.6 Highlights（`p5.6-complete`）

- `/` → `PlatformHome` only
- `/career-test` → `CareerTestFlow`（compact intro；phase 名仍为 `home`）
- 导航：Home / Career Test / Tools
- CLB / OWP Related Tools 中 Career Test 链接改为 `/career-test`
- 解锁验证 / 评分 / 计算器逻辑未改

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

- 当时未开发 CLB / OINP / CRS / Tax / EI（其后已陆续上线 CLB / OWP）
- 未修改 Landing Page、Marketing（仍可能为未跟踪文件）

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

- 未开发 CLB / OINP 计算器（其后已上线）
- 未修改职业算法、解锁逻辑

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
