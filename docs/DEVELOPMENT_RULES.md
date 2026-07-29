# Career Navigator Canada — 开发规范（Development Rules）

**版本**：1.3  
**生效日期**：2026-07-29  
**适用范围**：本仓库全部功能开发（工具、职业测试维护、文档、营销素材入库）  
**相关文档**：

- AI 快速上下文 → [`AI_CONTEXT.md`](./AI_CONTEXT.md)（修改代码前必读）
- 架构与真实目录 → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 工具 UI 规范 → [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md)
- 任务板 → [`TODO.md`](./TODO.md)
- 变更日志 → [`CHANGELOG.md`](./CHANGELOG.md)
- 决策记录 → [`DECISIONS.md`](./DECISIONS.md)
- 路线图 → [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md)
- 发布流程 → [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md)

> **Why（为什么）**  
> 项目正从单一职业测试升级为平台。没有统一开发规范，会出现：算法写进页面、路由随意增殖、文档与代码脱节、误改职业测试核心。本文件是 **强制约定**，与 `AI_CONTEXT.md` 互补：后者偏「给 AI 的上下文」，本文件偏「人与 AI 共同遵守的工程法」。

---

## 目录

1. [Project Structure](#1-project-structure)
2. [Route Rules](#2-route-rules)
3. [Component Rules](#3-component-rules)
4. [Calculator Rules](#4-calculator-rules)
5. [TypeScript Rules](#5-typescript-rules)
6. [Naming Rules](#6-naming-rules)
7. [Metadata Rules](#7-metadata-rules)
8. [Import Rules](#8-import-rules)
9. [Git Rules](#9-git-rules)
10. [Documentation Rules](#10-documentation-rules)
11. [Quality Rules](#11-quality-rules)
12. [AI Collaboration Rules](#12-ai-collaboration-rules)
13. [Feature Development Workflow](#13-feature-development-workflow)
14. [Official Data Human Verification](#14-official-data-human-verification)

---

## 1. Project Structure

### 1.1 顶层目录用途

| 目录 | 用途 | 允许放入 | 禁止放入 |
|------|------|----------|----------|
| **`app/`** | Next.js App Router 路由、布局、metadata、Route Handlers | `page.tsx`、`layout.tsx`、`api/**/route.ts` | 重型业务算法、大段政策对照表 |
| **`components/`** | 可复用 UI | `ui/`（shadcn）、`tools/`、`landing/` | 政策评分规则、薪资公式实现 |
| **`lib/`** | 纯逻辑、数据、格式化、校验 | `salary/`、`clb/`、`oinp/`、职业推荐算法 | React 组件、页面 JSX |
| **`docs/`** | 项目文档与规范 | 路线图、决策、设计/开发规范 | 运行时依赖的业务数据（应放 `lib/`） |
| **`public/`** | 静态资源 | favicon、公开静态图 | 密钥、未授权素材 |
| **`marketing/`** | 小红书等站外素材 | 文案、海报图 | 与网站构建强耦合的 TS 源码 |

### 1.2 Why

分层清晰后，Salary 类工具可「换皮不换脑」：UI 在 `components/tools`，公式在 `lib/salary`。

### 1.3 Best Practice

- 改动前先对照 [`ARCHITECTURE.md`](./ARCHITECTURE.md) 的 **真实结构**，不要凭记忆猜路径  
- 新目录若为空，至少放 `README.md` 说明用途  
- `marketing/` 默认与产品发版解耦；入库需单独 commit，避免与功能 commit 混装  

### 1.4 Example

```text
✅ lib/salary/calculator.ts          # 纯函数
✅ components/tools/result-card.tsx  # 展示
✅ app/tools/salary-calculator/page.tsx  # 组装 + SEO

❌ app/tools/salary-calculator/page.tsx 内写 annual / hours / weeks 公式
```

---

## 2. Route Rules

### 2.1 规划中的正式路由

| 路由 | 用途 | 状态（以 ARCHITECTURE 为准） |
|------|------|------------------------------|
| `/` | 未来平台首页；**当前**为职业测试三合一 | 已存在，迁移前勿擅自改职责 |
| `/tools` | 工具中心 | 规划中 |
| `/tools/salary-calculator` | 年薪时薪转换 | ✅ 已上线 |
| `/tools/clb-calculator` | CLB 转换 | 规划中 |
| `/tools/oinp-eoi-calculator` | OINP EOI | 规划中 |
| `/career-test` | 职业测试独立入口 | 规划中，**未迁移前禁止创建空壳误导** |
| `/about` | 关于 | 规划中 |
| `/blog` | 学习中心 / 博客 | 规划中 |
| `/canada-career-test` | 营销落地页 | 已存在（可能未入库） |
| `/api/verify-unlock` | 解锁码校验 | 已存在 |

### 2.2 强制规则

1. **禁止随意创建顶层路由目录**（如 `/calc`、`/oinp`、`/salary`）——工具一律挂在 `/tools/*`  
2. **未经确认不得**把 `/` 改成平台首页，或创建 `/career-test` 并切断旧入口  
3. 新工具路由命名：`kebab-case`，与文件夹名一致  
4. API 仅用于服务端能力（校验、未来 webhook 等），不把页面业务塞进 API  

### 2.3 Why

统一前缀有利于 SEO（工具中心内链）与权限/导航扩展。

### 2.4 Best Practice

- 新增路由前在 `TODO.md` 或 `DECISIONS.md` 留记录  
- 旧路径若需兼容，使用明确 redirect，并写进 CHANGELOG  

---

## 3. Component Rules

### 3.1 原则

1. **单一职责**：一个组件只做一件展示或交互事  
2. **优先复用**：先查 `components/ui` 与 `components/tools`  
3. **禁止复制一整页**再改几个字做成「新工具」  
4. **Server Component 优先**；仅需要 state / 浏览器 API 时加 `"use client"`  
5. 工具 UI 遵循 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md)  

### 3.2 Why

Salary 已沉淀 `CalculatorLayout` / `ResultCard` / `FaqSection` / `ToolCard`。CLB、OINP 应站在同一肩上，而不是平行宇宙。

### 3.3 Best Practice

- 通用 UI → `components/tools/`  
- 某工具强耦合交互 → `components/tools/<tool>-calculator.tsx`  
- shadcn 原子组件 → `components/ui/`（用 CLI 添加，勿手搓分叉）  

### 3.4 Example

```text
✅ 复用 FaqSection，传入不同 FAQ 数组
❌ 每个工具复制一份 FAQ 折叠实现
```

---

## 4. Calculator Rules

### 4.1 强制分层

| 层 | 位置 | 内容 |
|----|------|------|
| 页面 | `app/tools/<tool>/` | 组装、文案、metadata |
| UI | `components/tools/` | 输入、结果展示、无业务公式 |
| 算法 | `lib/<domain>/` | 纯函数、校验、格式化 |
| 规则数据 | `lib/<domain>/*rules*` 或对照表文件 | 政策分值、CLB 对照等 |

### 4.2 禁止

- 在 `page.tsx` 中编写计算公式或评分累加  
- 在 React 组件里硬编码 OINP / CLB 对照表  
- 用 AI「凭记忆」填政策分值（见 `AI_CONTEXT.md` 政策数据原则）  

### 4.3 Why

政策会变。数据与 UI 分离后，更新对照表不必重测整页布局（Decision 006）。

### 4.4 Best Practice

- 导出明确的 `calculateX(inputs): Result | Error`  
- 返回分项明细，供 Calculation Details 渲染  
- 金额用统一 `format` 模块  

### 4.5 Example

```ts
// lib/salary/calculator.ts
export function calculateSalary(inputs: SalaryInputValues): SalaryCalculationResult
```

```tsx
// components/tools/salary-calculator.tsx
const result = calculateSalary({ ... }) // 只调用，不实现公式
```

---

## 5. TypeScript Rules

### 5.1 强制

1. **禁止 `any`**（除非书面说明理由，并尽量 `unknown` + 收窄）  
2. 为计算器输入/输出建立 `types.ts`  
3. 对外部 JSON / `fetch` 结果做校验或类型守卫  
4. 优先 `strict` 已有配置下通过 `tsc` / `next build` 类型检查  

### 5.2 Why

工资与移民分数算错的代价高于多写几个 interface。

### 5.3 Best Practice

```ts
// ✅
type ConversionMode = "annual-to-hourly" | "hourly-to-annual";

// ❌
function calc(data: any) { ... }
```

---

## 6. Naming Rules

| 风格 | 适用 | 示例 |
|------|------|------|
| **kebab-case** | 路由文件夹、一般文件名 | `salary-calculator/`、`faq-section.tsx` |
| **PascalCase** | React 组件、类型（部分） | `SalaryCalculator`、`ResultCard` |
| **camelCase** | 函数、变量、对象字段 | `calculateSalary`、`hoursPerWeek` |
| **SCREAMING_SNAKE** | 真正的常量 | `DEFAULT_WEEKS_PER_YEAR` |
| **UPPER 文档标题** | Markdown 文件名可读性 | `TOOL_DESIGN_SYSTEM.md` |

### 6.1 Why

与 Next.js / React 社区习惯一致，降低 Code Review 摩擦。

### 6.2 Best Practice

- 组件文件名与默认导出组件名对应：`result-card.tsx` → `ResultCard`  
- 避免 `utils2.ts`、`temp.tsx`、`new-calculator-final.tsx`  

---

## 7. Metadata Rules

### 7.1 原则

工具页 metadata 的字段清单与示例以 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md) **§7 SEO Standards** 为准，避免两处维护同一长列表。

### 7.2 工程侧强制

- 每个公开工具路由必须有独立 `metadata`（`layout.tsx` 或 `page.tsx`）
- 必须含 `title`、`description`、`alternates.canonical`、Open Graph
- **不要**为单个工具大范围改写根布局默认 title，除非产品确认品牌升级
- 结构化数据在内容稳定后再加

### 7.3 Example

见 `/tools/salary-calculator` 的 `layout.tsx`。

---

## 8. Import Rules

### 8.1 强制

1. 优先使用路径别名 **`@/`**（见 `tsconfig`）  
2. **避免**深层相对路径 `../../../`  
3. 服务端专用模块不要被客户端组件误导入（注意 `"use client"` 边界）  

### 8.2 Why

重构目录时，别名导入比相对路径更稳。

### 8.3 Example

```ts
✅ import { calculateSalary } from "@/lib/salary/calculator";
❌ import { calculateSalary } from "../../../lib/salary/calculator";
```

---

## 9. Git Rules

### 9.1 Commit 类型（Conventional 风格）

| 前缀 | 用途 |
|------|------|
| `feat` | 新功能（如新工具页） |
| `fix` | 缺陷修复 |
| `docs` | 仅文档 |
| `refactor` | 行为不变的结构优化 |
| `style` | 格式/样式无关逻辑 |
| `test` | 测试 |
| `chore` | 构建、依赖、杂务 |

### 9.2 强制

1. **一个功能一个 commit**（或一组紧密相关的文件）；勿把 marketing 大图与算法混在同一 commit  
2. Commit 前说明 **影响范围**（改了哪些用户路径）  
3. **默认不自动 commit / push**；须用户明确指令  
4. 勿强制 push、勿改 git config  

### 9.3 Why

清晰历史便于回滚 Salary / 政策规则等敏感变更。

### 9.4 Best Practice

```text
feat: add salary calculator at /tools/salary-calculator

docs: add tool design system and development rules
```

---

## 10. Documentation Rules

### 10.1 每完成一个版本 / 可交付功能，必须更新

| 文档 | 更新内容 |
|------|----------|
| **CHANGELOG.md** | 用户可见变化、新增文件、明确未做项 |
| **TODO.md** | 勾选完成项；修正过时「禁止事项」 |
| **PROJECT_ROADMAP.md** | 若阶段目标完成，勾选对应路线图项 |
| **ARCHITECTURE.md** | 新路由、新目录、真实结构变化 |
| **DECISIONS.md** | 仅当有新的产品/技术决策时追加 |

### 10.2 Why

文档是多人与 AI 协作的唯一可靠记忆；只改代码不改文档会导致下次误删功能。

### 10.3 Best Practice

- 文档用中文为主，专有名词保留英文  
- 发现重复内容时：**保留原文 + 交叉链接**，不擅自删除历史文档  
- `PROJECT_NOTES.md` 视为 MVP 历史记录，新规范以本文件与 Design System 为准  

---

## 11. Quality Rules

### 11.1 提交或宣布「完成」前必须通过

以 `package.json` **实际 scripts** 为准（当前）：

```bash
pnpm.cmd lint
pnpm.cmd build
```

`next build` 已包含类型检查。若单独跑 `tsc --noEmit` 也可作为补充。

### 11.2 强制

1. Lint 失败必须修复本次引入的问题  
2. Build 失败：先区分「本次改动」与「旧项目遗留」；遗留问题须如实汇报  
3. 计算器须有可复现用例（单元测试或手动用例清单）  
4. 政策工具未核实规则 **不得** 标为完成  

### 11.3 Why

上线错误工资/分数会直接伤害信任与合规。

---

## 12. AI Collaboration Rules

本节固化已在协作中执行的流程，与用户「AI Rules」一致。

### 12.1 修改前

1. **先阅读** `AI_CONTEXT.md` 与相关规范  
2. **检查真实项目结构**（不要猜文件名）  
3. **先分析，再修改**  
4. **列出将新增 / 修改的文件清单**  
5. 说明实现步骤；若任务要求「直接开始」可在清单后立即开发，否则等待确认  
6. **未经确认不做大规模重构**（路由迁移、目录大搬家、重写职业算法等）  

### 12.2 修改中

1. **最小修改原则**：只动完成任务所需文件  
2. **不修改无关代码**（含 marketing、未要求的落地页、职业测试核心）  
3. **保持算法与 UI 分离**  
4. **优先复用已有组件**  
5. **每完成一步可汇报**（复杂任务）  

### 12.3 修改后

1. 运行 lint / build（及约定测试）  
2. 更新 CHANGELOG / TODO / 必要架构文档  
3. 汇报：新增文件、修改文件、测试结果、风险与未跟踪文件  
4. **不自动 Commit**  
5. **不自动 Push**  
6. **等待用户确认** 后再进行提交、发布或下一阶段  

### 12.4 Why

AI 容易「顺手重构」。显式门禁保护职业测试与政策合规边界。

### 12.5 Example 工作流

```text
读文档 → 列文件清单 → 实现 lib → 实现 UI → 接路由
→ lint/build → 更新 docs → 汇报 →（用户）确认 commit/push
```

---

## 13. Feature Development Workflow

**默认流程**：以后每一个工具 / 功能都必须按本节执行。  
细节 Tag / 发版检查见 [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md)。  
依赖官方外部数据的功能还须遵守 [§14 Official Data Human Verification](#14-official-data-human-verification)。

推荐链路：

```text
PRD
→ Review
→ Plan
→ Review
→ Phase Development
→ Review
→ Release Review
→ Human Verify (if required)
→ Human Verify Sign-off
→ Commit
→ Push
→ CHANGELOG
→ Commit
→ Push
→ Release Tag
```

说明：

- **Human Verify / Sign-off** 仅在功能依赖官方外部数据时强制（见 §14）；纯数学或格式化工具（如 Salary Calculator）可跳过。  
- 中间 Phase 仍须遵循 End-of-Phase Rule；上图是到 **Release Tag** 的完整门禁顺序。  

**禁止**在未拆 Phase、未获批准的情况下一次性实现整个大功能。

---

### 13.1 Product Design（PRD）

1. 先创建 PRD 文档（如 `docs/PRD_<FEATURE>.md`）。  
2. **不写代码**。  
3. **等待 Review**；未批准不得进入 Implementation Plan。  

PRD 至少包含：产品目标、Scope / Out of Scope、用户场景、验收标准。  
若功能依赖官方外部数据，PRD / Plan 中须标明 **Human Verify 为 Release 前置条件**。

---

### 13.2 Implementation Plan

1. 基于已批准的 PRD 编写 Implementation Plan（如 `docs/IMPLEMENTATION_PLAN_*.md`）。  
2. **不写代码**。  
3. **等待 Review**；未批准不得开始写业务代码。  

大功能必须在 Plan 中拆成多个可独立 Review 的 Phase，再开始编码。  
涉及官方对照表时，Plan 须包含 Human Verify 与 Sign-off Phase（或等价检查项）。

---

### 13.3 Incremental Development（分阶段开发）

1. 按小 Phase 实现；每个 Phase 须可独立 Review。  
2. **当前 Phase 获批准前，不得进入下一 Phase**。  
3. 业务逻辑与 UI 分离（算法在 `lib/`，页面只组装）。  
4. Phase 结束前执行 lint / typecheck / build（以项目实际 scripts 为准）。  
5. Commit 保持小而专注；**不把无关改动混进同一 Commit**。  
6. **Commit / Push 前等待 Review**（用户明确要求时可例外）。  

---

### 13.4 Release Process（阶段完成后的发布动作）

完整功能在 **Release Review** 通过后，若依赖官方数据，须先完成 **Human Verify** 与 **Human Verify Sign-off**（§14），再按下列顺序入库与打 Tag：

1. **只 Commit 相关文件**（含 Sign-off 元数据，若适用）  
2. **Push** 到 `origin/main`（或约定分支）  
3. 更新 `docs/CHANGELOG.md`（通常写 **[Unreleased]** 或 Released 版本条目）  
4. **单独 Commit** CHANGELOG 更新（不与业务代码混 commit）  
5. **再 Push**  
6. **仅在发版里程碑**创建 Annotated Git Tag，并只 Push 该 Tag  

补充：

- 中间 Phase 可以 Commit / Push，但通常**不打 Tag**。  
- **只有完整可用的版本**才打 Tag。  
- **未完成 Human Verify（如适用）不得打 Release Tag**。  
- 小型 Bug Fix 或纯文档更新通常**不打 Tag**。  
- Tag 操作细则见 [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md)。  

---

### 13.5 End-of-Phase Rule（每个 Phase 结束时强制）

每个 Phase 结束后，**必须停下**并向用户汇报：

1. **Current phase completed**（当前 Phase 已完成）  
2. **Next recommended phase**（建议的下一 Phase）  
3. **Whether Review is required**（是否需要 Review）  
4. **Whether Commit / Push is recommended**（是否建议 Commit / Push）  

**在用户明确批准前，不得自动继续下一 Phase 或自动 Commit / Push / Tag。**

---

### 13.6 Why

统一流程避免：无 PRD 直接写 UI、大功能一次做完无法 Review、Changelog 与代码混 commit、半成品乱打 Tag、官方数据未核对就发版、AI 擅自进入下一阶段。

### 13.7 Example（CLB V2.3）

```text
PRD → Review
→ Implementation Plan → Review
→ Phase 1 lib/clb → End-of-Phase 汇报 → Review → Commit/Push → Changelog 单独 Commit/Push（不打 tag）
→ Phase 2 UI → … → Release Review
→ Human Verify（官方 IRCC 表）→ Human Verify Sign-off → Commit/Push
→ CHANGELOG → Commit/Push → Release Tag
```

---

## 14. Official Data Human Verification

本节正式固化：**依赖官方外部数据的功能，在 Release 前必须完成 Human Verify 与 Sign-off。**

### 14.1 When Human Verify is required

Human Verify is **REQUIRED** before Release for any feature that depends on official external data, including but not limited to:

- Immigration rules  
- IRCC language tables  
- CRS scoring  
- OINP scoring  
- Tax brackets  
- Government benefits  
- EI rules  
- Salary standards published by government  
- Any official thresholds or regulatory data  

Pure mathematical or formatting tools (for example Salary Calculator) may skip this phase.

### 14.2 Human Verify requirements

- Use primary official sources whenever available.  
- Cross-check with another official source if possible.  
- Never rely on AI memory or third-party websites as the authoritative source.  
- Verify every value one by one.  
- Record:  
  - official source URLs  
  - verification date  
  - verification status  

### 14.3 Human Verify Sign-off

After verification:

- Update verification metadata.  
- Remove temporary TODO markers.  
- Do not modify business logic.  
- Do not modify verified values.  

### 14.4 Release Rule

A Release Tag may only be created after:

```text
PRD
→ Review
→ Plan
→ Review
→ Phase Development
→ Review
→ Release Review
→ Human Verify (if required)
→ Human Verify Sign-off
→ Commit
→ Push
→ CHANGELOG
→ Commit
→ Push
→ Release Tag
```

### 14.5 Why

官方对照表与法规阈值直接决定用户可信结果。未人工核对即发版属于合规与产品风险；Sign-off 只改元数据，避免在核对阶段误改已核对数值或业务逻辑。

### 14.6 Example（CLB）

```text
Open Canada.ca IRCC tables → compare every CLB floor one by one
→ record source URLs + retrievedOn + verified status
→ replace HUMAN_VERIFY_TODO with HUMAN_VERIFIED metadata
→ do not change IELTS_GT_CLB_MINIMUMS values
→ Commit / Push Sign-off → then CHANGELOG → Tag
```

---

## 与现有文档的关系（避免冲突）

| 主题 | 权威文档 | 说明 |
|------|----------|------|
| 给 AI 的编码速查 | `AI_CONTEXT.md` | 保持；本文件更完整，冲突时以 **更新的规范 + DECISIONS** 为准并交叉修订 |
| 真实目录 | `ARCHITECTURE.md` | 结构变化先改它 |
| 工具视觉与页面骨架 | `TOOL_DESIGN_SYSTEM.md` | UI 争议以它为准 |
| 产品阶段目标 | `PROJECT_ROADMAP.md` | 优先级以它 + TODO 为准 |
| 单次决策 | `DECISIONS.md` | 新决策追加，不改写历史条目含义 |
| 版本 Tag / 发版检查 | `RELEASE_PROCESS.md` | 与本文件 §13 Release 步骤配合；官方数据另受 §14 约束 |
| 功能级流程 | 本文件 §13 | PRD → Plan → 分 Phase → Release Review →（Human Verify）→ Release |
| 官方数据人工核对 | 本文件 §14 | Release Tag 前置条件（适用时） |

若发现两处文档过时不一致：**不要静默删改历史**；在 CHANGELOG 记录，并更新过时段落或加「已由 xxx 取代」链接。

---

## 修订记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-07-29 | 1.0 | 首版正式开发规范 |
| 2026-07-29 | 1.0.1 | 审阅：Metadata 节改为引用 Design System，减少重复 |
| 2026-07-29 | 1.1 | 新增 §13 Feature Development Workflow（PRD → Plan → Changelog → Release） |
| 2026-07-29 | 1.2 | §13 正式固化：分 Phase、Release 顺序、End-of-Phase Rule（须停下等批准） |
| 2026-07-29 | 1.3 | 新增 §14 Official Data Human Verification；§13 默认流程纳入 Human Verify / Sign-off |
