# Career Navigator Canada — 工具设计规范（Tool Design System）

**版本**：1.1（V2.2.1 Universal Tool Template）  
**生效日期**：2026-07-29  
**适用范围**：所有 `/tools/*` 工具页面（Salary、CLB、OINP / EOI、CRS、EI、Tax 等）  
**相关文档**：

- 架构说明 → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 开发规范 → [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)
- AI 协作上下文 → [`AI_CONTEXT.md`](./AI_CONTEXT.md)
- 产品原则 → [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md)
- 合规决策 → [`DECISIONS.md`](./DECISIONS.md)（Decision 005）

> **Why（为什么）**  
> 工具页是自然搜索流量的主要入口。若每个计算器视觉与结构不一致，用户信任度下降，SEO 与组件复用成本上升。本规范定义 **Universal Tool Template**：一套与具体领域无关的页面骨架与组件契约。Salary / CLB / CRS / EOI / Tax / EI 都站在同一套组件之上，只替换输入字段、结果数据与规则文案。

### 文档权威说明

- **本文件**负责：工具页 UI、信息架构、Token、SEO 展示清单、无障碍、Universal Template 组件职责。
- **工程分层 / Git / AI 流程** → [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)
- **真实目录是否已建** → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **产品优先级** → [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md)

---

## 目录

1. [Design Philosophy](#1-design-philosophy)
2. [Standard Page Structure](#2-standard-page-structure)
3. [Design Tokens](#3-design-tokens)
4. [Typography](#4-typography)
5. [Responsive Rules](#5-responsive-rules)
6. [Universal Tool Template](#6-universal-tool-template)
7. [SEO Standards](#7-seo-standards)
8. [Related Tools Rules](#8-related-tools-rules)
9. [Accessibility](#9-accessibility)
10. [Future Expansion](#10-future-expansion)
11. [Domain Mapping Examples](#11-domain-mapping-examples)

---

## 1. Design Philosophy

### 1.1 核心原则

| 原则 | 含义 | 实践要求 |
|------|------|----------|
| **简洁** | 一屏一事，减少装饰噪音 | 不使用夸张插画、霓虹渐变、多阴影堆叠 |
| **专业** | 像可信赖的加拿大实用工具，而非娱乐测验 | 文案克制；禁止「保证获邀 / 保证找到工作」 |
| **面向加拿大华人** | 中文为主，英文专有名词可保留 | H1 中文；副标题可放英文产品名 |
| **Mobile First** | 手机是默认场景 | 输入字号 ≥ 16px；结果纵向可读；无横向滚动表 |
| **SEO First** | 每个工具是独立落地页 | 独立 title / description / canonical / FAQ |
| **Component Reuse** | 同一套骨架服务所有工具 | 必须使用 `components/tools/*` Universal Template |

### 1.2 Why

用户常在手机上对比工资、语言成绩、移民分数、税务估算。工具页必须：

1. **3 秒内看懂怎么用**  
2. **结果可信且可核对推演过程**  
3. **底部有合规免责声明与更新日期**  

### 1.3 Best Practice

- 参考实现：`/tools/salary-calculator`（第一验证实现，不是规范本身）
- 视觉主色：**emerald（可信）+ slate（中性）**
- 不做深色模式优先；若未来加 dark mode，须单独评审

### 1.4 Anti-patterns（禁止）

- 娱乐 MBTI 风：过多 emoji、花哨徽章、保证类口号  
- 每个工具一套完全不同的配色与卡片风格  
- 结果只有一个数字、没有分项与 Calculation Details  
- 在 Hero 堆砌关键词影响可读性  
- 把领域专用名词写进 Universal 组件 API（如硬编码「年薪」「CLB」）  

---

## 2. Standard Page Structure

### 2.1 固定区块顺序（强制）

所有工具页 **从上到下** 必须按此顺序组织内容：

```
Hero
  ↓
Calculator（输入区）
  ↓
Result（结果区：Primary Result + Secondary Results）
  ↓
Calculation Details（本次输入与推演）
  ↓
Formula / Rules Summary（通用公式或评分规则摘要）
  ↓
Related Tools
  ↓
FAQ
  ↓
Disclaimer
  ↓
Last Updated
```

> **Why**  
> 固定顺序降低用户学习成本，也方便搜索引擎理解「工具 → 结果 → 说明 → 合规」信息架构。

### 2.2 各区块职责（领域无关）

| 区块 | 必须 | 职责 |
|------|------|------|
| Hero | 是 | 工具定位、H1、一句话价值、可选特点标签 |
| Calculator | 是 | 唯一主交互；收集 Input Data |
| Result | 是 | 展示 Result Data；**Primary Result** 高亮，其余为 Secondary |
| Calculation Details | 是 | 展示「本次输入 + 推演过程」，便于核对 |
| Formula / Rules | 是 | 与本次输入解耦的通用公式或规则摘要 |
| Related Tools | 是 | 交叉导流到其它工具 / 职业测试 |
| FAQ | 是 | 回答搜索意图与使用疑虑（≥ 5 条，建议 8–12） |
| Disclaimer | 是 | 合规免责；政策类工具必须更严格 |
| Last Updated | 是 | 规则或页面内容更新日期；政策工具务必显示 |

### 2.3 抽象数据模型

| 抽象名 | 含义 | 各工具示例 |
|--------|------|------------|
| **Input Data** | 用户输入 | 年薪/工时；IELTS 分；年龄/学历；收入区间 |
| **Result Data** | 标准化输出集合 | 时薪/周薪；CLB 等级；CRS / EOI 分；税额 |
| **Primary Result** | 当前模式最应强调的一项 | 年薪→时薪时突出时薪；CLB 总等级；CRS 总分 |
| **Secondary Results** | 其它分项 | 月薪、听说读写分、各因素得分 |
| **Calculation Details** | 本次推演 | 算式字符串、分项加减、对照表命中行 |
| **Formula / Rules Summary** | 通用说明 | 工资公式；CLB 对照说明；EOI 评分摘要 |

### 2.4 Best Practice

- **桌面**：Calculator 与 Result 可左右双栏（`lg:grid-cols-2`）  
- **手机**：单栏，Calculator 在上、Result 紧随其后  
- Calculation Details 紧贴 Result 下方  
- Formula / FAQ / Related Tools / Disclaimer 使用较窄阅读宽度（约 `max-w-3xl`）  

---

## 3. Design Tokens

### 3.1 Why

Token 保证「换工具不换品牌感」。与 `app/globals.css` 中的 shadcn 变量共存。

### 3.2 颜色

| Token | 用途 | 推荐 Tailwind / 值 |
|-------|------|-------------------|
| **主色 Primary** | 主按钮、选中态、强调链接 | `emerald-700` / hover `emerald-800` |
| **主色浅底** | Primary Result 高亮卡 | `emerald-50`、`emerald-50/80`，边框 `emerald-300` |
| **成功 / 强调文字** | 高亮结果标签 | `emerald-700`、`emerald-900` |
| **中性文字** | 正文 / 次要说明 | `slate-900` / `slate-600` / `slate-500` |
| **背景** | 页面底 | `from-slate-50 to-white` 轻渐变，或纯白 |
| **卡片** | 计算器、结果、FAQ | `bg-white`，边框 `border-slate-200` |
| **警告** | 校验错误、提示条 | `amber-50` 底 + `amber-200` 边 + `amber-900` 字 |
| **破坏性** | 危险操作（工具页慎用） | 复用 shadcn `destructive` |

### 3.3 表面与形状

| Token | 规范 |
|-------|------|
| **Card** | `rounded-2xl border border-slate-200 bg-white shadow-sm` |
| **内层结果卡** | `rounded-xl border … px-4 py-3` |
| **Button** | 主按钮：`bg-emerald-700 text-white`；次按钮：`outline` |
| **Border** | 默认 `border-slate-200`；聚焦环 `ring-emerald-500/40` |
| **Radius** | 大卡片 `rounded-2xl`；控件 `rounded-xl` / `rounded-lg` |
| **Shadow** | 仅 `shadow-sm`；禁止多层大阴影 |

### 3.4 布局宽度

| 场景 | 宽度 |
|------|------|
| 工具页外壳 | `max-w-6xl`（约 1152px） |
| 长文阅读（Formula / FAQ / Disclaimer） | `max-w-3xl` |
| 页边距 | `px-4 sm:px-6`，纵向 `py-10 sm:py-14` |

### 3.5 Best Practice

- 优先用 Tailwind 工具类表达 token  
- 主题级变更先改本规范再改 Universal 组件，禁止「只改某一个工具页」  

---

## 4. Typography

### 4.1 层级

| 层级 | 用途 | 推荐样式 |
|------|------|----------|
| **H1** | 工具正式中文名（每页唯一） | `text-3xl sm:text-4xl font-bold tracking-tight text-slate-900` |
| **英文辅助标题** | 产品英文名 / SEO 辅助 | `text-sm font-medium tracking-wide text-emerald-700`（置于 H1 上方） |
| **H2** | 区块标题 | `text-xl sm:text-2xl font-semibold text-slate-900` |
| **H3 / Card Title** | 面板内标题 | `text-lg sm:text-xl font-semibold` |
| **Body** | 介绍与说明 | Hero：`text-base sm:text-lg`；正文：`text-sm leading-relaxed text-slate-600/700` |
| **Small** | 提示、标签、Last Updated | `text-xs text-slate-500` |
| **结果数值** | 金额 / 分数 / 等级 | `text-lg sm:text-xl font-semibold tracking-tight` |

### 4.2 Best Practice

- 每页 **仅一个 H1**  
- 不要用颜色代替字号层级  
- 金额类格式化放在 `lib/<domain>/format.ts`；分数/等级同理，勿写进 Universal 组件  

### 4.3 Example（结构示意，非 Salary 专属）

```text
{English Product Name}     ← 英文辅助
{中文工具名}                ← H1
{一句话价值说明}            ← Body
```

---

## 5. Responsive Rules

### 5.1 断点约定（Tailwind）

| 设备 | 断点 | 布局 |
|------|------|------|
| **手机** | `< sm` | 单栏；模式切换全宽；结果卡片 1 列 |
| **平板** | `sm`–`lg` | 结果可 2 列网格；避免复杂三栏 |
| **桌面** | `≥ lg` | Calculator \| Result 双栏；阅读区居中窄宽 |

### 5.2 手机强制规则

1. 输入框 `text-base`（≥ 16px），避免 iOS 聚焦缩放  
2. 结果区禁止依赖横向滚动的宽表  
3. 触控目标高度建议 ≥ 40px（`h-10` / `h-11`）  
4. 快捷 chips 可换行（`flex-wrap`）  

### 5.3 桌面最佳实践

- 左输入、右结果，减少滚动才能看到结果  
- 按当前模式高亮 **Primary Result**  

### 5.4 Why

目标用户大量使用手机查询；桌面双栏是增强，不是默认假设。

---

## 6. Universal Tool Template

组件位于 `components/tools/`。新工具必须组装这些组件，而不是复制整页。

### 6.1 组件清单与职责

| 组件文件 | 导出名 | 职责 |
|----------|--------|------|
| `tool-layout.tsx` | `ToolLayout` | 页面外壳：背景渐变 + `max-w-6xl` 内容列 |
| `tool-hero.tsx` | `ToolHero` | Hero：eyebrow / H1 / description / features |
| `calculator-panel.tsx` | `CalculatorPanel` | 输入区外层卡片（标题 + description + children） |
| `result-panel.tsx` | `ResultPanel` | 结果区外壳：标题、错误 `role="alert"`、Primary/Secondary 插槽、操作按钮 |
| `result-card.tsx` | `ResultCard` | 单项 Result Data；`highlighted` = Primary Result |
| `calculation-details.tsx` | `CalculationDetails` | 本次推演：label/value 行 + 可选算式字符串 |
| `formula-section.tsx` | `FormulaSection` | 通用公式 / 规则摘要（与本次输入解耦） |
| `related-tools.tsx` | `RelatedTools` | Related Tools 区块；内部使用 `ToolCard` |
| `tool-card.tsx` | `ToolCard` | 单个工具入口 / Coming Soon |
| `faq-section.tsx` | `FaqSection` | 可访问的折叠 FAQ |
| `disclaimer.tsx` | `Disclaimer` | 免责声明容器 |
| `last-updated.tsx` | `LastUpdated` | 内容/规则更新日期与可选来源链接 |

兼容层：`calculator-layout.tsx` 重新导出 `CalculatorPanel`（旧名 `CalculatorLayout`），新代码请直接用 `CalculatorPanel`。

### 6.2 领域特有客户端组件

| 模式 | 放置 | 示例 |
|------|------|------|
| 工具特有表单与状态 | `components/tools/<tool>-calculator.tsx` | `salary-calculator.tsx` |
| 纯算法 | `lib/<domain>/` | `lib/salary/calculator.ts` |

领域客户端组件 **只调用** `lib/` 纯函数，并把 Result Data 填入 `ResultPanel` / `ResultCard` / `CalculationDetails`。

### 6.3 Why

共用组件保证：改一处边距/圆角，全部工具同步。

### 6.4 Best Practice

- Server Component 优先；仅表单交互使用 `"use client"`  
- 算法不得进入 Universal 展示组件（见 `DEVELOPMENT_RULES.md`）  
- Universal 组件 API 使用抽象词：`title`、`rows`、`formulas`、`tools`，不用领域词  

### 6.5 Example（页面组装）

```tsx
<ToolLayout>
  <ToolHero eyebrow="…" title="…" description="…" features={[…]} />
  <DomainCalculator /> {/* CalculatorPanel + ResultPanel + CalculationDetails */}
  <FormulaSection formulas={[…]} notes={[…]} />
  <RelatedTools tools={[…]} />
  <FaqSection items={[…]} />
  <Disclaimer>…</Disclaimer>
  <LastUpdated date="YYYY-MM-DD" />
</ToolLayout>
```

---

## 7. SEO Standards

与 [`AI_CONTEXT.md`](./AI_CONTEXT.md)「SEO 原则」一致，此处固化为工具页清单。

### 7.1 每个工具页必须具备

| 项 | 要求 |
|----|------|
| **Title** | `{中文工具名} \| {英文辅助名}`，可读、含核心意图 |
| **Description** | 1–2 句，含使用场景与价值，忌堆砌 |
| **H1** | 与用户可见主标题一致，中文 |
| **Canonical** | 指向正式路径，如 `/tools/<tool-slug>` |
| **Open Graph** | title / description / url 与页面一致 |
| **FAQ** | 页面可见 FAQ；结构化数据待内容稳定后再加 |
| **Breadcrumb** | 建议未来统一：`首页 > 工具 > 本工具` |
| **Structured Data** | FAQ / SoftwareApplication 等须在内容审核后再加 |

### 7.2 Why

工具页靠长尾搜索获客。SEO 字段错误会导致重复页面或错误摘要。

### 7.3 Best Practice

- metadata 放在 `app/tools/<tool>/layout.tsx` 或 `page.tsx` 的 `export const metadata`  
- 正文自然出现关键词，禁止 Hero 关键词堆砌  
- 不在未确认前大改根 `app/layout.tsx`  

---

## 8. Related Tools Rules

### 8.1 强制规则

1. **每个工具页必须展示 Related Tools 区块**（使用 `RelatedTools`）  
2. 至少推荐 **2** 个相关入口（可为「即将推出」）  
3. 已上线工具使用真实 `href`；未上线使用 `comingSoon`，**不得伪造可点路由**  
4. 可额外推荐职业测试入口，文案需标明「职业方向参考」  

### 8.2 Why

免费工具互相导流，拉长访问路径，并为职业导航输送用户。

### 8.3 Best Practice

- 推荐逻辑：同一用户旅程相邻工具（工资 → CLB → OINP / CRS → Tax / EI）  
- Coming Soon 卡片保持 `aria-disabled` 语义  

---

## 9. Accessibility

### 9.1 清单（强制）

| 项 | 要求 |
|----|------|
| **Label** | 每个输入有可见 `<label htmlFor>` |
| **Keyboard** | Tabs / 模式切换可用键盘；焦点顺序合理 |
| **Focus** | 可见 `focus-visible` 环 |
| **ARIA** | 错误用 `role="alert"`；Tab 用 `role="tablist/tab"` + `aria-selected` |
| **颜色对比** | 正文与背景可读；不只靠颜色表达对错 |
| **动态结果** | 结果更新应能被辅助技术感知 |

### 9.2 Why

计算器含表单与实时结果，无障碍缺陷会直接导致无法完成任务。

### 9.3 Best Practice

- 错误文案用中文完整句  
- 禁用状态同时提供文字说明（如「即将推出」徽章）  

---

## 10. Future Expansion

### 10.1 新增工具检查清单

1. 在 `docs/DECISIONS.md` / `TODO.md` 确认产品优先级  
2. 在 `lib/<domain>/` 实现纯函数算法与类型（政策规则单独文件）  
3. 在 `components/tools/` **复用 Universal Template**；仅新增该工具特有客户端组件  
4. 在 `app/tools/<name>/` 建路由与 metadata  
5. 按本文 **§2 页面结构** 用 `ToolLayout` 等组装  
6. 填 FAQ、Disclaimer、Last Updated、Related Tools  
7. 更新 `CHANGELOG` / `TODO` / `ARCHITECTURE`  
8. 跑 lint + build  

### 10.2 政策类工具额外要求

见 [`DECISIONS.md`](./DECISIONS.md) Decision 005 / 006 与 [`AI_CONTEXT.md`](./AI_CONTEXT.md)：

- 官方来源链接（可挂在 `LastUpdated`）  
- 规则生效 / 更新日期  
- 资格与分数区分（如 OINP）  
- 未核实规则前不得上线正式算法  

### 10.3 Example：工具映射

| 工具 | 路由 | 状态 | 算法目录 | Primary Result 示例 |
|------|------|------|----------|---------------------|
| Salary | `/tools/salary-calculator` | ✅ 已上线 | `lib/salary/` | 时薪或年薪 |
| CLB | `/tools/clb-calculator` | ✅ 已上线 | `lib/clb/` | 综合 CLB 等级 |
| OINP / OWP EOI | `/tools/oinp-eoi-calculator` | ✅ 已上线 | `lib/oinp/` | EOI 总分 |
| CRS | `/tools/crs-calculator` | 规划中 | 未来 `lib/crs/` | CRS 总分 |
| Tax | `/tools/tax-calculator` | 规划中 | 未来 `lib/tax/` | 估算税额 / 净收入 |
| EI | `/tools/ei-calculator` | 规划中 | 未来 `lib/ei/` | 估算周给付 |

全站导航与平台首页见 [`ARCHITECTURE.md`](./ARCHITECTURE.md)。工具列表 SSOT：`lib/tools/catalog.ts`（hub / home / Career Test related；计算器页内 Related 数组迁移推迟）。

---

## 11. Domain Mapping Examples

说明抽象概念如何落到各工具（**规范用语保持抽象；下表仅为映射示例**）。

| 抽象 | Salary | CLB | CRS / EOI | Tax / EI |
|------|--------|-----|-----------|----------|
| Input Data | 年薪或时薪、工时、周数 | 考试类型与分项分 | 年龄、语言、工作等 | 收入、省份、周数 |
| Primary Result | 时薪或年薪（随模式） | 综合 CLB | 总分 | 主估算金额 |
| Secondary Results | 周/双周/月薪 | 听说读写 CLB | 各因素得分 | 分项扣款/给付 |
| Calculation Details | 本次算式 | 对照表命中说明 | 分项加减过程 | 税率/公式推演 |
| Formula / Rules | 通用换算公式 | 考试→CLB 规则摘要 | 评分规则摘要 | 税制/EI 规则摘要 |

---

## 修订记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-07-29 | 1.0 | 首版；以 Salary Calculator V2.1 为参考实现 |
| 2026-07-29 | 1.0.1 | 审阅：补充权威说明与 Salary Last Updated 差距 |
| 2026-07-29 | 1.1 | V2.2.1：落地 Universal Tool Template；抽象为 Tool 级术语（Primary Result / Result Data / Calculation Details） |
| 2026-08-02 | 1.1.1 | P5.7A：§10.3 标注 Salary/CLB/OWP 已上线；引用 catalog SSOT |
