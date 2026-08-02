# 当前开发任务

最后更新：2026-08-02（P5.7A — 与 `p5.6-complete` 对齐）

## Priority 1：项目基础

- [x] 确定网站新定位
- [x] 确定第一批三个核心工具
- [x] 确定继续使用当前 Next.js 项目
- [x] 建立项目文档体系
- [x] 检查当前项目目录和现有页面
- [x] 确认现有职业测试结构（现为 `/career-test`；历史曾为 `/` 三合一）
- [x] 建立 Version 2 基础架构文档与空目录（`ARCHITECTURE.md` + tools/calculators 占位）
- [x] 建立 `TOOL_DESIGN_SYSTEM.md` 与 `DEVELOPMENT_RULES.md` 正式规范
- [x] Version 2.0 页面迁移：平台首页 `/` + Career Test `/career-test`（P5.4 / P5.6；tag `p5.6-complete`）

## Priority 2：网站架构（P5 平台化）

- [x] 建立 `app/tools/`、`components/tools/`、`lib/calculators|salary|clb|oinp/` 目录
- [x] 实现 ToolCard / CalculatorLayout / ResultCard / FAQ 等公共组件
- [x] V2.2.1 落地 Universal Tool Template
- [x] 共享导航栏与页脚（P5.2：`components/site/*`）
- [x] `/tools` 工具中心（P5.3：`lib/tools/catalog.ts`）
- [x] 平台首页（P5.4：`PlatformHome`）
- [x] Career Test 结果 Related Tools（P5.5：`getRelatedTools()`）
- [x] `/career-test` 路由切流 + `/?unlock=` 临时兼容重定向（P5.6）
- [x] 按 Design System 为工具页补齐统一 Last Updated 组件
- [x] **P5.7A** 文档同步（本提交；与 `p5.6-complete` 对齐）
- [ ] **P5.7B** 最小 SEO：共享 SITE_URL、sitemap、robots、canonical 一致性（**尚未开始**）
- [ ] 未来：未跟踪 `app/canada-career-test/` 脏构建风险清理（CTA / 入库 / 忽略策略待定）
- [ ] 未来：Related Tools 全面迁入 catalog（非 P5.7）

## Priority 3：Salary Calculator

- [x] 确定输入字段与公式；周小时 / 年周数；多周期输出
- [x] 免责声明、SEO、FAQ、Last Updated
- [x] 核心用例与 production build
- [ ] 真机 / 浏览器手机端视觉复核（建议定期）

## Priority 4：CLB Calculator

- [x] V2.3 IELTS GT → CLB 核心库、校验、UI（`/tools/clb-calculator`）
- [x] Related Tools 指向 live OWP / Salary / Career Test（随工具上线已更新）
- [ ] 评估扩展 CELPIP / PTE / TEF / TCF（非当前阻塞项）

## Priority 5：OINP / OWP EOI Calculator（V2.4）

### 已完成

- [x] OWP Job Offer 路径产品确认；资格 ≠ 得分
- [x] P2 Human Verify + Sign-off（`OINP_OWP_HUMAN_VERIFIED = true`）
- [x] `lib/oinp` 引擎与 selftests
- [x] P4.1 UI Design Review
- [x] **P4.2 UI Implementation** — `/tools/oinp-eoi-calculator`

### 明确未做（勿标完成）

- 工资数字 / CLB 四项自动 normalize
- 城市→地区、职业标题→NOC 推断
- 医师路径 UI
- PDF / 分享 / 保存结果

## 当前禁止事项

- 不要删除现有职业测试或破坏评分 / 题目 / 解锁逻辑。
- **不要擅自撤销 P5.6**：勿把 Career Test 迁回 `/`，勿切断 `/career-test`。
- 不要改已 HV 的 OWP option 分值 / ID；计分唯一入口 `calculateOwpEoi`。
- 不要让 AI 自行猜测政策规则；不要用中介文章代替官方来源。
- 不要在 UI 组件内硬编码 EOI 分值。
- 不要宣传“保证获邀”或“保证移民成功”。
- 新工具必须遵循 `TOOL_DESIGN_SYSTEM.md` 与 `DEVELOPMENT_RULES.md`。
- 未跟踪的 landing / marketing / 历史 PRD **不是**产品 SSOT；P5.7 内勿增删入库。
- 解锁码仅存环境变量（`.env.local` / Vercel）；勿写入源码。
