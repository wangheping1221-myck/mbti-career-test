# Career Navigator Canada 项目路线图

## 项目愿景

打造面向加拿大华人、新移民、留学生和工签持有人的职业导航与实用工具平台。

网站通过免费工具获得自然搜索流量，并通过职业导航、职业报告和职业数据库提供更深入的服务。

## 当前版本

Version 2.1（Salary Calculator 已上线）

启动日期：2026-07-29（Version 2.0 平台化启动）

规范文档：

- [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md)
- [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)

## 第一阶段：网站平台化

- [ ] 将网站定位从单一职业测试升级为 Career Navigator Canada（品牌/首页仍待完成）
- [ ] 设计新版首页
- [ ] 建立工具中心页面（`/tools` 列表页）
- [ ] 建立统一导航栏
- [ ] 将现有职业测试保留为独立模块（规划 `/career-test`，尚未迁移）
- [x] 建立可复用的计算器组件（V2.1：`components/tools/*`）
- [x] 建立工具设计规范与开发规范

## 第一批核心工具

- [x] 年薪 / 时薪转换计算器（`/tools/salary-calculator`）
- [ ] CLB 语言成绩转换计算器
- [ ] OINP EOI 打分计算器

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
- [ ] 高级职业报告
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
