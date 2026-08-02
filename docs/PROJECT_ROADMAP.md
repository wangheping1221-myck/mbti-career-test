# Career Navigator Canada 项目路线图

## 项目愿景

打造面向加拿大华人、新移民、留学生和工签持有人的职业导航与实用工具平台。

网站通过免费工具获得自然搜索流量，并通过职业导航、职业报告和职业数据库提供更深入的服务。

## 当前版本

**平台化检查点**：`p5.6-complete`（2026-08-02）— `/` 平台首页 + `/career-test` + `/tools` hub；Salary / CLB / OWP 均已上线。

进行中：**P5.7**（文档同步 → 最小 SEO 基建）。

规范文档：

- [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md)
- [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)

## 第一阶段：网站平台化

- [x] 将网站定位升级为 Career Navigator Canada（平台首页 P5.4）
- [x] 建立统一导航栏与页脚（P5.2）
- [x] 建立工具中心页面 `/tools`（P5.3）
- [x] 职业测试独立模块 `/career-test`（P5.6；`/?unlock=` 临时兼容）
- [x] Career Test 结果 Related Tools（P5.5）
- [x] 可复用计算器组件与设计/开发规范（V2.1–V2.2.1）
- [ ] P5.7 文档同步 + 最小 SEO（sitemap / robots / SITE_URL）
- [ ] 首页与导航的持续体验打磨（非阻塞）

## 第一批核心工具

- [x] 年薪 / 时薪转换计算器（`/tools/salary-calculator`）
- [x] CLB 语言成绩转换计算器（`/tools/clb-calculator`）
- [x] OINP / OWP EOI 打分计算器（`/tools/oinp-eoi-calculator`）
  - [x] V2.4 数据 HV + Sign-off；`lib/oinp` 计分引擎
  - [x] P4.1 UI Design Review
  - [x] P4.2 UI Implementation

## 第二阶段工具

- [ ] Express Entry CRS Calculator
- [ ] EI Calculator
- [ ] 加拿大税后工资计算器
- [ ] NOC / TEER 查询
- [ ] Median Wage 查询
- [ ] Vacation Pay Calculator

## 第三阶段

- [ ] 中英文双语
- [ ] 用户账户
- [ ] 保存计算结果
- [ ] 分享结果
- [ ] 生成 PDF 报告
- [ ] 高级职业报告（支付链路增强）
- [ ] 职业数据库
- [ ] Blog / 学习中心

## 产品原则

1. 准确性优先于开发速度。
2. 政策类工具必须依据加拿大政府官方来源。
3. 评分规则与页面代码分离，便于更新。
4. 所有页面优先适配手机端。
5. 公共组件应尽量复用。
6. 免费工具负责流量，职业导航负责深度价值。
7. 不提供获邀、移民成功或就业成功保证。
8. 所有政策工具必须显示免责声明和规则更新时间。
9. **不得擅自撤销已封存的平台路由拓扑**（以 `p5.6-complete` 为准）。
