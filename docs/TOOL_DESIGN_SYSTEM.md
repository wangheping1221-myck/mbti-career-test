# Career Navigator Canada — 工具设计规范（Tool Design System）

**版本**：1.0  
**生效日期**：2026-07-29  
**适用范围**：所有 `/tools/*` 工具页面（Salary、CLB、OINP、CRS、EI、Tax 等）  
**相关文档**：

- 架构说明 → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 开发规范 → [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)
- AI 协作上下文 → [`AI_CONTEXT.md`](./AI_CONTEXT.md)
- 产品原则 → [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md)
- 合规决策 → [`DECISIONS.md`](./DECISIONS.md)（Decision 005）

> **Why（为什么）**  
> 工具页是自然搜索流量的主要入口。若每个计算器视觉与结构不一致，用户信任度下降，SEO 与组件复用成本上升。本规范以 **V2.1 Salary Calculator** 为第一参考实现，后续工具在此基础上扩展，而不是各自发明一套 UI。

### 文档权威说明

- **本文件**负责：工具页 UI、信息架构、Token、SEO 展示清单、无障碍。
- **工程分层 / Git / AI 流程** → [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)
- **真实目录是否已建** → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **产品优先级** → [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md)

已知差距（不阻塞新工具开发，但应排期补齐）：

- Salary V2.1 尚未单独渲染 **Last Updated**（本规范 §2 要求有）；见 `TODO.md`。

---

## 目录

1. [Design Philosophy](#1-design-philosophy)
2. [Standard Page Structure](#2-standard-page-structure)
3. [Design Tokens](#3-design-tokens)
4. [Typography](#4-typography)
5. [Responsive Rules](#5-responsive-rules)
6. [Common Components](#6-common-components)
7. [SEO Standards](#7-seo-standards)
8. [Related Tools Rules](#8-related-tools-rules)
9. [Accessibility](#9-accessibility)
10. [Future Expansion](#10-future-expansion)

---

## 1. Design Philosophy

### 1.1 核心原则

| 原则 | 含义 | 实践要求 |
|------|------|----------|
| **简洁** | 一屏一事，减少装饰噪音 | 不使用夸张插画、霓虹渐变、多阴影堆叠 |
| **专业** | 像可信赖的加拿大实用工具，而非娱乐测验 | 文案克制；禁止「保证获邀 / 保证找到工作」 |
| **面向加拿大华人** | 中文为主，英文职业名/专有名词可保留 | H1 中文；副标题可放英文产品名 |
| **Mobile First** | 手机是默认场景 | 输入字号 ≥ 16px；结果纵向可读；无横向滚动表 |
| **SEO First** | 每个工具是独立落地页 | 独立 title / description / canonical / FAQ |
| **Component Reuse** | 同一套骨架服务所有工具 | 优先 `components/tools/*`，禁止复制粘贴整页 |

### 1.2 Why

华人新移民用户常在手机上对比工资、语言成绩、移民分数。工具页必须：

1. **3 秒内看懂怎么用**  
2. **结果可信且可核对计算过程**  
3. **底部有合规免责声明**  

### 1.3 Best Practice

- 参考实现：`/tools/salary-calculator`
- 视觉主色沿用站点已验证的 **emerald（可信）+ slate（中性）**
- 不做深色模式优先；若未来加 dark mode，须单独评审

### 1.4 Anti-patterns（禁止）

- 娱乐 MBTI 风：过多 emoji、花哨徽章、保证类口号  
- 每个工具一套完全不同的配色与卡片风格  
- 结果只有一个数字、没有分项与公式说明  
- 在 Hero 堆砌关键词影响可读性  

---

## 2. Standard Page Structure

### 2.1 固定区块顺序（强制）

所有工具页 **从上到下** 必须按此顺序组织内容：

```
Hero
  ↓
Calculator（输入区）
  ↓
Result（结果区）
  ↓
Calculation Details（计算过程 / 分项明细）
  ↓
Formula（公式说明；政策工具可为「评分规则摘要」）
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
> 固定顺序降低用户学习成本，也方便搜索引擎理解「工具 → 结果 → 说明 → 合规」信息架构。Salary 页已验证该顺序在手机与桌面均可用。

### 2.2 各区块职责

| 区块 | 必须 | 职责 |
|------|------|------|
| Hero | 是 | 品牌定位、H1、一句话价值、3 个短特点（可选） |
| Calculator | 是 | 唯一主交互；收集输入并触发计算 |
| Result | 是 | 展示标准化结果；突出主结果 |
| Calculation Details | 是 | 展示「本次输入 + 推演过程」，便于核对 |
| Formula | 是 | 通用公式或规则摘要（与本次输入解耦） |
| Related Tools | 是 | 交叉导流到其它工具 / 职业测试 |
| FAQ | 是 | 回答搜索意图与使用疑虑（≥ 5 条，建议 8–12） |
| Disclaimer | 是 | 合规免责；政策工具必须更严格 |
| Last Updated | 是 | 规则或页面内容更新日期；政策工具务必显示 |

### 2.3 Best Practice

- **桌面**：Calculator 与 Result 可左右双栏（`lg:grid-cols-2`）  
- **手机**：单栏，Calculator 在上、Result 紧随其后  
- Calculation Details 可紧贴 Result，或作为 Result 下方第二节  
- Formula / FAQ / Related Tools / Disclaimer 使用较窄阅读宽度（约 `max-w-3xl`）提升可读性  

### 2.4 Example（Salary 映射）

| 规范区块 | Salary 实现位置（概念） |
|----------|-------------------------|
| Hero | 页面顶部标题与特点标签 |
| Calculator | `SalaryCalculator` 左栏输入 |
| Result | 右栏结果卡片网格 |
| Calculation Details | 「计算过程」段落与算式 |
| Formula | 「计算公式」静态说明 |
| Related Tools | CLB / OINP「即将推出」卡片 |
| FAQ | `FaqSection` |
| Disclaimer | 页脚免责声明 |
| Last Updated | **待补齐**：后续工具必须带；Salary 应在迭代中补上 |

> 注：Salary V2.1 若尚未单独渲染 Last Updated，后续小改应补上，以符合本规范。新工具上线时不得省略。

---

## 3. Design Tokens

### 3.1 Why

Token 保证「换工具不换品牌感」。以下数值对齐当前实现中已使用的 Tailwind / 视觉习惯，并与 `app/globals.css` 中的 shadcn 变量共存。

### 3.2 颜色

| Token | 用途 | 推荐 Tailwind / 值 |
|-------|------|-------------------|
| **主色 Primary** | 主按钮、选中态、强调链接 | `emerald-700` / hover `emerald-800` |
| **主色浅底** | 高亮结果卡、轻量强调背景 | `emerald-50`、`emerald-50/80`，边框 `emerald-300` |
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
| 工具页外壳 | `max-w-6xl`（约 1152px，符合 1100–1200px 要求） |
| 长文阅读（Formula / FAQ / Disclaimer） | `max-w-3xl` |
| 页边距 | `px-4 sm:px-6`，纵向 `py-10 sm:py-14` |

### 3.5 Best Practice

- 优先用 Tailwind 工具类表达 token，避免每个工具新建 CSS 文件  
- 需要主题级变更时，先改本规范再改组件，禁止「只改某一个工具页」  

---

## 4. Typography

### 4.1 层级

| 层级 | 用途 | 推荐样式 |
|------|------|----------|
| **H1** | 工具正式中文名（每页唯一） | `text-3xl sm:text-4xl font-bold tracking-tight text-slate-900` |
| **英文辅助标题** | 产品英文名 / SEO 辅助 | `text-sm font-medium tracking-wide text-emerald-700`（置于 H1 上方） |
| **H2** | 区块标题（计算公式、FAQ、相关工具） | `text-xl sm:text-2xl font-semibold text-slate-900` |
| **H3 / Card Title** | 计算器卡片内标题 | `text-lg sm:text-xl font-semibold` |
| **Body** | 介绍与说明 | `text-base sm:text-lg`（Hero）；正文 `text-sm leading-relaxed text-slate-600/700` |
| **Small** | 提示、标签、免责附属 | `text-xs text-slate-500` |
| **结果数值** | 金额 / 分数 | `text-lg sm:text-xl font-semibold tracking-tight` |

### 4.2 Best Practice

- 每页 **仅一个 H1**  
- 不要用颜色代替字号层级  
- 金额使用 `en-CA` + `CAD` 的 `Intl.NumberFormat`（见 Salary `lib/salary/format.ts`）  

### 4.3 Example

```text
Salary Calculator Canada          ← 英文辅助
加拿大年薪 / 时薪转换器            ← H1
快速将年薪转换为时薪…              ← Body
```

---

## 5. Responsive Rules

### 5.1 断点约定（Tailwind）

| 设备 | 断点 | 布局 |
|------|------|------|
| **手机** | `< sm` | 单栏；模式切换用全宽 segmented control；结果卡片 1 列 |
| **平板** | `sm`–`lg` | 结果可 2 列网格；仍避免复杂三栏 |
| **桌面** | `≥ lg` | Calculator \| Result 双栏；阅读区保持居中窄宽 |

### 5.2 手机强制规则

1. 输入框 `text-base`（≥ 16px），避免 iOS 聚焦缩放  
2. 结果区禁止依赖横向滚动的宽表  
3. 触控目标高度建议 ≥ 40px（`h-10` / `h-11`）  
4. 快捷 chips 可换行（`flex-wrap`）  

### 5.3 桌面最佳实践

- 左输入、右结果，减少滚动才能看到结果  
- 高亮主结果（年薪转时薪 → 突出时薪；反之突出年薪）  

### 5.4 Why

目标用户大量使用手机查询；桌面双栏是增强，不是默认假设。

---

## 6. Common Components

组件优先放在 `components/tools/`。已有实现应复用，而不是复制。

| 组件 | 现状（V2.1） | 职责 |
|------|--------------|------|
| **Hero** | 目前内联在 page | 标题、介绍、特点；未来可抽 `tool-hero.tsx` |
| **Calculator Layout** | `calculator-layout.tsx` | 输入区外层卡片（标题 + description + children） |
| **Input Panel** | 内嵌于各 `*-calculator.tsx` | 字段、模式切换、校验提示；可逐步抽 `input-field.tsx` |
| **Result Card** | `result-card.tsx` | 单结果项展示；支持 `highlighted` |
| **Calculation Steps** | 内联于 Salary 客户端 | 展示本次输入与算式字符串 |
| **FAQ Section** | `faq-section.tsx` | 可访问的折叠 FAQ |
| **Related Tools** | `tool-card.tsx` | 工具入口 / Coming Soon |
| **Disclaimer** | 目前内联在 page | 免责声明文案容器 |
| **Last Updated** | **待统一组件** | 显示规则/内容更新日期与可选来源链接 |
| **Tool Footer** | 可与 Disclaimer 合并 | 页脚合规区；未来可加「返回工具中心」 |

### 6.1 Why

共用组件保证：改一处边距/圆角，全部工具同步。

### 6.2 Best Practice

- Server Component 优先；仅表单交互使用 `"use client"`  
- 算法不得进入这些展示组件（见 `DEVELOPMENT_RULES.md`）  
- 新工具先查 `components/tools/README.md`，再决定是否新增组件  

### 6.3 Example

```tsx
// 页面组装（示意）
<Hero />
<SalaryCalculator />          // 内含 Calculator + Result + Details
<FormulaSection />
<RelatedTools />
<FaqSection items={...} />
<Disclaimer />
<LastUpdated date="2026-07-29" />
```

---

## 7. SEO Standards

与 [`AI_CONTEXT.md`](./AI_CONTEXT.md)「SEO 原则」一致，此处固化为工具页清单。

### 7.1 每个工具页必须具备

| 项 | 要求 |
|----|------|
| **Title** | `{中文工具名} \| {英文辅助名}`，可读、含核心意图 |
| **Description** | 1–2 句，含使用场景与免费/即时等价值，忌堆砌 |
| **H1** | 与用户可见主标题一致，中文 |
| **Canonical** | 指向正式路径，如 `/tools/salary-calculator` |
| **Open Graph** | title / description / url 与页面一致 |
| **FAQ** | 页面可见 FAQ；结构化数据待内容稳定后再加 |
| **Breadcrumb** | 建议未来统一：`首页 > 工具 > 本工具`（实现前可先在文案层体现） |
| **Structured Data** | FAQ / SoftwareApplication 等须在内容审核后再加，禁止空壳 JSON-LD |

### 7.2 Why

工具页靠长尾搜索获客（「年薪转时薪 加拿大」「CLB 换算」）。SEO 字段错误会导致重复页面或错误摘要。

### 7.3 Best Practice

- metadata 放在 `app/tools/<tool>/layout.tsx` 或同级 `page.tsx` 的 `export const metadata`  
- 正文自然出现关键词，禁止 Hero 关键词堆砌  
- 不在未确认前大改根 `app/layout.tsx` 的全局 title 策略  

### 7.4 Example（Salary）

```text
Title: 加拿大年薪时薪转换器 | Salary Calculator Canada
Canonical: https://mbti-career-test.vercel.app/tools/salary-calculator
H1: 加拿大年薪 / 时薪转换器
```

---

## 8. Related Tools Rules

### 8.1 强制规则

1. **每个工具页必须展示 Related Tools 区块**  
2. 至少推荐 **2** 个相关入口（可为「即将推出」）  
3. 已上线工具使用真实 `href`；未上线使用 `comingSoon`，**不得伪造可点路由**  
4. 可额外推荐职业测试入口（未来 `/career-test` 或当前 `/`），文案需标明「职业方向参考」  

### 8.2 Why

免费工具互相导流，拉长访问路径，并为职业导航输送用户。

### 8.3 Best Practice

- 使用 `ToolCard`  
- 推荐逻辑：同一用户旅程相邻工具（工资 → CLB → OINP）  
- Coming Soon 卡片保持可访问的 `aria-disabled` 语义，避免伪装成可点击链接  

---

## 9. Accessibility

### 9.1 清单（强制）

| 项 | 要求 |
|----|------|
| **Label** | 每个输入有可见 `<label htmlFor>` |
| **Keyboard** | Tabs / 模式切换可用键盘操作；焦点顺序合理 |
| **Focus** | 可见 `focus-visible` 环，勿 `outline-none` 后无替代 |
| **ARIA** | 错误用 `role="alert"`；Tab 用 `role="tablist/tab"` + `aria-selected` |
| **颜色对比** | 正文与背景达到可读对比；不只靠颜色表达对错 |
| **动态结果** | 结果更新应能被辅助技术感知（避免无提示的静默失败） |

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
3. 在 `components/tools/` 复用布局组件；仅新增该工具特有客户端组件  
4. 在 `app/tools/<name>/` 建路由与 metadata  
5. 按本文 **§2 页面结构** 组装  
6. 填 FAQ、Disclaimer、Last Updated、Related Tools  
7. 更新 `CHANGELOG` / `TODO` / `ARCHITECTURE`  
8. 跑 lint + build  

### 10.2 政策类工具额外要求

见 [`DECISIONS.md`](./DECISIONS.md) Decision 005 / 006 与 [`AI_CONTEXT.md`](./AI_CONTEXT.md)：

- 官方来源链接  
- 规则生效 / 更新日期  
- 资格与分数区分（如 OINP）  
- 未核实规则前不得上线正式算法  

### 10.3 Example：下一批工具

| 工具 | 路由（规划） | 算法目录 |
|------|--------------|----------|
| CLB | `/tools/clb-calculator` | `lib/clb/` |
| OINP EOI | `/tools/oinp-eoi-calculator` | `lib/oinp/` |
| CRS | `/tools/crs-calculator` | 未来 `lib/crs/` |

---

## 修订记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-07-29 | 1.0 | 首版；以 Salary Calculator V2.1 为参考实现 |
| 2026-07-29 | 1.0.1 | 审阅：补充权威说明与 Salary Last Updated 差距 |
