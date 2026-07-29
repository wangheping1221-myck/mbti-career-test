# Career Navigator Canada — 发布流程（Release Process）

**生效日期**：2026-07-29  
**适用范围**：`main` 分支上的版本发布、Git tag、Changelog 维护  
**相关文档**：

- 变更记录 → [`CHANGELOG.md`](./CHANGELOG.md)
- 开发规范 → [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md)
- 任务板 → [`TODO.md`](./TODO.md)
- AI 上下文 → [`AI_CONTEXT.md`](./AI_CONTEXT.md)

> **Why**  
> 项目已进入可打版本标签的阶段（首个 annotated tag：`v2.2.1-universal-tool-template`）。统一发布流程，避免「代码已上线但 CHANGELOG / tag / 文档不一致」。

---

## 1. 版本与 Tag 约定

### 1.1 版本号

采用 **产品版本号**（非 npm 包 semver 强制约束），常见形态：

| 形态 | 示例 | 用途 |
|------|------|------|
| `X.Y` | `2.1` | 功能发布（如新工具） |
| `X.Y.Z` | `2.2.1` | 模板 / 规范 / 小迭代 / 修复 |

在 `CHANGELOG.md` 的 Released Versions 中使用方括号版本号，例如 `[2.2.1]`。

### 1.2 Git tag 命名

Annotated tag，推荐格式：

```text
v{version}-{short-slug}
```

示例：

```text
v2.2.1-universal-tool-template
```

规则：

1. 必须以 `v` + 版本号开头，便于排序与识别  
2. slug 用 `kebab-case`，说明本版本主题  
3. **只打 annotated tag**（带 message），不用轻量 tag  
4. tag message 应用英文或中英要点列出 Highlights  

### 1.3 当前已发布 tag

| Tag | 版本 | 说明 |
|-----|------|------|
| `v2.2.1-universal-tool-template` | 2.2.1 | Universal Tool Template + Salary 合入发布 |

---

## 2. Changelog 维护规则

`CHANGELOG.md` 固定两段：

1. **`[Unreleased]`** — 开发过程中持续写入  
2. **`Released Versions`** — 仅在正式发布时追加新版本块  

### 2.1 开发中

- 每完成可交付增量，在 **Unreleased** 下记录 Added / Changed / Docs / Fixed 等  
- 明确「未做 / 未纳入」的内容写在 Unreleased 或对应条目的 Not included  
- **不要**在未发版前把条目提前写进 Released Versions  

### 2.2 发布时

1. 将 Unreleased 中**属于本版本**的条目移到新的 `### [X.Y.Z] — YYYY-MM-DD — 标题`  
2. 填写 **Git tag** 与 **Commit**（短 hash）  
3. Unreleased 清空为仅保留「进行中 / 计划中」项，或留空模板  
4. 同步勾选 `TODO.md`；必要时更新 `ARCHITECTURE.md` / `PROJECT_ROADMAP.md`  

### 2.3 不写入 Changelog 的内容

- 纯本地调试、缓存清理、临时实验  
- 未打算入库的 `marketing/` 素材（除非单独作为素材发布说明）  
- 密钥、解锁码明文  

---

## 3. 标准发布检查清单

发布前必须完成：

| # | 检查项 | 说明 |
|---|--------|------|
| 1 | 范围确认 | 本次版本包含什么、明确排除什么 |
| 2 | 质量门禁 | `pnpm.cmd lint` 与 `pnpm.cmd build` 通过 |
| 3 | 文档 | CHANGELOG Unreleased → Released；TODO / 必要架构文档已更新 |
| 4 | 无关文件 | 不把 `marketing/`、未完成落地页等混进功能 commit（除非本版本目标就是它们） |
| 5 | 用户确认 | **不自动 Commit / Push / Tag**；等待明确指令 |

---

## 4. Git 操作顺序（发布日）

默认在 `main` 上发布（当前工作流）。未经确认不要另开长期 release 分支。

### 4.1 Commit（需用户明确要求）

```powershell
git status
git add <本版本相关文件>
git commit -m "feat|refactor|docs: <简短说明>"
```

原则：一个版本目标尽量一个（或一组紧密相关）commit；Commit 前说明影响范围。

### 4.2 Push 代码（需用户明确要求）

```powershell
git push origin main
```

说明：已连接 Vercel 时，**push `main` 会触发生产部署**。Tag 本身不替代代码 push。

### 4.3 创建 Annotated Tag（需用户明确要求）

确认 `HEAD` 即为要发布的 commit 后：

```powershell
git tag -a "vX.Y.Z-short-slug" -m "VX.Y.Z Title

Highlights:
- ...
- ..."
```

### 4.4 仅 Push 该 Tag（需用户明确要求）

```powershell
git push origin refs/tags/vX.Y.Z-short-slug
```

不要默认 `git push --tags`（避免误推历史或本地试验 tag）。

### 4.5 发布后核对

```powershell
git rev-parse HEAD
git show -s --format="%H%n%d" vX.Y.Z-short-slug
git ls-remote --tags origin "vX.Y.Z-short-slug"
```

汇报：当前 commit hash、tag 名、是否已同步到 origin。

---

## 5. 谁先谁后：代码 Push vs Tag

| 场景 | 建议 |
|------|------|
| 功能已在 `main` 且已部署，补打版本标记 | 可只创建并 push tag（不新建 commit） |
| 新功能尚未上 main | 先 commit → push `main` → 再 tag → push tag |
| 只改文档、暂不发版 | 更新 Unreleased；不必打 tag |

Tag 标记的是**某次 commit 的产品里程碑**，不替代 Vercel 部署；部署以 `main` 推送为准。

---

## 6. AI / 协作者约束

与 [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) §12 一致：

1. 修改前先分析；最小改动  
2. 完成后更新 CHANGELOG（优先写 Unreleased）  
3. **不自动 Commit**  
4. **不自动 Push**  
5. **不自动创建或推送 Tag**，除非用户明确给出 tag 名与 message  
6. 用户要求「只 push tag」时，不得顺带 push 其它分支或新建 commit  

---

## 7. 示例：2.2.1 实际流程（参考）

1. 完成 Universal Tool Template + Salary 组装与文档  
2. lint / build 通过  
3. Commit：`refactor: create universal tool template`（`e1e28bf`）  
4. Push `main` → Vercel 部署  
5. Annotated tag：`v2.2.1-universal-tool-template`  
6. `git push origin refs/tags/v2.2.1-universal-tool-template`  
7. 在 CHANGELOG Released Versions 保留该版本说明  

后续版本重复 §3–§4 即可。

---

## 8. 下次发布建议模板

### Tag message 模板

```text
VX.Y.Z <英文短标题>

Highlights:
- <要点 1>
- <要点 2>
- <要点 3>
```

### CHANGELOG 版本块模板

```markdown
### [X.Y.Z] — YYYY-MM-DD — 标题

**Git tag**：`vX.Y.Z-short-slug`  
**Commit**：`abcdef0`

#### Highlights
- …

#### Added
- …

#### Changed
- …

#### Not included
- …
```

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-29 | 首版：固化 Unreleased / Released、annotated tag、仅 push 指定 tag 的流程 |
