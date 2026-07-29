# Career Navigator Canada — 架构说明

最后更新：2026-07-29

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
| `/canada-career-test` | 已存在 | 营销落地页 |
| `/api/verify-unlock` | 已存在 | 解锁码 API |
| `/career-test` | **未建立** | 规划中，暂不迁移 |
| `/tools` 及子路由 | **未建立** | 规划中 |

---

## 2. Version 2 规划目录

目标：在保留现有职业测试的前提下，扩展为「职业导航 + 实用工具」平台。

```
app/
├── page.tsx                      # 未来：平台首页（暂不改）
├── career-test/                  # 未来：迁入现有测试（暂不建）
├── tools/                        # ✅ 已建空目录（本阶段）
│   ├── page.tsx                  # 未来：工具中心
│   ├── salary-calculator/
│   ├── clb-calculator/
│   └── oinp-eoi-calculator/
├── canada-career-test/           # 已存在：落地页
└── api/

components/
├── landing/                      # 已存在
├── ui/                           # 已存在
└── tools/                        # ✅ 已建（本阶段仅 README）
    # 未来：ToolLayout / CalculatorLayout / ResultCard 等

lib/
├── …现有职业测试模块…            # 已存在，继续保留
├── calculators/                  # ✅ 已建（本阶段仅 README）
├── salary/                       # ✅ 已建空目录
├── clb/                          # ✅ 已建空目录
└── oinp/                         # ✅ 已建空目录

docs/
├── PROJECT_ROADMAP.md            # 已存在
├── CHANGELOG.md                  # 已存在
├── TODO.md                       # 已存在
├── DECISIONS.md                  # 已存在
├── AI_CONTEXT.md                 # 已存在
├── PROJECT_NOTES.md              # 已存在（MVP 记录）
└── ARCHITECTURE.md               # ✅ 本文件（本阶段新增）
```

---

## 3. `app/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `app/layout.tsx` | 已存在 | 全局布局 |
| `app/page.tsx` | 已存在 | **禁止本阶段修改**；职业测试入口 |
| `app/canada-career-test/` | 已存在 | 落地页 |
| `app/api/verify-unlock/` | 已存在 | 解锁 API |
| `app/tools/` | ✅ 本阶段新建 | 空目录 + README；未来工具中心与子工具页 |
| `app/career-test/` | 未建立 | 规划迁移目标；**本阶段禁止建立** |

---

## 4. `components/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `components/ui/` | 已存在 | shadcn 基础组件 |
| `components/landing/` | 已存在 | `/canada-career-test` 落地页组件 |
| `components/tools/` | ✅ 本阶段新建 | 仅 README；未来工具共用 UI 组件 |

---

## 5. `lib/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `lib/career-*.ts` 等 | 已存在 | 职业测试算法与数据；本阶段不改 |
| `lib/calculators/` | ✅ 本阶段新建 | 算法层 README；禁止算法写在 page.tsx |
| `lib/salary/` | ✅ 本阶段新建 | 空目录；未来年薪/时薪逻辑 |
| `lib/clb/` | ✅ 本阶段新建 | 空目录；未来 CLB 对照与转换 |
| `lib/oinp/` | ✅ 本阶段新建 | 空目录；未来 OINP EOI 规则与计分 |

---

## 6. `docs/`

| 文件 | 状态 |
|------|------|
| `AI_CONTEXT.md` | 已存在 |
| `TODO.md` | 已存在 |
| `CHANGELOG.md` | 已存在 |
| `DECISIONS.md` | 已存在 |
| `PROJECT_ROADMAP.md` | 已存在 |
| `PROJECT_NOTES.md` | 已存在（MVP） |
| `ARCHITECTURE.md` | ✅ 本阶段新增 |

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
- `/tools` 工具中心 + Salary / CLB / OINP 三个计算器
- 统一导航栏与页脚
- 中英文双语结构预留
- Blog / 学习中心、职业数据库、PDF 报告等（见 `PROJECT_ROADMAP.md`）

### 本阶段明确不做

- 不修改 `app/page.tsx`
- 不迁移职业测试
- 不建立 `app/career-test`
- 不实现任何 Calculator UI 或算法
- 不修改 SEO / 现有业务逻辑
