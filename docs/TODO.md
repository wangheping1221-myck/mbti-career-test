# 当前开发任务

最后更新：2026-07-30

## Priority 1：项目基础

- [x] 确定网站新定位
- [x] 确定第一批三个核心工具
- [x] 确定继续使用当前 Next.js 项目
- [x] 建立项目文档体系
- [x] 检查当前项目目录和现有页面
- [x] 确认现有职业测试首页结构（`app/page.tsx` 三合一）
- [x] 建立 Version 2 基础架构文档与空目录（`ARCHITECTURE.md` + tools/calculators 占位）
- [x] 建立 `TOOL_DESIGN_SYSTEM.md` 与 `DEVELOPMENT_RULES.md` 正式规范
- [ ] 制定 Version 2.0 页面迁移方案（首页 / career-test；待确认后执行）

## Priority 2：网站架构

- [x] 建立 `app/tools/`、`components/tools/`、`lib/calculators|salary|clb|oinp/` 目录占位
- [x] 实现 ToolCard / CalculatorLayout / ResultCard / FAQ 公共组件（Salary 页首用）
- [x] V2.2.1 落地 Universal Tool Template（ToolLayout / Hero / Panel / Formula / Related / Disclaimer / LastUpdated 等）
- [ ] 设计新版首页
- [ ] 创建 `/tools` 工具中心页面（目前仅空目录 + salary / clb 子路由）
- [ ] 规划并实施 `/career-test` 路由迁移（**禁止在未确认前执行**）
- [ ] 建立导航栏
- [ ] 建立页脚
- [x] 按 Design System 为工具页补齐统一 Last Updated 组件

## Priority 3：Salary Calculator

- [x] 确定输入字段
- [x] 确定年薪与时薪计算公式
- [x] 支持每周 35、37.5、40 小时和自定义小时数
- [x] 输出时薪、年薪、周薪、双周薪和月薪
- [x] 增加免责声明
- [x] 增加 SEO 和 FAQ
- [x] 完成核心用例验证与 production build
- [ ] 真机 / 浏览器手机端视觉复核（上线前建议再扫一眼）
- [x] 按 Design System 补齐 Last Updated 显示（V2.2.1）

## Priority 4：CLB Calculator

- [x] V2.3 IELTS GT → CLB 核心库、校验、UI（`/tools/clb-calculator`）
- [ ] 评估扩展 CELPIP / PTE / TEF / TCF（非当前阻塞项）
- [ ] Related Tools 在 OWP 上线后改为真实 OINP 链接（随 P4.2/发布）

## Priority 5：OINP / OWP EOI Calculator（V2.4）

### 已完成

- [x] 确认现行流为 Ontario Workforce Priority（OWP）Job Offer 路径（非旧 EJO）
- [x] 区分申请资格与 EOI 得分（PRD / 文案约束）
- [x] P2 Human Verify + package Sign-off（`OINP_OWP_HUMAN_VERIFIED = true`）
- [x] `lib/oinp`：`OwpScoringInput`、validation、factor scorers、`calculateOwpEoi`
- [x] 可执行 validation / scoring selftests
- [x] **P4.1 UI Design Review**（路由/表单/OWE 互斥/语言组合/SEO/合规；只读；**未写 UI 代码**）

### 下一步

- [ ] **P4.2 UI Implementation** — `/tools/oinp-eoi-calculator`（Universal Template + option-id 表单 → `calculateOwpEoi`）
- [ ] 页面 SEO / FAQ / Disclaimer / Last Updated / Related Tools
- [ ] 同步 Salary / CLB Related Tools 中的 OINP 链接（上线时）

### 明确未做（勿标完成）

- 工资数字 / CLB 四项自动 normalize
- 城市→地区、职业标题→NOC 推断
- 医师路径 UI
- PDF / 分享 / 保存结果

## 当前禁止事项

- 不要删除现有职业测试。
- 不要未经确认直接修改现有首页。
- 不要让 AI 自行猜测 OINP 评分规则；不得改已 HV 的 option 分值 / ID。
- 不要使用移民中介文章代替政府官方规则。
- 不要在 UI 组件内硬编码 EOI 分值；唯一计分入口为 `calculateOwpEoi`。
- 不要在测试通过前上线政策计算器。
- 不要宣传“保证获邀”或“保证移民成功”。
- 未经确认不要创建 `/career-test` 或迁移首页。
- 新工具必须遵循 `TOOL_DESIGN_SYSTEM.md` 与 `DEVELOPMENT_RULES.md`。
- P4.1 仅为设计评审；**在 P4.2 完成前不要宣称 OWP 工具页已上线。**
