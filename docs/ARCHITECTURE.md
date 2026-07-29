# Career Navigator Canada — 架构说明

最后更新：2026-07-29（V2.2.1 Universal Tool Template）

本文档区分「当前真实结构」与「Version 2 规划结构」。  
规划内容未经确认前不得盲目移动现有文件。

---

## 1. 当前真实目录结构（已存在）

以下为检查项目后的真实结构（已排除 `node_modules`、`.next`、`.git`、`marketing` 素材包）。

```
MBTI-Career-Test/
├── app/
│   ├── api/
│   │   └── verify-unlock/
│   │       └── route.ts          # 高级报告解锁码校验
│   ├── canada-career-test/
│   │   ├── layout.tsx            # 落地页 metadata
│   │   └── page.tsx              # 营销落地页 /canada-career-test
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 职业测试三合一（首页/答题/结果）→ /
├── components/
│   ├── landing/                  # 落地页区块组件
│   └── ui/                       # shadcn：button / card / badge
├── docs/                         # 项目文档与开发日志
├── lib/                          # 职业测试数据与算法
│   ├── career-data.ts
│   ├── career-display.ts
│   ├── premium-unlock.ts
│   ├── questions.ts
│   ├── recommend-careers.ts
│   ├── unlock-codes.ts
│   └── utils.ts
├── public/
├── env.example
├── package.json
└── …（配置文件）
```

### 当前路由

| 路由 | 状态 | 说明 |
|------|------|------|
| `/` | 已存在 | 职业测试（home / quiz / results 同页） |
| `/canada-career-test` | 已存在 | 营销落地页（可能仍为未跟踪文件） |
| `/api/verify-unlock` | 已存在 | 解锁码 API |
| `/tools/salary-calculator` | ✅ V2.1 已上线 | 年薪 / 时薪转换器 |
| `/career-test` | **未建立** | 规划中，暂不迁移 |
| `/tools` 工具中心 | **未建立页面** | 仅有目录；子路由已有 salary |

---

## 2. Version 2 规划目录

目标：在保留现有职业测试的前提下，扩展为「职业导航 + 实用工具」平台。

```
app/
├── page.tsx                      # 未来：平台首页（暂不改）
├── career-test/                  # 未来：迁入现有测试（暂不建）
├── tools/                        # ✅ 已建
│   ├── README.md
│   ├── salary-calculator/        # ✅ V2.1
│   │   ├── layout.tsx            # SEO metadata
│   │   └── page.tsx
│   ├── page.tsx                  # 未来：工具中心
│   ├── clb-calculator/           # 未来
│   └── oinp-eoi-calculator/      # 未来
├── canada-career-test/           # 已存在：落地页
└── api/

components/
├── landing/                      # 已存在
├── ui/                           # 已存在
└── tools/                        # ✅ V2.2.1 Universal Tool Template
    ├── tool-layout.tsx
    ├── tool-hero.tsx
    ├── calculator-panel.tsx
    ├── calculator-layout.tsx     # 兼容：重导出 CalculatorPanel
    ├── result-panel.tsx
    ├── result-card.tsx
    ├── calculation-details.tsx
    ├── formula-section.tsx
    ├── related-tools.tsx
    ├── tool-card.tsx
    ├── faq-section.tsx
    ├── disclaimer.tsx
    ├── last-updated.tsx
    ├── salary-calculator.tsx     # 领域客户端（Salary）
    └── README.md

lib/
├── …现有职业测试模块…            # 已存在，继续保留
├── calculators/                  # README 规范
├── salary/                       # ✅ V2.1 算法与格式化
│   ├── calculator.ts
│   ├── types.ts
│   ├── constants.ts
│   ├── format.ts
│   └── README.md
├── clb/                          # 占位
└── oinp/                         # 占位

docs/
├── PROJECT_ROADMAP.md
├── CHANGELOG.md
├── TODO.md
├── DECISIONS.md
├── AI_CONTEXT.md
├── PROJECT_NOTES.md              # MVP 历史记录
├── ARCHITECTURE.md               # 本文件
├── TOOL_DESIGN_SYSTEM.md         # 工具 UI 规范
└── DEVELOPMENT_RULES.md          # 开发规范
```

---

## 3. `app/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `app/layout.tsx` | 已存在 | 全局布局 |
| `app/page.tsx` | 已存在 | 当前职业测试入口；**未经确认勿改职责 / 勿迁走** |
| `app/canada-career-test/` | 已存在 | 落地页（可能仍未 git 跟踪） |
| `app/api/verify-unlock/` | 已存在 | 解锁 API |
| `app/tools/` | 已存在 | 工具路由根；含 README |
| `app/tools/salary-calculator/` | ✅ V2.1 | 年薪 / 时薪转换器 |
| `app/career-test/` | 未建立 | 规划迁移目标；确认前禁止创建 |

---

## 4. `components/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `components/ui/` | 已存在 | shadcn：button / card / badge |
| `components/landing/` | 已存在 | 落地页组件（可能仍未 git 跟踪） |
| `components/tools/` | ✅ V2.2.1 | Universal Tool Template + `salary-calculator.tsx` |

UI 细节以 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md) 为准。

---

## 5. `lib/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `lib/career-*.ts` 等 | 已存在 | 职业测试算法与数据 |
| `lib/calculators/` | 已存在 | 算法层 README |
| `lib/salary/` | ✅ V2.1 | 年薪时薪算法 / 类型 / 格式化 |
| `lib/clb/` | 占位 | 未来 CLB |
| `lib/oinp/` | 占位 | 未来 OINP |

分层规则以 [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) §4 为准。

---

## 6. `docs/`

| 文件 | 状态 |
|------|------|
| `AI_CONTEXT.md` | AI 短上下文 |
| `ARCHITECTURE.md` | 本文件：真实结构 |
| `TOOL_DESIGN_SYSTEM.md` | 工具设计规范 |
| `DEVELOPMENT_RULES.md` | 开发规范 |
| `TODO.md` / `CHANGELOG.md` / `DECISIONS.md` / `PROJECT_ROADMAP.md` | 任务与产品 |
| `PROJECT_NOTES.md` | MVP 历史 |

---

## 7. 工具相关（`tools/`）

本项目不在仓库根目录建 `tools/`，工具相关分布在：

| 位置 | 职责 |
|------|------|
| `app/tools/` | 路由与页面（SEO、布局） |
| `components/tools/` | 共用 UI 组件 |
| `lib/calculators/` + `lib/salary|clb|oinp/` | 纯计算与规则数据 |

原则：

1. 页面只负责展示与交互状态。
2. 算法与政策规则不得写在 `page.tsx`。
3. 政策数据必须可独立更新，并标注来源与更新日期。

---

## 8. 后续扩展规划（未实施）

- 将 `/` 改为平台首页；职业测试迁至 `/career-test`（需单独确认）
- `/tools` 工具中心页 + CLB / OINP 等计算器
- 统一导航栏与页脚
- 中英文双语结构预留
- Blog / 学习中心、职业数据库、PDF 报告等（见 `PROJECT_ROADMAP.md`）

### 当前仍需确认后才可做

- 修改 `app/page.tsx` 职责或迁移职业测试
- 建立 `app/career-test`
- 上线未核实规则的政策计算器正式算法
