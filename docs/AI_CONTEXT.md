# AI Development Context

所有参与本项目的 AI 编程助手，在修改代码前必须阅读本文件。

**文档同步**：P5.7A（2026-08-02）— 与 tag `p5.6-complete` @ `536ea18` 对齐。

## 项目名称

Career Navigator Canada

## 原项目名称

MBTI Career Test

## 项目定位

面向加拿大华人、新移民、留学生和工签持有人的职业导航与实用工具平台。

## 当前技术栈

- Next.js 15
- App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- pnpm
- Vercel

## 本地运行

Windows 环境优先使用：

pnpm.cmd dev

默认本地地址：

http://localhost:3000

## 当前已有功能

- **平台首页**（`/` → `PlatformHome`）
- **职业方向测试**（`/career-test` → `CareerTestFlow`：intro / quiz / results / unlock）
- 职业推荐算法 V1 + Top 5 结果
- 高级报告解锁（`/api/verify-unlock` + localStorage；旧链 `/?unlock=` 临时重定向到 `/career-test?unlock=`）
- 共享导航：Home / Career Test / Tools（`components/site/*`）
- **Tools hub**（`/tools`，SSOT：`lib/tools/catalog.ts`）
- **Salary Calculator**（`/tools/salary-calculator`，V2.1）
- **Universal Tool Template**（`components/tools/*`，V2.2.1）
- **CLB Calculator**（`/tools/clb-calculator`，V2.3）
- **OINP / OWP EOI Calculator**（`/tools/oinp-eoi-calculator` UI + `lib/oinp` 引擎，V2.4）
- Career Test 结果页 Related Tools（`getRelatedTools()`）

修改代码前必须检查项目当前真实结构，不得根据本文件猜测文件名称。

## 稳定检查点

| Tag | 含义 |
|-----|------|
| `p5.5-complete` | 结果页 Related Tools 等平台化增量 |
| **`p5.6-complete`** | **当前稳定检查点**：Career Test 路由迁至 `/career-test` |

**不得擅自撤销 P5.6 路由拓扑**（勿把 Career Test 迁回 `/`，勿切断 `/career-test`）。

## 必读规范（权威文档）

| 主题 | 以何为准 |
|------|----------|
| 工具页 UI / 页面结构 / Token | [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md) |
| 工程分层、Git、质量门禁、AI 协作流程（完整版） | [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) |
| 真实目录与路由状态 | [`ARCHITECTURE.md`](./ARCHITECTURE.md) |
| 产品阶段与优先级 | [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md) + [`TODO.md`](./TODO.md) |
| 单次产品/技术决策 | [`DECISIONS.md`](./DECISIONS.md) |

本文件是 **AI 开工前的短上下文**。若与上表冲突，以对应权威文档为准，并应回写修正本文件过时段落。

## 当前开发目标

平台化 **P5.2–P5.6 已完成**（导航 → Tools hub → 平台首页 → 结果页交叉链接 → `/career-test` 切流）。

第一批工具：

1. ~~Salary Calculator~~ → **已完成（V2.1）**
2. ~~Universal Tool Template~~ → **已完成（V2.2.1）**
3. ~~CLB Calculator~~ → **已完成（V2.3）**
4. ~~OINP / OWP EOI Calculator~~ → **已完成（V2.4 UI + 引擎）**

进行中 / 下一步：

- **P5.7**：文档同步（本阶段 A）+ 最小 SEO 基建（sitemap / robots / 共享 SITE_URL，阶段 B，待批准后实施）
- 后续：CRS / Tax / EI 等第二批工具（见路线图）；未开始

## 正式路由（已上线）

| 路由 | 说明 |
|------|------|
| `/` | 平台首页（`PlatformHome` only） |
| `/career-test` | 职业测试 SPA |
| `/tools` | 工具中心 |
| `/tools/salary-calculator` | 年薪 / 时薪 |
| `/tools/clb-calculator` | IELTS GT → CLB |
| `/tools/oinp-eoi-calculator` | 安省 OWP EOI |
| `/api/verify-unlock` | 解锁码校验 |

规划中（未建）：`/about`、`/blog` 等。

**未跟踪材料不是产品 SSOT**：本地可能存在 `app/canada-career-test/`、`components/landing/`、`marketing/` 及历史 PRD/研究文档；勿当作已发布架构，勿在未经批准时入库或删除。脏本地构建若含未跟踪 App Router 目录可能生成额外路由——部署应以 git 干净克隆为准。

## 编码原则

完整工程规范见 [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)。此处仅列速查：

1. 严格 TypeScript；避免 `any`
2. Server Component 优先；需要时再 `"use client"`
3. 计算逻辑与 UI 分离；规则数据与算法分离
4. 复用 `components/tools/*`；遵循 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md)
5. 不得破坏现有职业测试逻辑、评分、解锁与 OWP HV 表
6. 修改前检查真实文件；修改后 lint + build
7. 不自动 commit / push；等待确认

## 推荐目录（真实）

以 [`ARCHITECTURE.md`](./ARCHITECTURE.md) 为准。示意：

```
app/page.tsx              # 平台首页 + unlock 兼容重定向
app/career-test/          # 职业测试路由（已建立）
app/tools/                # hub + salary / clb / oinp-eoi
components/site/          # 共享 Header / Footer / nav
components/home/          # PlatformHome
components/career-test/   # CareerTestFlow
components/tools/         # Universal Tool Template
lib/tools/catalog.ts      # 工具目录 SSOT（hub / home / CT related）
lib/salary|clb|oinp/
docs/
```

## 政策数据原则

所有政策相关数据应优先使用加拿大联邦或省政府官方来源。

不得使用以下方式确定规则：

- 根据记忆填写
- 根据搜索摘要填写
- 根据移民中介文章填写
- 根据短视频或社交媒体填写
- 让 AI 自行推测

## OINP / OWP 工具特别要求

现行产品：**Ontario Workforce Priority（OWP）Job Offer 路径**（非已关闭的旧 EJO 多流）。

开发 / 改 UI 前必须明确：

- 仅 Job Offer MVP；医师路径不在 MVP
- 评分仅经 `calculateOwpEoi`；UI 提交 **verified option IDs**（`OwpScoringInput`）
- **不得改 HV 表分值 / ID**；不得在组件内硬编码分数
- 得分 ≠ 申请资格 ≠ 获邀保证
- 不得做城市→地区、职业标题→NOC、自由文本学历推断
- 官方来源：Ontario.ca OWP Scoring factors；Portal 状态以 Updates 为准

工具页已上线：`/tools/oinp-eoi-calculator`。

## CLB 工具特别要求

必须明确区分不同考试：

- IELTS General Training
- CELPIP General
- PTE Core
- TEF Canada
- TCF Canada

不得把 IELTS Academic 与 Express Entry 使用的 IELTS General Training 混淆。

当前实现仅支持 **IELTS General Training**。

## Salary Calculator 公式原则

默认（可自定义每周小时数与每年周数，默认周数 52）：

时薪 = 年薪 ÷ 每周工作小时数 ÷ 每年工作周数

年薪 = 时薪 × 每周工作小时数 × 每年工作周数

实现位置：`lib/salary/calculator.ts`（禁止把公式写回 `page.tsx`）。

必须向用户说明：

- 结果为税前估算
- 不包含加班费
- 不代表实际到手收入
- Bonus、佣金、无薪假等会影响实际结果

## SEO 原则

工具页 SEO 完整清单以 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md) §7 为准。最低要求：独立 title / description / canonical / Open Graph / H1 / FAQ / 相关工具 / 规则更新时间；结构化数据须内容稳定后再加。

P5.7B 计划补充共享 `SITE_URL`、sitemap、robots（**尚未实施**；勿在本文件假设已存在）。

## 合规原则

不得使用以下宣传：

- 保证获邀
- 保证 PR
- 官方预测
- 100% 准确
- 保证符合资格

建议免责声明：

“本工具根据公开信息提供估算结果，仅供一般信息参考，不构成移民、法律、税务或就业建议。政策可能随时调整，最终资格、分数和申请结果以加拿大政府及相关省级部门的正式审核为准。”

## 修改流程

完整版见 [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) §12。摘要：

1. 阅读本文件 + 相关权威规范
2. 检查现有项目结构
3. 列出将修改的文件
4. 最小必要修改
5. lint + production build
6. 更新 CHANGELOG / TODO（必要时 ROADMAP / ARCHITECTURE）
7. 汇报结果；**不自动 commit / push**；等待确认
