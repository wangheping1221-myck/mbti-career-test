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

修改代码前必须检查项目当前真实结构，不得根据本文件猜测文件名称。

## 当前开发目标

将网站升级为平台型网站，并增加：

1. Salary Calculator
2. CLB Calculator
3. OINP EOI Calculator

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

1. 使用严格 TypeScript 类型。
2. 不使用 `any`，除非有明确理由。
3. Server Component 优先。
4. 只有需要状态或浏览器 API 的组件才使用 `"use client"`。
5. 计算逻辑与 UI 分离。
6. 规则数据与算法分离。
7. 公共组件应复用。
8. 保持组件职责单一。
9. 所有表单必须适配手机端。
10. 所有输入必须有合理校验。
11. 计算结果应提供详细分项。
12. 不得破坏现有职业测试逻辑。
13. 修改前先检查相关文件。
14. 修改后运行 lint 和 build。

## 推荐目录规划

app/
  tools/
  career-test/

components/
  tools/
  calculators/

lib/
  calculators/
  oinp/
  clb/
  salary/

docs/
  PROJECT_ROADMAP.md
  CHANGELOG.md
  TODO.md
  DECISIONS.md
  AI_CONTEXT.md

不要为了匹配规划而盲目移动当前文件，应先检查实际项目结构。

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

默认公式：

时薪 = 年薪 ÷ 每周工作小时数 ÷ 52

年薪 = 时薪 × 每周工作小时数 × 52

默认每年 52 周，但允许用户自定义每周小时数。

必须向用户说明：

- 结果为税前估算
- 不包含加班费
- 不代表实际到手收入
- Bonus、佣金、无薪假等会影响实际结果

## SEO 原则

每个工具页面都应有：

- 独立 title
- 独立 description
- canonical
- Open Graph
- 清晰的 H1
- 工具说明
- FAQ
- 相关工具入口
- 规则更新时间
- 结构化数据应在确认内容后再添加

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

每次开发任务应遵循：

1. 阅读 AI_CONTEXT.md
2. 检查现有项目结构
3. 说明准备修改哪些文件
4. 实施最小必要修改
5. 运行 TypeScript 检查
6. 运行 lint
7. 运行 production build
8. 更新 CHANGELOG.md
9. 更新 TODO.md
10. 汇报修改结果及遗留问题
