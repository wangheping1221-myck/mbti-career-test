# Career Test V2 — Question Framework (V2.2)

**Document:** `docs/CAREER_TEST_V2_QUESTION_FRAMEWORK.md`  
**Phase:** V2.2 — Question framework documentation only  
**Status:** Draft for review (no code, scoring formulas, weights, UI, or HV research)  
**Sources of truth:**  
- `docs/PRD_CAREER_TEST_V2.md`  
- `docs/CAREER_TEST_V2_OCCUPATION_FRAMEWORK.md`  
- Approved V2.2 read-only review + locked revisions in this phase  

**V1:** Frozen — do not modify `lib/questions.ts`, scoring, unlock, routes, or UI in this phase.

---

## 1. Scope and phase boundary

### In scope

- Exact **26** single-choice working questions (6 / 10 / 10)  
- Four working options per question  
- Axis deduplication, deal-breaker mapping, interest-family coverage  
- Candidate dimension mapping (no numeric weights)  
- Mobile **Next-button** UX requirements (spec only)  

### Out of scope

- Implementing questions in code or changing V1  
- Scoring formulas, numeric weights, career scores, fixtures, UI  
- Data-model files, Human Verify research  
- A 27th question  
- Wages, outlook, immigration/PR, official licence facts  

---

## 2. Locked PRD decisions

| ID | Decision |
|----|----------|
| CTV2-D1 | Exactly **26** single-choice questions |
| CTV2-D2 | Exactly **60** occupations (inventory owned by V2.1) |
| CTV2-D3 | **10–12** scored dimensions max; final keys in V2.3 |
| CTV2-D11 | Exactly **two** deal-breakers: nights/rotating; heavy physical — hard filter only |
| English | Never a deal-breaker or permanent hard block |
| Interest weight | 10 interest items → **one** Field / Interest Affinity; later ≤**20%** soft-score weight |
| Free results | Top 5 |
| UX | One question per mobile screen; back allowed; section + overall progress; **6–8 minutes** |

---

## 3. Locked occupation-framework dependencies

- Primary families and the exact 60 occupations are defined in `docs/CAREER_TEST_V2_OCCUPATION_FRAMEWORK.md`.  
- Interest options may map to families for **affinity signal only** — they do not rename occupations or assert regulation.  
- Near-duplicate occupation pairs remain distinct via profiles + preference axes (e.g. p08, p09, c01); questions must not collapse them.

---

## 4. V1 question audit

| V1 key | Concept | V2 treatment |
|--------|---------|--------------|
| `physical` | Physical intensity levels | **Split roles into `v2-c02`** (soft levels + one hard reject) |
| `nightShift` | Night/rotating levels | **Rewrite as `v2-c01`** (hard reject ≠ “fixed daytime only”) |
| `english` | English level + V1 hard blocks | **Rewrite as `v2-c03` readiness only** — never hard filter |
| `studyTime` | Training time | **Retain concept as `v2-c04`** |
| `workStyle` | Mixed five styles | **Split** across p01, p02, p05, p08, p09 |
| `income` / `stability` | Separate importance ratings | **Replace with trade-off `v2-p07`** |
| `categoryPrimary` / `Secondary` / `careerGoal` | Triple category pick | **Retire** — replaced by scenario interests i01–i10 |

V1 UX: auto-advance on tap. **V2 locks manual Next** (see §17).

---

## 5. Question-writing principles

1. Concrete Canada work situations; no MBTI-style personality labels.  
2. One matching axis per question (except c01/c02 where one option is hard filter and others are soft tolerance on the **same** axis).  
3. Exactly **four** options; prefer trade-offs and observable choices over “非常重要”.  
4. Neutral/flexible option on soft and interest items where appropriate.  
5. No wages, prestige ladders, immigration/PR, or unverified licence claims.  
6. Question count ≠ scoring weight.  
7. Chinese working copy is primary; English is optional working translation.  
8. Options aim for ~two mobile lines; longer help text goes in subtitles.  
9. **Terminology:** Internal English may use `occupation family` / `family` / `family map`. Chinese user-facing taxonomy labels must use **职业大类** or **职业领域** only — never Chinese calques of “occupation family,” and never self-employment “family” marketing phrases. Interest stems prefer concrete activities and need not display family labels.

---

## 6. Exact 26-question blueprint (summary)

| Section | IDs | Count |
|---------|-----|------:|
| Constraints | `v2-c01` … `v2-c06` | 6 |
| Work Preferences | `v2-p01` … `v2-p10` | 10 |
| Interests and Fields | `v2-i01` … `v2-i10` | 10 |
| **Total** | | **26** |

All IDs unique. Every question has exactly four options `(a)(b)(c)(d)`.

---

## 7. Six Constraints questions

### v2-c01 — Night or rotating-shift tolerance

| Field | Content |
|-------|---------|
| Section | Constraints |
| ZH | 夜班或轮班（倒班）对你来说可以接受吗？ |
| EN | How acceptable are night shifts or rotating shifts for you? |
| Subtitle ZH | 轮班指日夜班交替或班次不固定。本题不讨论单纯的周末或晚间加班（见后续题目）。 |
| Options | (a) 不能接受夜班或轮班，这类岗位不考虑。 |
| | (b) 尽量避免；极偶尔可以商量 |
| | (c) 偶尔夜班或轮班可以接受 |
| | (d) 经常夜班或轮班也可以 |
| Signal | Night/rotating feasibility |
| Candidate dimension | Shift / schedule tolerance |
| Classification | Deal-breaker constraint (option **a** only) + soft tolerance (b–d) |
| Hard filter | **Yes — only (a)** hard-filters careers tagged as requiring nights/rotating |
| Dedup | Evening/weekend soft flexibility only in `v2-p10`. Do **not** equate (a) with “只要固定白班” alone. |
| Wording risk | Users may confuse overtime with rotating shifts — subtitle required |

### v2-c02 — Heavy physical-work tolerance

| Field | Content |
|-------|---------|
| Section | Constraints |
| ZH | 需要频繁搬抬重物或持续高强度体力的工作，你能接受吗？ |
| EN | Can you accept work that needs frequent heavy lifting or sustained high-intensity physical effort? |
| Subtitle ZH | 普通站立、走路或偶尔弯腰，单独不构成本题的硬性排除。 |
| Options | (a) 不能接受需要频繁搬抬重物或持续高强度体力的工作。 |
| | (b) 只能接受很轻的体力负担 |
| | (c) 中等体力可以，重体力尽量避免 |
| | (d) 较高或持续重体力也可以 |
| Signal | Heavy-physical feasibility |
| Candidate dimension | Physical demand tolerance |
| Classification | Deal-breaker (option **a** only) + soft tolerance (b–d) |
| Hard filter | **Yes — only (a)** hard-filters careers tagged heavy-physical |
| Dedup | Physical asked only here |
| Wording risk | “重物/高强度” still subjective — keep subtitle; never shame (a) |

### v2-c03 — Current English workplace readiness

| Field | Content |
|-------|---------|
| Section | Constraints |
| ZH | 目前用英语完成工作时，下面哪项更接近你的情况？ |
| EN | Which option best matches your current English use at work? |
| Subtitle ZH | 评估的是**当前**工作沟通，不是永久能力，也与个人价值无关。 |
| Options | (a) 简单指令仍常需要协助才能完成 |
| | (b) 常规工作沟通大体可以，复杂讨论较吃力 |
| | (c) 电话、邮件和一般说明沟通较顺畅 |
| | (d) 复杂讨论或偏专业的沟通也比较自如 |
| Signal | Current workplace English readiness |
| Candidate dimension | English readiness (soft) |
| Classification | Readiness / feasibility input |
| Hard filter | **Never** |
| Dedup | English only here |
| Wording risk | Avoid “差/好学生”; no ranking-cap formula here |

### v2-c04 — Training-duration tolerance

| Field | Content |
|-------|---------|
| Section | Constraints |
| ZH | 为进入一个新方向，你愿意投入多长时间准备或培训？ |
| EN | How long are you willing to prepare or train before entering a new direction? |
| Subtitle ZH | 选项表达意愿区间，不代表任何职业的官方培训时长。 |
| Options | (a) 希望尽快上手，只做很短的准备 |
| | (b) 可以接受约一年内的准备或培训 |
| | (c) 可以接受更长时间的系统学习 |
| | (d) 不确定，取决于具体方向 |
| Signal | Training-time willingness |
| Candidate dimension | Training duration tolerance |
| Classification | Readiness / feasibility |
| Hard filter | No |
| Dedup | Training duration only here |

### v2-c05 — Willingness to follow formal entry requirements

| Field | Content |
|-------|---------|
| Section | Constraints |
| ZH | 如果某个方向可能涉及证书、考试、执照或学徒/系统资质路径，你的态度是？ |
| EN | How do you feel if a direction may involve certificates, exams, licences, or apprenticeship / structured qualification paths? |
| Subtitle ZH | 本题只问态度。是否真的需要证件，须经后续 Human Verify，本题不作事实断言。 |
| Options | (a) 更希望路径尽量少正式证件要求 |
| | (b) 短期证书或考试可以；长期学徒较犹豫 |
| | (c) 愿意走可能需要正式证件或学徒的路径 |
| | (d) 不确定，要看投入与时间安排 |
| Signal | Formal-entry willingness |
| Candidate dimension | Licensing / certification willingness |
| Classification | Readiness / feasibility |
| Hard filter | **No** (not a V2.0 deal-breaker) |
| Dedup | Only here |

### v2-c06 — Preferred pace for entering a new career direction

| Field | Content |
|-------|---------|
| Section | Constraints |
| ZH | 你更希望以什么节奏进入一个新的职业方向？ |
| EN | What pace do you prefer when entering a new career direction? |
| Subtitle ZH | 中性描述起步节奏，不是移民评分，也不是“急需用钱”的判断。 |
| Options | (a) 先从基础岗位开始，边做边学 |
| | (b) 做一些短期准备后再进入 |
| | (c) 愿意先系统学习，再进入更匹配的方向 |
| | (d) 取决于具体职业，目前保持灵活 |
| Signal | Entry-pace / practicality preference |
| Candidate dimension | Newcomer entry practicality (soft; not immigration) |
| Classification | Readiness / feasibility |
| Hard filter | No |
| Dedup | Distinct from c04 (duration willingness vs pace style) |
| Wording risk | Avoid desperation framing |

---

## 8. Ten Work Preferences questions

### v2-p01 — Independent versus team-based work

| Field | Content |
|-------|---------|
| ZH | 日常完成任务时，你更偏好哪种方式？ |
| EN | How do you prefer to get work done day to day? |
| Options | (a) 偏独立完成，少打断 |
| | (b) 小范围配合即可 |
| | (c) 喜欢紧密团队协作 |
| | (d) 都可以，看岗位 |
| Signal | Solo vs team | Dimension: Work style fit | Soft | Hard filter: no |
| Dedup | Not leadership (`p09`) |

### v2-p02 — Hands-on versus desk/process tasks

| Field | Content |
|-------|---------|
| ZH | 你更想把时间花在哪类任务上？ |
| EN | What kind of tasks do you prefer spending time on? |
| Options | (a) 动手操作工具、设备或现场任务 |
| | (b) 动手与案头工作大约各一半 |
| | (c) 电脑、流程、文件等案头工作 |
| | (d) 不确定 |
| Signal | Hands-on vs desk | Work style fit | Soft | no HF |
| Dedup | Not physical capacity (`c02`) |

### v2-p03 — Indoor versus outdoor preference

| Field | Content |
|-------|---------|
| ZH | 工作环境上，你更偏好？ |
| EN | Which work environment do you prefer? |
| Options | (a) 主要在室内 |
| | (b) 室内为主，偶尔户外 |
| | (c) 经常户外或露天也可以 |
| | (d) 无所谓 |
| Signal | Environment | Indoor vs outdoor | Soft; **not** deal-breaker |
| Dedup | **Only** here |

### v2-p04 — Customer/public-facing tolerance

| Field | Content |
|-------|---------|
| ZH | 需要经常面对顾客、病人或公众时，你更倾向？ |
| EN | When work involves frequent contact with customers, patients, or the public, what fits you better? |
| Options | (a) 更希望少接触陌生公众 |
| | (b) 短暂接触可以 |
| | (c) 经常沟通服务也可以 |
| | (d) 喜欢高频对客互动 |
| Signal | Public contact | Customer-facing tolerance | Soft; not deal-breaker |
| Dedup | **Only** here |

### v2-p05 — Structured procedures versus flexible judgment

| Field | Content |
|-------|---------|
| ZH | 你更适应哪种任务推进方式？ |
| EN | Which way of working suits you better? |
| Options | (a) 流程清晰，按标准一步步执行 |
| | (b) 有框架，但可灵活调整 |
| | (c) 变化多，常要临场判断 |
| | (d) 都可以 |
| Signal | Structure vs flexibility | Work style fit | Soft | no HF |
| Dedup | Distinct from routine/variety (`p06`) |

### v2-p06 — Routine/familiar versus changing/varied work

| Field | Content |
|-------|---------|
| ZH | 一天中的工作内容，你更希望？ |
| EN | How much variety do you want in a typical workday? |
| Options | (a) 稳定重复、熟悉节奏 |
| | (b) 有一定变化 |
| | (c) 经常换任务或场景 |
| | (d) 不确定 |
| Signal | Routine vs variety | Work style fit (pace) | Soft | no HF |
| Dedup | Not the same as p05 (procedure vs judgment ≠ task variety) |

### v2-p07 — Stability versus upside trade-off *(revised)*

| Field | Content |
|-------|---------|
| ZH | 如果必须做个权衡，你更接近哪一边？ |
| EN | If you had to choose a trade-off, which side is closer to you? |
| Subtitle ZH | 不涉及具体薪资数字，也不承诺收入结果。 |
| Options | (a) 更看重稳定、可预期，接受上升空间可能有限 |
| | (b) 希望两者尽量平衡 |
| | (c) 可接受更多不确定，换取更大发展或上升空间 |
| | (d) 目前说不清，要看具体方向 |
| Signal | Stability–upside trade-off |
| Candidate dimension | **Stability versus upside preference** (combined candidate; final key in V2.3) |
| Classification | Soft preference |
| Hard filter | No |
| Dedup | Replaces separate “稳定性有多重要 / 收入有多重要” importance ratings |

### v2-p08 — Detail/process focus versus broad coordination *(new)*

| Field | Content |
|-------|---------|
| ZH | 你更擅长并更愿意把精力放在哪类工作上？ |
| EN | Where would you rather focus your effort? |
| Options | (a) 把细节、记录、标准或固定流程做准确 |
| | (b) 细节与协调各一半 |
| | (c) 协调多人、行程、任务或多项优先级 |
| | (d) 不确定 |
| Signal | Detail/process vs broad coordination |
| Candidate dimension | **Detail/process versus broad coordination** (explicit candidate; final key in V2.3) |
| Classification | Soft preference |
| Hard filter | No |
| Dedup | Helps Admin Assistant vs Facilities Coordinator; QC vs Production Supervisor; Bookkeeper vs Project Coordinator — **no numeric scores here** |

### v2-p09 — Leadership responsibility

| Field | Content |
|-------|---------|
| ZH | 你对带人、排班或做现场/小组负责人的兴趣如何？ |
| EN | How interested are you in leading people, scheduling, or taking charge of a team/site? |
| Options | (a) 暂时不想带人 |
| | (b) 可以协助负责人 |
| | (c) 愿意逐步承担管理责任 |
| | (d) 不确定 |
| Signal | Leadership appetite | Work style (leadership) | Soft | no HF |
| Dedup | **Only** here |

### v2-p10 — Evening/weekend flexibility beyond night-shift constraint

| Field | Content |
|-------|---------|
| ZH | 在**不是**夜班/轮班的前提下，周末或晚上工作对你来说？ |
| EN | Aside from night or rotating shifts, how do you feel about weekend or evening work? |
| Options | (a) 尽量只要常规工作日白天 |
| | (b) 偶尔周末或晚上可以 |
| | (c) 经常周末或晚上也可以 |
| | (d) 看安排，保持灵活 |
| Signal | Soft evening/weekend flexibility |
| Candidate dimension | Shift / schedule tolerance (soft) |
| Classification | Soft preference — **not** a V2.0 deal-breaker |
| Hard filter | No |
| Dedup | Night/rotating hard reject only in `c01` |

---

## 9–10. Ten scenario-based Interests and Fields questions (with exact four options)

**Rules applied:** No family name as the main stem; three substantive activity options + one neutral; later aggregate to **one** Field / Interest Affinity (≤20% soft weight deferred).

### v2-i01 — Tools, buildings, production floors

| Field | Content |
|-------|---------|
| ZH | 下面哪种工作日更吸引你？ |
| EN | Which kind of workday appeals to you more? |
| Options | (a) 用工具在现场安装、维修或加工（如水电暖通、焊接相关任务） |
| | (b) 巡检楼宇设备、机房与设施报警并做运行记录 |
| | (c) 在工厂流水线装配产品或操作生产设备 |
| | (d) 说不清，几种都可能 |
| Signal | Activity affinity | Dimension: Field / Interest Affinity | Interest-field | HF: no |
| Family map | (a) Skilled trades · (b) Building ops · (c) Manufacturing |

### v2-i02 — Helping in care, learning, or guest settings

| Field | Content |
|-------|---------|
| ZH | 如果工作常要帮助别人，你更想出现在哪种场景？ |
| EN | If work often means helping people, which setting appeals more? |
| Options | (a) 协助日常照护，或配合诊所/检验相关支持流程 |
| | (b) 协助孩子学习，或支持社区成员处理生活事务 |
| | (c) 在餐厅厨房备餐，或在酒店为客人办理入住接待 |
| | (d) 暂时说不清 |
| Map | (a) Healthcare support · (b) Education & community · (c) Hospitality & food |

### v2-i03 — Moving goods and public sites

| Field | Content |
|-------|---------|
| ZH | 下面哪类任务更让你有兴趣动手？ |
| EN | Which of these tasks interests you more? |
| Options | (a) 驾驶车辆完成货运或城际运送 |
| | (b) 在仓库分拣、打包、装卸并处理出入库 |
| | (c) 在市政、学校等机构场地做维护或后勤巡查 |
| | (d) 都可以了解一下 |
| Map | (a) Transportation & logistics · (b) Transportation & logistics · (c) Public-sector & institutional |

### v2-i04 — Information work and careful checking

| Field | Content |
|-------|---------|
| ZH | 面对信息和规则时，你更想做哪类事？ |
| EN | When working with information and rules, what appeals more? |
| Options | (a) 用电脑写程序、查数据或做图表分析 |
| | (b) 整理日程、文件流转和办公室日常协调 |
| | (c) 按标准检查产品或工序是否合格并做记录 |
| | (d) 不确定 |
| Map | (a) Technology · (b) Office & administration · (c) Manufacturing & production |

### v2-i05 — Talking with customers and one-to-one client service

| Field | Content |
|-------|---------|
| ZH | 和“外部的人”打交道时，你更想承担哪类角色？ |
| EN | When dealing with people outside your immediate team, which role appeals more? |
| Options | (a) 通过电话或在线聊天处理咨询与投诉 |
| | (b) 在门店介绍商品并促成购买 |
| | (c) 为个人客户提供一对一服务，安排预约并跟进需求 |
| | (d) 不确定，想先了解具体工作内容 |
| Map | (a) Sales & customer service · (b) Sales & customer service · (c) Self-employment-friendly |
| Risk | (c) is Self-employment-friendly work-model signal via concrete tasks only — **not** flexibility, income, or success promises; (d) is genuine neutral with **no** family mapping |

**Note on (d):** Genuine neutral / flexible (not a fourth family; no occupation-family signal). Substantive family signals are (a)(b)(c) only.

### v2-i06 — Repair craft, property fixes, clinical support

| Field | Content |
|-------|---------|
| ZH | 下面哪种“动手解决问题”的方式更吸引你？ |
| EN | Which way of solving problems hands-on appeals more? |
| Options | (a) 完成现场技工类任务（切割、安装、调试工具设备） |
| | (b) 处理公寓或物业里的报修与小修 |
| | (c) 协助牙科/药房/实验室等医疗支持环节（非医生执业） |
| | (d) 说不清 |
| Map | (a) Skilled trades · (b) Building ops · (c) Healthcare support |

### v2-i07 — Digital building, classrooms, orderly sites

| Field | Content |
|-------|---------|
| ZH | 你更想把一周的主要精力放在哪类成果上？ |
| EN | What kind of weekly outcomes appeal more? |
| Options | (a) 搭好可用的软件功能，或理顺网络/系统问题 |
| | (b) 帮学生跟上课堂，或组织社区活动支持 |
| | (c) 维护场所秩序与安全巡查（门岗、巡视、出入管理） |
| | (d) 还没想好 |
| Map | (a) Technology · (b) Education & community · (c) Public-sector & institutional |

### v2-i08 — Craft path, warehouse lead tasks, money records

| Field | Content |
|-------|---------|
| ZH | 如果要选一个“练得起来的本事”，你更靠近？ |
| EN | If you were building a practical skill, which direction feels closer? |
| Options | (a) 沿着技工手艺把现场活越做越稳 |
| | (b) 在仓储现场安排货位、节奏并协调同事接手 |
| | (c) 把发票、流水和对账做清楚 |
| | (d) 都可以再看看 |
| Map | (a) Skilled trades · (b) Transportation & logistics · (c) Office & administration |

### v2-i09 — Support desk, kitchen craft, independent coaching rhythm

| Field | Content |
|-------|---------|
| ZH | 下面哪种日常节奏更合你心意？ |
| EN | Which daily rhythm feels more like you? |
| Options | (a) 一个个解决同事的电脑或账号问题 |
| | (b) 在高温厨房按单出餐或备料 |
| | (c) 按预约表独立带训练或类似一对一服务 |
| | (d) 暂时没有明确偏好 |
| Map | (a) Technology · (b) Hospitality & food · (c) Self-employment-friendly |
| Risk | (c) ≠ easy money; fitness example is illustrative work model |

### v2-i10 — Care support desk, office hub, commercial facility upkeep

| Field | Content |
|-------|---------|
| ZH | 最后看工作落点：你更想人在哪里、事偏什么？ |
| EN | Where would you rather be grounded, doing what kind of work? |
| Options | (a) 在医疗相关环境做支持（行政、标本流转协助等，非医师） |
| | (b) 在办公室做前台、项目协调或行政枢纽 |
| | (c) 在商场/写字楼做清洁巡查与设施后勤 |
| | (d) 保持开放 |
| Map | (a) Healthcare support · (b) Office & administration · (c) Building ops |

---

## 11. Axis-deduplication register

| Axis | Sole question | Must not reappear in |
|------|---------------|----------------------|
| Night/rotating hard reject | `v2-c01`(a) | p10, interests |
| Evening/weekend soft flexibility | `v2-p10` | c01 |
| Heavy physical hard reject + soft physical | `v2-c02` | Work Preferences / Interests |
| English readiness | `v2-c03` | elsewhere |
| Training duration | `v2-c04` | elsewhere |
| Formal entry willingness | `v2-c05` | elsewhere |
| Indoor/outdoor | `v2-p03` | Constraints |
| Customer-facing | `v2-p04` | Constraints |
| Leadership | `v2-p09` | elsewhere |
| Stability–upside trade-off | `v2-p07` | no separate importance pair |
| Detail vs coordination | `v2-p08` | not mixed into p05 |
| Field interest | `v2-i01`–`i10` only | no triple category picks |

---

## 12. Deal-breaker mapping

| Deal-breaker | Activating response | Effect |
|--------------|---------------------|--------|
| Night or rotating shifts | **`v2-c01`(a)** only | Hard exclusion of conflicting occupations |
| Heavy physical (frequent heavy lifting **or** sustained high-intensity) | **`v2-c02`(a)** only | Hard exclusion of conflicting occupations |

**Not deal-breakers:** English; training; formal-entry willingness; indoor/outdoor; customer-facing; evening/weekend (`p10`); interest answers; c01/c02 options (b)(c)(d).

No open-ended additional deal-breakers in V2.0.

---

## 13. English-readiness safeguards

- Measures **current** workplace communication only (`c03`).  
- Concrete behavioral anchors (help with instructions → complex discussion).  
- Never hard-filters.  
- Never framed as permanent ability, personal worth, or student quality.  
- Later soft score / ranking caps / prep hints only (formulas deferred).

---

## 14. Interest-family coverage matrix

Substantive options only (neutral `(d)` never maps to a family).

| Q | Option | Family signal |
|---|--------|---------------|
| i01 | a | Skilled trades |
| i01 | b | Building operations & facilities |
| i01 | c | Manufacturing & production |
| i02 | a | Healthcare support |
| i02 | b | Education & community services |
| i02 | c | Hospitality & food services |
| i03 | a | Transportation & logistics |
| i03 | b | Transportation & logistics |
| i03 | c | Public-sector & institutional |
| i04 | a | Technology |
| i04 | b | Office & administration |
| i04 | c | Manufacturing & production |
| i05 | a | Sales & customer service |
| i05 | b | Sales & customer service |
| i05 | c | Self-employment-friendly |
| i06 | a | Skilled trades |
| i06 | b | Building operations & facilities |
| i06 | c | Healthcare support |
| i07 | a | Technology |
| i07 | b | Education & community services |
| i07 | c | Public-sector & institutional |
| i08 | a | Skilled trades |
| i08 | b | Transportation & logistics |
| i08 | c | Office & administration |
| i09 | a | Technology |
| i09 | b | Hospitality & food services |
| i09 | c | Self-employment-friendly |
| i10 | a | Healthcare support |
| i10 | b | Office & administration |
| i10 | c | Building operations & facilities |

### Family appearance totals (positive signal opportunities)

| Family | Count | Within 2–3? |
|--------|------:|:-----------:|
| Skilled trades | 3 | Yes |
| Building operations & facilities | 3 | Yes |
| Healthcare support | 3 | Yes |
| Transportation & logistics | 3 | Yes |
| Manufacturing & production | 2 | Yes |
| Office & administration | 3 | Yes |
| Technology | 3 | Yes |
| Sales & customer service | 2 | Yes |
| Education & community services | 2 | Yes |
| Hospitality & food services | 2 | Yes |
| Public-sector & institutional | 2 | Yes |
| Self-employment-friendly | 2 | Yes |
| **Total substantive mappings** | **30** | |

No family appears only inside a forced pairwise comparison. No family appears only negatively. Public-sector is not framed as guaranteed stability. Self-employment is not framed as easy/high-income/guaranteed.

All ten interest answers aggregate later into **one** normalized Field / Interest Affinity dimension (≤20% soft weight in V2.3–V2.4; formula not defined here).

---

## 15. Candidate dimension coverage matrix

Revised candidate set (**≤12**; final lock in V2.3):

| # | Candidate dimension | Primary questions |
|---|---------------------|-------------------|
| 1 | Field / Interest Affinity (aggregate) | i01–i10 |
| 2 | Work style fit (solo/team, hands-on/desk, structure, variety, leadership) | p01, p02, p05, p06, p09 |
| 3 | Physical demand tolerance | c02 (soft); HF via c02(a) |
| 4 | Indoor vs outdoor preference | p03 |
| 5 | Customer-facing tolerance | p04 |
| 6 | English readiness | c03 |
| 7 | Training duration tolerance | c04 |
| 8 | Licensing / formal-entry willingness | c05 |
| 9 | Shift / schedule tolerance | c01 soft + p10; HF via c01(a) |
| 10 | **Stability versus upside preference** | p07 |
| 11 | **Detail/process versus broad coordination** | p08 |
| 12 | Newcomer entry practicality | c06 |

**Count:** 12 candidates max. Merging work-style sub-signals in V2.3 may reduce below 12. **No 13th** without a new approved decision. No numeric weights here.

---

## 16. Occupation-pair stress review (signal only; no scores)

| Pair | Differentiating questions |
|------|---------------------------|
| Building Operator vs Property Maintenance | i01 b vs i06 b; p02; c02 |
| Building Operator vs Hospital Facilities | i01 b; c01; p10 |
| Admin Assistant vs Facilities Coordinator | i10 b / i04 b vs i01 b / i10 c; **p08**; p09 |
| Software Developer vs IT Support | i04 a vs i09 a; p04; c03 |
| Warehouse Associate vs Supervisor | i03 b vs i08 b; **p09**; p01 |
| Cook vs Food Service Supervisor | i02 c / i09 b; p02 vs **p09**; c02; c01 |
| Community Support vs Settlement | i02 b / i07 b; p04; c03 — profiles must carry remaining distinctness |
| Commercial Custodian vs School Custodian | i10 c vs i03 c; p03 |
| Truck Driver vs Local Delivery | i03 a (both logistics — profile + c01/p03/c02) |
| Personal Trainer vs Real Estate Salesperson | i05 c / i09 c vs i05 a–b; p04; c03; c05; p07 |

---

## 17. Mobile Next-button UX requirements

**Locked navigation: manual Next (not auto-advance, not delayed auto-advance).**

1. User selects one option.  
2. Selection stays **visibly highlighted**.  
3. **下一题** enables only after a selection.  
4. User presses **下一题** to advance.  
5. **返回上一题** always available when index &gt; 0.  
6. Returning restores the prior selection.  
7. Last question primary action: **查看结果**.  
8. Show **overall** progress (`n/26`) and **section** progress (e.g. 约束 2/6).  
9. One question per mobile viewport.  
10. Compatible with 6–8 minute target; keyboard focus and screen-reader-friendly controls.

**Do not implement UI in this phase.**

---

## 18. Answer-option quality rules

- Exactly four options every question.  
- Soft/interest items: include genuine neutral/flexible where appropriate.  
- Avoid repeated “非常重要”.  
- Prefer observable choices and trade-offs.  
- Deal-breaker items: one explicit reject; three increasing-tolerance options; no shaming.  
- Aim for ~two mobile lines per option.  
- Mutually understandable; minimize overlap within a question.

---

## 19. Bias and safety safeguards

- No age, gender-role, or medical-diagnosis questions.  
- Physical reject is job-demand preference, not disability judgment.  
- English is current readiness only.  
- No immigrant stereotypes or PR claims.  
- No education-prestige ranking.  
- No salary figures or income promises (`p07` trade-off only).  
- No unverified “this job requires licence X” facts (`c05` attitude only).  
- Newcomer-accessible ≠ low quality.  
- Self-employment ≠ easy/guaranteed success.  
- Public-sector ≠ guaranteed lifelong stability.

---

## 20. Copy-testing risk register

| ID | Risk | Mitigation |
|----|------|------------|
| c01 | 加班 vs 轮班混淆 | Subtitle definition |
| c02 | “重物/高强度”主观 | Subtitle; examples; HF only (a) |
| c03 | 自我评价羞耻或虚高 | Behavioral anchors |
| c05 | 被读成事实要求 | Subtitle: attitude only |
| c06 | 被读成经济窘迫 | Neutral pace wording |
| p05 vs p06 | 感觉重复 | Keep distinct stems in QA |
| p07 | 仍被读成要高薪 | No figures; trade-off framing |
| p08 | 细节流程 vs 多方协调边界不清 | Keep detail/records/standards/process distinct from coordinating people/schedules/tasks/priorities; do not redesign in V2.2 |
| i05/i09 SE options | 过度承诺 | Concrete tasks only; no flexibility/income/success marketing |
| i03 a vs local delivery | 区分弱 | Rely on profiles + schedule/physical prefs |
| Settlement vs CSW | 兴趣题区分有限 | V2.1 profile distinctness |

---

## 21. Acceptance criteria

This framework is acceptable when all are true:

1. Exactly **26** questions; sections **6 / 10 / 10**.  
2. IDs `v2-c01`…`c06`, `v2-p01`…`p10`, `v2-i01`…`i10` all unique.  
3. Every question has **exactly four** options.  
4. Only **`v2-c01`(a)** activates night/rotating hard filter.  
5. Only **`v2-c02`(a)** activates heavy-physical hard filter.  
6. English **never** hard-filters; no extra deal-breakers.  
7. `p07` is stability-versus-upside **trade-off**; `p08` is detail/process vs broad coordination.  
8. Indoor/outdoor, customer-facing, physical each asked **once**.  
9. Interests are activity/scenario-based; each family appears **2–3** times.  
10. Field / Interest Affinity remains **one** aggregate dimension.  
11. **No** numeric scores or weights assigned.  
12. Manual **Next-button** navigation is locked.  
13. V1 described as unchanged; no code in this phase.

---

## 22. Deferred scoring and implementation decisions

Deferred to V2.3–V2.4 (and later):

- Final dimension keys and count within 10–12  
- Soft-score weights (Field Affinity ≤20%)  
- Match % calibration  
- Career dimension vectors / tags wiring  
- Hard-filter tag schema on occupations  
- UI implementation behind feature flag  
- Automated fixtures  

---

## 23. Remaining open decisions

| ID | Issue | Options | Recommendation | Consequence |
|----|-------|---------|----------------|-------------|
| CTV2.2-F1 | Approve this exact 26Q bank for framework sign-off | Approve / edit copy | Approve after review | Unlocks later implementation phases |
| CTV2.2-F2 | Merge p05/p06 in V2.3 dimension model | Keep separate signals / merge | Decide in V2.3 | Dimension count |
| CTV2.2-F3 | Final name for stability–upside dimension | Keep trade-off name / split again | Keep combined candidate | Avoid social-desirability pair |
| CTV2.2-F4 | Truck vs local delivery interest split | Accept profile-led / add wording tweak | Profile-led; optional copy tweak | No 27th question |
| CTV2.2-F5 | Settlement vs CSW interest gap | Accept / minor i02 stem edit | Accept + profile distinctness | Stay at 26 |
| CTV2.2-F6 | Option ID scheme in code (`a`–`d` vs slugs) | Decide in V2.3 | Stable slugs later | Implementation |

---

## Document control

| Field | Value |
|-------|--------|
| Phase | V2.2 question framework documentation |
| Implements code? | **No** |
| Modifies V1? | **No** |
| Next phase when approved | V2.3 data model — **not started** |
