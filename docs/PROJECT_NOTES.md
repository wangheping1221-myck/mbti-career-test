# 加拿大职业导航 MVP — 项目记录

> 本文档汇总项目开发过程中的需求、实现、测试与部署信息，便于后续维护与迭代。

---

## 1. 项目概述

- **名称**：加拿大职业导航（MBTI-Career-Test）
- **定位**：面向加拿大华人 / 新移民的职业方向测试 MVP
- **技术栈**：Next.js 15（App Router）、TypeScript、Tailwind CSS v4、shadcn/ui、pnpm
- **约束**：本地 MVP；不接 Stripe、Supabase、登录（付费解锁目前为本地 state 模拟）

### 线上地址

| 类型 | 链接 |
|------|------|
| 网站 | https://mbti-career-test.vercel.app |
| GitHub | https://github.com/wangheping1221-myck/mbti-career-test |
| Vercel 管理 | https://vercel.com/dashboard |

---

## 2. 核心功能

### 2.1 测试流程

- 首页 → 10 道选择题 → Top 5 职业推荐结果
- 无需注册，结果仅在浏览器本地生成

### 2.2 免费结果

每个推荐职业展示：

- 中英文名称、匹配度 %、领域分类
- **推荐理由**（算法生成，自然中文）
- **注意事项（摘要）**（`warningZh` 第一句 +「解锁后查看完整说明」）

### 2.3 高级报告（模拟解锁）

- 本地 state `premiumUnlocked`，点击「模拟解锁高级报告」
- 解锁后每个职业额外展示：
  - **岗位画像**（6 标签）：体力、夜班/轮班、英语、学习投入、收入潜力、工作稳定性
  - **职业简介**（`descriptionZh`）
  - **适合人群**（`pathZh`）
  - **下一步建议**（`nextStepZh`）
  - **完整风险提示**（`warningZh` 全文）
- 正式版计划接 Stripe 真实付费；当前为演示模式

---

## 3. 关键文件

| 文件 | 作用 |
|------|------|
| `app/page.tsx` | 首页 / 答题 / 结果页 UI、高级报告解锁 |
| `lib/questions.ts` | 10 道题与 `buildUserAnswers()` |
| `lib/career-data.ts` | 20 个职业数据、加分/降权/封顶常量 |
| `lib/recommend-careers.ts` | 推荐算法 V1.x |
| `lib/career-display.ts` | 岗位画像标签、注意事项摘要 |

---

## 4. 推荐算法迭代摘要

| 版本 | 重点 |
|------|------|
| V1 | 20 职业 + 基础多维评分 |
| V1.1–V1.4 | 加拿大技工方向、设施稳定画像、现场技工拦截 |
| V1.5 | 保安硬性封顶/过滤；设施稳定组合加分；匹配度 score cap |
| V1.6 | 技术动手 + 收入优先组合加分；设施岗降权；动力工程/仪表进 Top 5 |
| V1.7 | 电脑/数据/办公室画像加分；设施岗对第三组降权；仓库主管作过渡选项 |

**原则**：三组画像互不干扰，修改时只动 `lib/career-data.ts` 与 `lib/recommend-careers.ts`，不改页面结构（结果页 premium 升级除外）。

---

## 5. 三组标准测试画像

### 第一组：设施稳定型

| 题 | 选项 |
|----|------|
| 体力 | 尽量久坐办公 |
| 夜班 | 完全不接受 |
| 英语 | 一般水平 |
| 学习 | 3 个月到 2 年 |
| 工作方式 | 流程规范 |
| 收入 | 比较重要 |
| 稳定 | 非常重要 |
| 主领域 | 设施运维 |
| 第二领域 | 没有第二个偏好 |
| 长期目标 | 从事设施运维 |

**预期 Top 5**：政府设施维护员 → 学校清洁与设施维护 → 楼宇运行维护员 → 医院设施维护技师 → 估算员  

**不应进 Top 5**：保安、暖通、电工、焊工、机修工、汽修等

---

### 第二组：技术技工 + 收入优先

| 题 | 选项 |
|----|------|
| 体力 | 较高强度（或中等强度） |
| 夜班 | 偶尔夜班 |
| 英语 | 一般水平 |
| 学习 | 2 年以上（或 3 个月～2 年） |
| 工作方式 | 动手技术 |
| 收入 | 非常重要 |
| 稳定 | 比较重要 |
| 主领域 | 技工与证照 |
| 第二领域 | 没有第二个偏好 |
| 长期目标 | 成为持证技工 |

**预期 Top 5**：电工、暖通、仪表控制、动力工程、机修工/水管工等  

**不应靠前**：政府设施维护员、学校清洁、保安

---

### 第三组：电脑 / 数据 / 办公室

| 题 | 选项 |
|----|------|
| 体力 | 尽量久坐办公 |
| 夜班 | 完全不接受 |
| 英语 | 较好水平（或更高） |
| 学习 | 2 年以上 |
| 工作方式 | 独立工作 |
| 收入 | 非常重要 |
| 稳定 | 比较重要～非常重要 |
| 主领域 | 科技与数据 |
| 第二领域 | 可选工程协调与估算 |
| 长期目标 | 转向科技或数据 |

**预期 Top 5**：软件开发、数据分析、估算员、项目协调、仓库主管（过渡）  

**不应进 Top 5**：政府设施维护员

---

## 6. 本地开发

```powershell
cd c:\Users\wangh\Desktop\MBTI-Career-Test
pnpm.cmd dev
```

浏览器打开 http://localhost:3000

### Windows PowerShell 注意

若 `pnpm` / `npx` 报「禁止运行脚本」，改用：

```powershell
pnpm.cmd dev
npx.cmd vercel login
```

或一次性放宽（当前用户）：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 端口 / 缓存问题

- 3000 被占用时 dev 可能跑在 3001，以终端显示的 Local 为准
- 若 Internal Server Error，关掉旧进程并删 `.next` 后重启：

```powershell
Remove-Item -Recurse -Force .next
pnpm.cmd dev
```

---

## 7. 部署与 Git 工作流

### 首次部署（已完成）

- Vercel CLI：`npx.cmd vercel --prod`
- 团队：career4
- 项目名：mbti-career-test

### GitHub（已完成）

- 账号：wangheping1221-myck
- 仓库：mbti-career-test（public）
- 默认分支：main
- Vercel 已 Connect Git Repository，**push 即自动部署**

### 日常更新

```powershell
git add .
git commit -m "描述修改内容"
git push
```

无需再手动 `vercel --prod`。

---

## 8. 产品路线（已讨论决策）

| 优先级 | 事项 | 状态 |
|--------|------|------|
| 1 | MVP 上线 + 三组画像验证 | ✅ 完成 |
| 2 | GitHub 备份 + Vercel 自动部署 | ✅ 完成 |
| 3 | 5～10 人试用收集反馈 | 待做 |
| 4 | 加厚 Top 职业报告内容 | 待有反馈后 |
| 5 | Stripe 付费解锁 | 待有付费意愿后 |
| 6 | 自定义域名 | 待正式推广时 |

**高级报告内容策略（已选）**：

- 免费：推荐理由 + 注意事项摘要
- 解锁：岗位画像 6 标签 + 简介/适合人群/下一步 + 完整风险提示
- 暂不写大段新文案；收费前可按热门职业加厚

---

## 9. 构建验证

```powershell
pnpm.cmd build
```

---

## 10. 后续可改进项（未做）

- [ ] 首页说明免费 vs 高级报告差异
- [ ] 5 职业对比总览表
- [ ] 自动化三组画像回归测试脚本
- [ ] Stripe / Supabase
- [ ] 自定义域名
- [ ] 热门职业加长「入行路径 / 证照 / 求职渠道」

---

*文档生成：2026-07-05*
