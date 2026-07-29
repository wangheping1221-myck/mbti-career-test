# AI Development Context

所有参与本项目的 AI 编程助手，在修改代码前必须阅读本文件。

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

- 职业性格测试
- 职业推荐算法 V1
- 测试结果页面
- 本地高级报告解锁逻辑
- **Salary Calculator**（`/tools/salary-calculator`，V2.1）

修改代码前必须检查项目当前真实结构，不得根据本文件猜测文件名称。

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

平台化进行中。第一批工具进度：

1. ~~Salary Calculator~~ → **已完成（V2.1）**
2. CLB Calculator → 待做
3. OINP EOI Calculator → 待做

## 推荐路由规划

- `/`：新版平台首页
- `/tools`：工具中心
- `/tools/salary-calculator`
- `/tools/clb-calculator`
- `/tools/oinp-eoi-calculator`
- `/career-test`：现有职业导航测试
- `/about`
- `/blog`

以上只是规划。未经确认，不得直接移动现有首页或修改已有路由。

## 编码原则

完整工程规范见 [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)。此处仅列速查：

1. 严格 TypeScript；避免 `any`
2. Server Component 优先；需要时再 `"use client"`
3. 计算逻辑与 UI 分离；规则数据与算法分离
4. 复用 `components/tools/*`；遵循 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md)
5. 不得破坏现有职业测试逻辑
6. 修改前检查真实文件；修改后 lint + build
7. 不自动 commit / push；等待确认

## 推荐目录规划

以 [`ARCHITECTURE.md`](./ARCHITECTURE.md) 的真实结构为准。规划示意：

```
app/tools/          # 工具路由（salary-calculator 已存在）
app/career-test/    # 规划中，未建勿擅自创建
components/tools/   # 工具共用 UI
lib/salary|clb|oinp/
docs/               # 含 TOOL_DESIGN_SYSTEM、DEVELOPMENT_RULES 等
```

不要为了匹配规划而盲目移动当前文件。

## 政策数据原则

所有政策相关数据应优先使用加拿大联邦或省政府官方来源。

不得使用以下方式确定规则：

- 根据记忆填写
- 根据搜索摘要填写
- 根据移民中介文章填写
- 根据短视频或社交媒体填写
- 让 AI 自行推测

## OINP 工具特别要求

开发前必须明确：

- 支持哪个 OINP stream
- 当前规则生效日期
- 申请资格与 EOI 得分的区别
- 工资如何换算
- 不同字段的评分逻辑
- 是否存在条件依赖
- 官方来源地址

未核实规则前，只允许搭建 UI，不允许完成正式评分算法。

## CLB 工具特别要求

必须明确区分不同考试：

- IELTS General Training
- CELPIP General
- PTE Core
- TEF Canada
- TCF Canada

不得把 IELTS Academic 与 Express Entry 使用的 IELTS General Training 混淆。

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
