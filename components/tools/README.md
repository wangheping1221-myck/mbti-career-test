# components/tools

工具相关的共用 UI 组件目录（**Universal Tool Template**，V2.2.1）。

## Universal Template（所有工具复用）

| 组件 | 用途 |
|------|------|
| `tool-layout.tsx` | 页面外壳（背景 + max-width） |
| `tool-hero.tsx` | Hero：标题 / 介绍 / 特点 |
| `calculator-panel.tsx` | 输入区外层卡片 |
| `result-panel.tsx` | 结果区外壳（含错误态与操作区） |
| `result-card.tsx` | 单项 Result Data；`highlighted` = Primary Result |
| `calculation-details.tsx` | 本次推演明细 |
| `formula-section.tsx` | 通用公式 / 规则摘要 |
| `related-tools.tsx` | 相关工具区块 |
| `tool-card.tsx` | 单个工具入口 / Coming Soon |
| `faq-section.tsx` | FAQ 折叠列表 |
| `disclaimer.tsx` | 免责声明 |
| `last-updated.tsx` | 最后更新日期 |

兼容：`calculator-layout.tsx` → 重新导出 `CalculatorPanel`（旧名）。

## 领域特有

| 组件 | 用途 |
|------|------|
| `salary-calculator.tsx` | 年薪时薪转换器客户端（调用 `lib/salary`） |

## 原则

1. 页面只负责组装；算法在 `lib/`。
2. 优先 Server Component；仅交互使用 `"use client"`。
3. Universal 组件 API 保持领域无关。
4. 适配手机端。
5. 规范见 `docs/TOOL_DESIGN_SYSTEM.md`。
