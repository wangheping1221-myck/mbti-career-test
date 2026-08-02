# Career Navigator Canada — 架构说明

最后更新：2026-08-02（P5.7A — 与 `p5.6-complete` 对齐）

本文档描述 **当前真实结构**（以 git 跟踪代码为准）。  
未跟踪的本地营销/落地页/历史 PRD **不是**产品 SSOT。

---

## 1. 当前真实目录结构（已跟踪）

以下为 `p5.6-complete` 之后的主要结构（已排除 `node_modules`、`.next`、`.git`；未列出全部文件）。

```
MBTI-Career-Test/
├── app/
│   ├── api/verify-unlock/route.ts
│   ├── career-test/
│   │   ├── layout.tsx          # Career Test SEO metadata
│   │   └── page.tsx            # → CareerTestFlow
│   ├── tools/
│   │   ├── layout.tsx          # /tools hub metadata
│   │   ├── page.tsx            # Tools hub
│   │   ├── salary-calculator/
│   │   ├── clb-calculator/
│   │   └── oinp-eoi-calculator/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx              # 根布局 + SiteHeader / SiteFooter
│   └── page.tsx                # PlatformHome；/?unlock= → /career-test
├── components/
│   ├── site/                   # nav / header / footer / mobile-nav
│   ├── home/platform-home.tsx
│   ├── career-test/career-test-flow.tsx
│   ├── tools/                  # Universal Tool Template
│   └── ui/
├── lib/
│   ├── tools/catalog.ts        # 工具目录 SSOT
│   ├── salary/ | clb/ | oinp/
│   ├── career-data.ts | questions.ts | recommend-careers.ts …
│   ├── premium-unlock.ts | unlock-codes.ts
│   └── utils.ts
├── docs/
├── env.example
└── package.json
```

### 当前路由

| 路由 | 状态 | 说明 |
|------|------|------|
| `/` | ✅ | 平台首页（`PlatformHome` only） |
| `/career-test` | ✅ | 职业测试 SPA（`CareerTestFlow`） |
| `/tools` | ✅ | 工具中心（`getLiveTools()`） |
| `/tools/salary-calculator` | ✅ | 年薪 / 时薪 |
| `/tools/clb-calculator` | ✅ | IELTS GT → CLB |
| `/tools/oinp-eoi-calculator` | ✅ | 安省 OWP EOI |
| `/api/verify-unlock` | ✅ | 解锁码 API |
| `/?unlock=*` | ✅ 兼容 | 临时重定向至 `/career-test?unlock=*`（保留全部 query） |

### 未跟踪 / 非 SSOT（可能存在于本地工作区）

| 路径 | 说明 |
|------|------|
| `app/canada-career-test/` | 营销落地页实验；**未入库**；脏构建可能生成路由 |
| `components/landing/` | 仅服务上述落地页 |
| `marketing/` | 站外素材 |
| 部分 `docs/PRD_*` / `IMPLEMENTATION_PLAN_*` / 研究文档 | 历史草稿；状态横幅可能过时 |

**P5.7 策略**：保持未跟踪、不删不改不 ignore（见 DECISIONS）。未来清理项：未跟踪 App Router 目录会影响脏本地 production build。

---

## 2. 平台分层（P5.2–P5.6）

```
app/
├── page.tsx                 # 平台首页 + unlock 兼容
├── career-test/             # 职业测试独立入口（P5.6）
└── tools/                   # hub（P5.3）+ 各计算器

components/
├── site/                    # 共享导航（P5.2）
├── home/                    # PlatformHome（P5.4）
├── career-test/             # CareerTestFlow（结果 Related Tools：P5.5）
└── tools/                   # Universal Tool Template（V2.2.1）

lib/
├── tools/catalog.ts         # hub / home / CT related 的 live 工具列表
├── salary/ | clb/ | oinp/   # 各域算法（oinp HV 表受保护）
└── …职业测试模块…
```

计算器页内 Related Tools 仍可能使用页面级 content 数组；Career Test 结果使用 `getRelatedTools()`。完整 Related Tools → catalog 迁移 **不在 P5.7A**（推迟至后续统一重构）。

---

## 3. `app/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `app/layout.tsx` | ✅ | 全局布局 + `SiteHeader` / `SiteFooter` |
| `app/page.tsx` | ✅ | `PlatformHome`；含 `unlock` query 临时重定向 |
| `app/career-test/` | ✅ | Career Test 路由与 metadata |
| `app/tools/` | ✅ | hub + salary / clb / oinp-eoi |
| `app/api/verify-unlock/` | ✅ | 解锁 API |

**禁止**：未经产品批准撤销 P5.6（勿将 Career Test 迁回 `/`，勿删除 `/career-test`）。

---

## 4. `components/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `components/site/` | ✅ | Home / Career Test / Tools 导航 |
| `components/home/` | ✅ | 平台首页 |
| `components/career-test/` | ✅ | 测试 SPA |
| `components/tools/` | ✅ | Universal Tool Template |
| `components/ui/` | ✅ | shadcn |

UI 细节以 [`TOOL_DESIGN_SYSTEM.md`](./TOOL_DESIGN_SYSTEM.md) 为准。

---

## 5. `lib/`

| 路径 | 状态 | 说明 |
|------|------|------|
| `lib/tools/catalog.ts` | ✅ | `TOOL_CATALOG` / `getLiveTools` / `getRelatedTools` |
| `lib/career-*.ts` 等 | ✅ | 职业测试算法与数据 |
| `lib/salary/` | ✅ | 年薪时薪 |
| `lib/clb/` | ✅ | IELTS GT → CLB |
| `lib/oinp/` | ✅ | OWP EOI；**HV 表与计分逻辑受保护** |
| `lib/premium-unlock.ts` / `unlock-codes.ts` | ✅ | 解锁（码仅来自环境变量） |

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
| `RELEASE_PROCESS.md` | 发版与 tag |
| `PROJECT_NOTES.md` | **MVP 历史记录**（路由描述可能过时；以本文件为准） |

---

## 7. 工具相关（`tools/`）

| 位置 | 职责 |
|------|------|
| `app/tools/` | 路由与页面（SEO、布局） |
| `components/tools/` | 共用 UI 组件 |
| `lib/calculators/` + `lib/salary|clb|oinp/` | 纯计算与规则数据 |
| `lib/tools/catalog.ts` | 工具列表 SSOT（hub / home / CT related；未来 sitemap） |

原则：

1. 页面只负责展示与交互状态。
2. 算法与政策规则不得写在 `page.tsx`。
3. 政策数据必须可独立更新，并标注来源与更新日期。
4. **不得修改**已 Human-Verify 的 OWP option 分值 / ID。

---

## 8. 后续扩展（未实施）

- P5.7B：共享 `SITE_URL`、`sitemap.ts`、`robots.ts`、canonical 一致性（metadata only；无 trailingSlash 路由重定向）
- Related Tools 全面迁入 catalog
- `/about`、`/blog`、CRS / Tax / EI 等（见 `PROJECT_ROADMAP.md`）
- 未跟踪落地页 CTA / 入库决策（未来清理项）

### 仍需确认后才可做

- 撤销或大幅改动 P5.6 路由拓扑
- 修改职业测试题目 / 评分 / 解锁行为
- 修改 OWP HV 表或 `calculateOwpEoi` 业务逻辑
- 将未跟踪 marketing / landing 混入功能 commit
