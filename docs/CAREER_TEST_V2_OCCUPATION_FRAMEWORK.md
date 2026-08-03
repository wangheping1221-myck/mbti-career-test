# Career Test V2 — Occupation Framework (V2.1)

**Document:** `docs/CAREER_TEST_V2_OCCUPATION_FRAMEWORK.md`  
**Phase:** V2.1 — Occupation framework documentation only  
**Status:** Draft for review (no career data, scoring, questions, UI, or HV research)  
**Source of truth:** `docs/PRD_CAREER_TEST_V2.md` (commit `f596011`) + approved V2.1 review revisions  
**Stable restore point:** Git tag `p5.8-complete`  
**V1:** Frozen — do not modify `lib/career-data.ts`, scoring, unlock, routes, or V1 UI

---

## 1. Scope and phase boundary

### In scope (this document)

- Exact **60** provisional occupation inventory for Career Test V2 launch  
- Family allocation, V1 mapping, title rules, near-duplicate register  
- Coverage notes, cross-cutting tag rules, HV priority planning  
- Editorial vs HV-gated field boundaries  

### Out of scope (this phase)

- Writing or editing code, V1 data, V2 data modules, questions, scoring, tests, UI  
- Human Verify research or official-source retrieval  
- Wages, employment outlook, immigration/PR claims, official NOC mapping as facts  
- Scoring values, dimension weights, match formulas  
- Expanding beyond 60 for launch (70–80 is future capacity only)  
- V2.2 question framework  

---

## 2. Locked V2.0 decisions inherited from the PRD

| ID | Decision |
|----|----------|
| CTV2-D1 | Exactly **26** questions (question bank not in this phase) |
| CTV2-D2 | Exactly **60** occupations at initial launch; architecture may grow to 70–80 later |
| CTV2-D3 | 10–12 scored dimensions + explicit constraints (scoring not in this phase) |
| CTV2-D4 | New V2 model **beside** frozen V1 |
| CTV2-D5 | Feature flag on `/career-test`; V1 default until release |
| CTV2-D6–D7 | Premium licensing/training/regulation HV-gated; no wages/outlook without separate HV |
| CTV2-D10 | No immigration pathway matching or PR claims |
| CTV2-D11 | Exactly two V2.0 deal-breakers (nights/rotating; heavy physical); English never a hard block |
| CTV2-D12 | Free results remain Top 5 |

---

## 3. Locked family allocations

| # | Primary family | Slots |
|---|----------------|------:|
| 1 | Skilled trades | 10 |
| 2 | Building operations & facilities | 7 |
| 3 | Healthcare support | 6 |
| 4 | Transportation & logistics | 6 |
| 5 | Manufacturing / production | 4 |
| 6 | Office & administration | 6 |
| 7 | Technology | 5 |
| 8 | Sales & customer service | 4 |
| 9 | Education & community services | 4 |
| 10 | Hospitality & food services | 4 |
| 11 | Public-sector & institutional | 3 |
| 12 | Self-employment-friendly | 1 |
| | **Total** | **60** |

No family-count changes are allowed in this framework.

---

## 4. V1 occupation audit and mapping (all 28)

Exact V1 count from frozen `lib/career-data.ts`: **28**.  
V1 IDs, titles, categories, and scoring remain **untouched**. Mapping below is for V2 inventory design only.

| V1 ID | V1 English title | V1 Chinese title | V1 category | V2 treatment | V2 provisional ID | V2 primary family |
|-------|------------------|------------------|-------------|------------------|-------------------|-------------------|
| `power-engineer` | Power Engineer | 动力工程师 / 锅炉与设备运行员 | skilled-trades | Retain EN; **revise ZH working title** | `v2-power-engineer` | Skilled trades |
| `building-operator` | Building Operator | 楼宇运行维护员 | facilities | Retain | `v2-building-operator` | Building operations & facilities |
| `hvac-technician` | HVAC Technician | 暖通空调技师 | skilled-trades | Retain | `v2-hvac-technician` | Skilled trades |
| `electrician` | Electrician | 电工 | skilled-trades | Retain | `v2-electrician` | Skilled trades |
| `plumber` | Plumber | 水管工 | skilled-trades | Retain | `v2-plumber` | Skilled trades |
| `instrumentation-technician` | Instrumentation Technician | 仪表控制技师 | skilled-trades | Retain | `v2-instrumentation-technician` | Skilled trades |
| `millwright` | Millwright | 工业机械维修技师 | skilled-trades | Retain | `v2-millwright` | Skilled trades |
| `welder` | Welder | 焊工 | skilled-trades | Retain | `v2-welder` | Skilled trades |
| `truck-driver` | Truck Driver | 卡车司机 | transportation | Retain | `v2-truck-driver` | Transportation & logistics |
| `auto-mechanic` | Auto Mechanic | 汽车维修技师 | skilled-trades | **Rename** EN working title | `v2-auto-service-technician` | Skilled trades |
| `government-maintenance-worker` | Government Maintenance Worker | 政府设施维护员 | facilities | **Rename + move** | `v2-municipal-maintenance-worker` | Public-sector & institutional |
| `school-custodian` | School Custodian / Maintenance | 学校清洁与设施维护 | facilities | **Move** | `v2-school-custodian` | Public-sector & institutional |
| `hospital-facilities-technician` | Hospital Facilities Technician | 医院设施维护技师 | facilities | Retain | `v2-hospital-facilities-technician` | Building operations & facilities |
| `data-analyst` | Data Analyst | 数据分析师 | technology | Retain | `v2-data-analyst` | Technology |
| `software-developer` | Software Developer | 软件开发工程师 | technology | Retain | `v2-software-developer` | Technology |
| `project-coordinator` | Project Coordinator | 项目协调员 | office-construction | Retain | `v2-project-coordinator` | Office & administration |
| `estimator` | Estimator | 工程造价估算员 | office-construction | **Rename** | `v2-estimator` | Office & administration |
| `psw` | PSW | 个人支持工作者 | healthcare | Retain | `v2-psw` | Healthcare support |
| `security-guard` | Security Guard | 保安 | security | **Move** | `v2-security-guard` | Public-sector & institutional |
| `warehouse-supervisor` | Warehouse Supervisor | 仓库主管 | logistics | Retain | `v2-warehouse-supervisor` | Transportation & logistics |
| `bookkeeper` | Bookkeeper | 簿记员 | office-construction | Retain | `v2-bookkeeper` | Office & administration |
| `early-childhood-educator` | Early Childhood Educator | 幼教老师 | education | Retain | `v2-early-childhood-educator` | Education & community services |
| `customer-service-representative` | Customer Service Representative | 客服代表 | sales-service | Retain | `v2-customer-service-representative` | Sales & customer service |
| `local-delivery-driver` | Local Delivery Driver | 本地配送司机 | transportation | Retain | `v2-local-delivery-driver` | Transportation & logistics |
| `commercial-cook` | Commercial Cook | 商业厨师 | hospitality | **Rename** | `v2-commercial-cook` | Hospitality & food services |
| `real-estate-agent` | Real Estate Agent | 房产经纪 | sales-service | **Rename + keep in Sales** (not SE primary) | `v2-real-estate-salesperson` | Sales & customer service |
| `graphic-designer` | Graphic Designer | 平面设计师 | creative | **Move** | `v2-graphic-designer` | Technology |
| `personal-trainer` | Personal Trainer | 健身教练 | healthcare | **Move** to Self-employment-friendly; revise ZH | `v2-personal-trainer` | Self-employment-friendly |

**Confirmation:** All **28** V1 occupations map into V2. None are retired from the V2 launch set. V1 source records are not modified by this document.

---

## 5. Exact initial 60-occupation inventory by family

Working titles are **provisional**. They are not official NOC titles. No licence, training-duration, wage, outlook, or immigration facts are asserted.

### 5.1 Skilled trades (10)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-electrician` | Electrician | 电工 | retained | Installs and maintains electrical systems in residential, commercial, or industrial settings. | Not HVAC service or instrumentation controls | A | Provincial trade rules vary — HV before regulated claims |
| `v2-plumber` | Plumber | 水管工 | retained | Installs and repairs water, drainage, and related piping systems. | Not HVAC or millwright | A | |
| `v2-hvac-technician` | HVAC Technician | 暖通空调技师 | retained | Installs and services heating, ventilation, and air-conditioning equipment, often on site. | Field service ≠ building-systems operator rounds | A | Scope vs refrigeration naming — HV |
| `v2-millwright` | Millwright | 工业机械技师 | retained | Installs, aligns, and repairs industrial machinery in plant environments. | Industrial machinery ≠ property maintenance | A | Optional EN subtitle “Industrial Mechanic (Millwright)” later |
| `v2-welder` | Welder | 焊工 | retained | Joins metal by welding in fabrication, construction, or repair settings. | Fabrication ≠ millwright maintenance | A | |
| `v2-auto-service-technician` | Automotive Service Technician | 汽车维修技师 | renamed from Auto Mechanic | Diagnoses and repairs light vehicles in automotive shops. | Light vehicle shop ≠ industrial millwright | A | Prefer over “Auto Mechanic” |
| `v2-instrumentation-technician` | Instrumentation Technician | 仪表控制技师 | retained | Maintains sensors and control instruments in industrial process settings. | Process controls ≠ electrician install | A | Less common title — validate later |
| `v2-power-engineer` | Power Engineer | 动力设备运行员（Power Engineer） | retained EN; revised ZH | Operates and monitors boilers and related plant energy systems, often under shift patterns. | Plant energy ops ≠ commercial building operator | A | See §7 Power Engineer title rule |
| `v2-carpenter` | Carpenter | 木工 | new | Builds and installs woodwork and formwork on construction or finish projects. | Skilled carpentry ≠ general construction labour | A | |
| `v2-construction-labourer` | Construction Labourer | 建筑工人 | new | Performs general construction-site labour supporting skilled trades. | Entry/general labour ≠ carpenter craft | C | Broad title — keep profile general |

### 5.2 Building operations & facilities (7)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-building-operator` | Building Operator | 楼宇运行员 | retained | Monitors and operates building mechanical systems (plant equipment, rounds, alarms). | Systems operations ≠ unit repair handyman | B | Do not add generic “Facilities Technician” twin |
| `v2-hospital-facilities-technician` | Hospital Facilities Technician | 医院设施技师 | retained | Maintains hospital plant and facilities infrastructure in a 24/7 institutional setting. | Hospital setting/urgency ≠ commercial building operator | B | Not a clinical care role |
| `v2-property-maintenance-worker` | Property Maintenance Worker | 物业维修工 | new | Performs hands-on unit and property repairs for residential or commercial sites. | Fixture/repair tasks ≠ building-systems operator | C | Employed-property framing; SE tag optional later |
| `v2-commercial-custodian` | Commercial Custodian | 商业清洁与后勤员 | new | Provides cleaning and light facility upkeep in commercial buildings. | Commercial sites ≠ school-board custodian | C | |
| `v2-groundskeeper` | Groundskeeper | 场地绿化维护员 | new | Maintains outdoor grounds, landscaping, and seasonal outdoor site upkeep. | Outdoor grounds ≠ indoor custodial | C | |
| `v2-maintenance-helper` | Maintenance Helper | 维修帮工 | new | Entry-level helper supporting operators and trades with basic facility tasks. | Junior learning role ≠ operator responsibility | C | Must not mirror operator profile |
| `v2-facilities-coordinator` | Facilities Coordinator | 设施协调员 | new | Coordinates work orders, vendors, and facility logistics with lower hands-on load. | Coordination ≠ administrative assistant generalist | B | Keep facilities-domain explicit |

### 5.3 Healthcare support (6)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-psw` | Personal Support Worker | 个人支持工作者 | retained | Provides personal care and daily living support in home or facility settings. | Personal care ≠ clinic admin or lab support | A | Provincial naming aliases (PSW/HCA/CCA) — HV |
| `v2-medical-office-assistant` | Medical Office Assistant | 医疗行政助理 | new | Handles clinic administration, scheduling, and front-office patient flow. | Office/admin ≠ lab specimen workflows | B | |
| `v2-pharmacy-assistant` | Pharmacy Assistant | 药房助理 | new | Supports pharmacy counter and dispensing workflow under pharmacy team direction. | Assistant title ≠ Pharmacy Technician (not used here) | B | **Do not rename** to Pharmacy Technician; scope HV-gated |
| `v2-dental-assistant` | Dental Assistant | 牙科助理 | new | Assists chairside dental procedures and clinic sterilization workflows. | Clinical dental assist ≠ medical office admin | A | |
| `v2-dietary-aide` | Dietary Aide | 膳食助理 | new | Supports patient/resident meal service in hospital or long-term care food operations. | Institutional meals ≠ restaurant cook | C | |
| `v2-medical-laboratory-assistant` | Medical Laboratory Assistant | 医疗实验室助理 | **new (replaces Personal Trainer in this family)** | Supports laboratory specimen handling and routine lab-support tasks in clinical lab settings. | Lab support ≠ medical office admin; not a physician/lab scientist role | A | Provisional title; **high-priority** title/training/regulation HV — no factual claims here |

### 5.4 Transportation & logistics (6)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-truck-driver` | Truck Driver | 卡车司机 | retained | Drives freight on highway or long-route patterns under commercial driving expectations. | Freight/highway ≠ local urban delivery | A | Licence-class facts HV-only |
| `v2-local-delivery-driver` | Local Delivery Driver | 本地配送司机 | retained | Completes local or urban delivery routes for goods or parcels. | Local routes ≠ courier-as-separate-occupation (omitted) | C | |
| `v2-warehouse-associate` | Warehouse Associate | 仓库理货员 | new | Performs picking, packing, and receiving on the warehouse floor. | Floor associate ≠ supervisor leadership | C | Material Handler omitted as near-duplicate |
| `v2-forklift-operator` | Forklift Operator | 叉车操作员 | new | Moves materials using forklift or similar warehouse equipment. | Equipment-focused ≠ general associate | B | |
| `v2-warehouse-supervisor` | Warehouse Supervisor | 仓库主管 | retained | Leads warehouse team coordination, shifts, and floor priorities. | Leadership ≠ associate tasking | B | |
| `v2-transit-operator` | Transit Bus Operator | 公交车驾驶员 | new | Operates passenger transit buses on fixed routes. | Passenger transit ≠ freight trucking | A | |

### 5.5 Manufacturing / production (4)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-assembler` | Assembler | 装配工 | new | Assembles products or components on a production line. | Hand/line assembly ≠ machine operator | C | “Production Worker” omitted as too broad |
| `v2-machine-operator` | Machine Operator | 机器操作员 | new | Operates production machinery under shop procedures. | Machine focus ≠ assembler | C | |
| `v2-quality-control-inspector` | Quality Control Inspector | 质检员 | new | Inspects products or process quality and records results. | Inspection/documentation ≠ line assembly | B | |
| `v2-production-supervisor` | Production Supervisor | 生产主管 | new | Supervises manufacturing line people and output. | Leadership ≠ operator | B | |

### 5.6 Office & administration (6)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-administrative-assistant` | Administrative Assistant | 行政助理 | new | Provides broad office support: scheduling, documents, and coordination. | General office ≠ facilities-domain coordinator | C | Office Coordinator omitted |
| `v2-bookkeeper` | Bookkeeper | 簿记员 | retained | Performs day-to-day bookkeeping and reconciliations. | Bookkeeping ≠ payroll clerk specialty | B | Software certificates ≠ licence — HV carefully |
| `v2-project-coordinator` | Project Coordinator | 项目协调员 | retained | Coordinates schedules, stakeholders, and project documentation. | Project cadence ≠ front-desk receptionist | B | |
| `v2-estimator` | Construction Estimator | 工程造价估算员 | renamed | Estimates construction costs from plans and quotes. | Costing specialty ≠ general admin | B | |
| `v2-receptionist` | Receptionist | 前台接待 | new | Greets visitors and handles front-desk calls and arrivals. | First-contact desk ≠ full admin portfolio | C | |
| `v2-payroll-clerk` | Payroll Clerk | 薪资文员 | new | Processes payroll inputs within office finance workflows. | Payroll process ≠ AR/AP bookkeeper | B | |

### 5.7 Technology (5)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-software-developer` | Software Developer | 软件开发工程师 | retained | Designs and builds software applications. | Builds software ≠ end-user IT support | C | Competitive hiring; English soft-weight only |
| `v2-data-analyst` | Data Analyst | 数据分析师 | retained | Analyzes business data using spreadsheets, SQL, or BI tools. | Analysis ≠ application development | C | |
| `v2-it-support-specialist` | IT Support Specialist | IT 技术支持专员 | new | Troubleshoots end-user devices and workplace applications. | Support desk ≠ software development | B | Help Desk Technician omitted as twin |
| `v2-network-technician` | Computer Network Technician | 计算机网络技师 | new | Installs and maintains network connectivity and related equipment. | Network infra ≠ desktop support | B | |
| `v2-graphic-designer` | Graphic Designer | 平面设计师 | moved from V1 creative | Creates visual design assets for brands and media. | Creative-digital ≠ developer coding | C | May later receive SE cross-tag; primary stays Technology |

### 5.8 Sales & customer service (4)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-customer-service-representative` | Customer Service Representative | 客服代表 | retained | Handles customer inquiries by phone, chat, or email. | General CSR ≠ separate call-centre occupation (omitted) | C | |
| `v2-retail-sales-associate` | Retail Sales Associate | 零售销售员 | new | Sells and assists customers on a retail floor. | In-store retail ≠ phone CSR | C | |
| `v2-inside-sales-representative` | Inside Sales Representative | 内部销售代表 | new | Pursues sales outcomes from an office or remote sales channel. | Quota-oriented sales ≠ service CSR | B | |
| `v2-real-estate-salesperson` | Real Estate Salesperson | 房地产销售人员 | renamed from Real Estate Agent; **moved into Sales** | Helps clients buy, sell, or lease property under brokerage work models. | Property sales ≠ retail associate; not SE primary family | A | **Do not** use 房产经纪 until HV; regulation/licensing fully HV-gated; optional later SE cross-tag |

### 5.9 Education & community services (4)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-early-childhood-educator` | Early Childhood Educator | 幼教老师 | retained | Educates and cares for young children in childcare settings. | ECE classroom ≠ K–12 educational assistant | A | |
| `v2-educational-assistant` | Educational Assistant | 教育助理 | new | Supports teachers and students in K–12 school settings. | School support ≠ ECE | B | |
| `v2-community-support-worker` | Community Support Worker | 社区支持工作者 | new | Supports community members with daily living and community participation goals. | Broad community support ≠ newcomer-settlement focus | B | Strict distinct profile vs settlement |
| `v2-settlement-worker` | Settlement Worker | 新移民安置工作者 | new | Helps newcomers access settlement orientation, referrals, and related services. | Newcomer settlement mission ≠ general CSW | C | **No** immigration pathway or PR claims in copy |

### 5.10 Hospitality & food services (4)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-commercial-cook` | Cook | 商业厨师 | renamed from Commercial Cook | Prepares food in commercial kitchens (restaurants, cafeterias, central kitchens). | Culinary craft ≠ food-service supervision | B | Red Seal / cert paths HV later |
| `v2-kitchen-helper` | Kitchen Helper | 厨房帮工 | new | Provides entry prep and kitchen support in commercial kitchens. | Junior support ≠ cook responsibility | C | |
| `v2-food-service-supervisor` | Food Service Supervisor | 餐饮主管 | new | Supervises food-service staff, shifts, and service standards. | People/ops leadership ≠ cooking craft | B | |
| `v2-hotel-front-desk-agent` | Hotel Front Desk Agent | 酒店前台 | new | Handles guest check-in/out and front-of-house hotel service. | Hotel guest service ≠ retail sales | B | English soft-weight often higher |

### 5.11 Public-sector & institutional (3)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-municipal-maintenance-worker` | Municipal Maintenance Worker | 市政设施维护员 | renamed + moved | Maintains municipal or public facilities under public-sector hiring contexts. | Public employer context ≠ commercial property maintenance | C | Hiring-process risk copy ≠ licence claim |
| `v2-school-custodian` | School Custodian | 学校清洁与设施维护 | moved | Provides custodial and light maintenance support in school settings. | School-board setting ≠ commercial custodian | C | |
| `v2-security-guard` | Security Guard | 保安 | moved | Provides site access control, patrol, and security presence (often shift-heavy). | Security presence ≠ facilities repair | A | Licence claims HV-only |

### 5.12 Self-employment-friendly (1)

| Prov. ID | English working title | Chinese working title | V1 relationship | Distinct profile | Nearby distinction | HV priority | Publication-risk note |
|----------|----------------------|----------------------|-----------------|------------------|--------------------|-------------|------------------------|
| `v2-personal-trainer` | Personal Trainer | 私人健身教练 | moved from Healthcare; revised ZH | Coaches clients on exercise using flexible, often independent or contractor-style work models. | Fitness coaching work-model focus ≠ clinical healthcare support roles | B | Self-employment is a **work-model profile**, not a business-success or income guarantee; certification claims HV-gated |

---

## 6. Family-count validation (exactly 60)

| Primary family | Count | Status |
|----------------|------:|--------|
| Skilled trades | 10 | OK |
| Building operations & facilities | 7 | OK |
| Healthcare support | 6 | OK |
| Transportation & logistics | 6 | OK |
| Manufacturing / production | 4 | OK |
| Office & administration | 6 | OK |
| Technology | 5 | OK |
| Sales & customer service | 4 | OK |
| Education & community services | 4 | OK |
| Hospitality & food services | 4 | OK |
| Public-sector & institutional | 3 | OK |
| Self-employment-friendly | 1 | OK |
| **Total** | **60** | **OK** |

**Objective checks:**

- Every occupation has **exactly one** primary family.  
- No duplicate provisional IDs.  
- No duplicate occupation records.  
- Locked allocation counts match.  
- Cross-cutting tags (when used later) must **not** create extra occupation rows.

### Three-way inventory revision confirmation

| Revision | Applied? |
|----------|----------|
| Healthcare: Personal Trainer **removed**; Medical Laboratory Assistant **added** | Yes — `v2-medical-laboratory-assistant` |
| Sales: Financial Services Representative **removed**; Real Estate Salesperson **in Sales** | Yes — `v2-real-estate-salesperson` |
| Self-employment-friendly: Personal Trainer is the **sole** primary occupation | Yes — `v2-personal-trainer` |
| Financial Services Representative **not** in launch 60 | Yes — deferred to §11 backlog |

---

## 7. Working-title and Chinese-title rules

1. Titles in this document are **working titles** for product design — not official NOC titles.  
2. English and Chinese strings are display candidates; IDs remain stable and locale-agnostic.  
3. Do not invent employer brands or proprietary role names.  
4. Do not present titles as government-certified names until HV sign-off.  
5. Prefer Canada-recognizable wording understandable to Chinese-speaking newcomers.  
6. Avoid unnecessarily narrow or misleadingly broad labels when a clearer common title exists.

### Locked Power Engineer title

| Field | Locked value |
|-------|----------------|
| English working title | **Power Engineer** |
| Chinese working title | **动力设备运行员（Power Engineer）** |

**Rationale:** The English term is retained as a Canada-facing working title. The Chinese form uses 动力设备运行员 plus the English term in parentheses so the product does **not** imply a general professional engineering occupation via standalone **动力工程师**. All formal title, certification, and class requirements remain **HV-gated**.

### Locked Pharmacy Assistant title

| Field | Locked value |
|-------|----------------|
| English working title | **Pharmacy Assistant** |
| Chinese working title | **药房助理** |

Do **not** silently rename to Pharmacy Technician. Title and scope remain pending Human Verify.

### Locked Real Estate Salesperson Chinese title

| Field | Locked value |
|-------|----------------|
| English working title | **Real Estate Salesperson** |
| Chinese working title | **房地产销售人员** |

Do **not** use **房产经纪** until Human Verify. Regulation and licensing facts remain HV-gated.

### Locked Personal Trainer Chinese title (SE primary)

| Field | Locked value |
|-------|----------------|
| English working title | **Personal Trainer** |
| Chinese working title | **私人健身教练** |

---

## 8. Occupation inclusion and exclusion criteria

### Inclusion

- Relevant to Canada job search for Chinese-speaking newcomers, students, and career changers  
- Distinct enough work-setting / work-style profile from nearby inventory rows  
- Fits exactly one locked primary family  
- Can support editorial distinctness notes without inventing regulated facts  
- Aligns with PRD exclusion of immigration/PR as a value proposition  

### Exclusion (initial V2)

- Roles whose primary pitch is immigration or PR  
- Professional-degree-only “easy match” roles (e.g. physician, lawyer) as casual matches  
- Near-duplicate titles that would collapse into identical profiles  
- Employer-brand-only titles  
- Occupations whose published licensing/training claims lack HV when those fields are shown  
- Financial Services Representative (deferred — see §11)

### Explicitly omitted near-duplicate titles (not in initial 60)

- Generic Facilities Technician  
- Office Coordinator  
- Material Handler  
- Help Desk Technician  
- Courier  
- Call-Centre Representative  
- Production Worker  

---

## 9. Near-duplicate and omitted-title register

### 9.1 Approved “keep both with strict distinct profiles”

Later V2.3–V2.4 scoring/result work **must** evaluate result diversity and prevent near-identical occupations from unnecessarily dominating the Top 5. That rule is **not** implemented in this phase. No scoring values are assigned here.

| Pair | Distinct profiles (must remain non-interchangeable) |
|------|-----------------------------------------------------|
| Building Operator vs Hospital Facilities Technician | Commercial/multi-building systems operations vs hospital plant/facilities in a 24/7 clinical-campus setting; urgency and institutional constraints differ |
| Building Operator vs Property Maintenance Worker | Systems monitoring/plant rounds vs hands-on unit and property repair tasks |
| Commercial Custodian vs School Custodian | Commercial building cleaning/logistics vs school-board institutional custodial context |
| Community Support Worker vs Settlement Worker | Broad community living support vs newcomer settlement orientation and referrals (**no PR claims**) |
| Administrative Assistant vs Facilities Coordinator | General office portfolio vs facilities work-order/vendor coordination domain |
| Cook vs Food Service Supervisor | Culinary production craft vs people/shift/service leadership |
| Warehouse Associate vs Warehouse Supervisor | Floor task execution vs team leadership and shift coordination |
| Software Developer vs IT Support Specialist | Building software vs supporting end-user technology |
| Medical Office Assistant vs Medical Laboratory Assistant | Clinic front-office/admin workflows vs laboratory specimen/lab-support workflows |

### 9.2 Omitted to prevent near-duplicates

| Omitted title | Reason |
|---------------|--------|
| Facilities Technician (generic) | Collides with Building Operator / hospital facilities profiles |
| Office Coordinator | Collides with Administrative Assistant |
| Material Handler | Collides with Warehouse Associate |
| Help Desk Technician | Collides with IT Support Specialist |
| Courier | Collides with Local Delivery Driver |
| Call-Centre Representative | Channel variant of Customer Service Representative |
| Production Worker | Overly broad vs Assembler / Machine Operator |

---

## 10. Coverage matrix

Qualitative coverage of the exact 60 (editorial assessment only; no scores):

| Axis | Present in inventory? | Notes |
|------|----------------------|-------|
| Physical vs non-physical | Yes | Trades/labour vs office/tech/admin |
| Indoor vs outdoor | Yes | Groundskeeper, construction, some delivery/HVAC; indoor majority |
| Independent vs team | Yes | Truck/delivery/SE trainer vs supervisors/ECE/CSR |
| Customer-facing vs low-contact | Yes | Sales/hotel/CSR vs millwright/assembler/QC |
| Lower vs higher English readiness (soft only) | Yes | Helpers/warehouse vs developer/analyst/real estate/hotel |
| Shorter vs longer training tolerance | Yes | Helpers/retail vs trades/ECE/power engineer paths (duration facts HV-gated) |
| Daytime vs shift-heavy | Yes | Schools/offices vs security/PSW/cook/hospital facilities/transit/power engineer |
| Regulated vs less regulated entry (provisional) | Yes | Many Group A titles vs warehouse/custodial/helpers — status HV-gated |
| Entry-level vs advancement | Yes | Helpers/associates vs supervisors/estimators/developers |
| Newcomer-accessible vs credential-dependent | Yes | Both present; English never a permanent exclusion |

---

## 11. Known profile gaps deferred to 61–80

These are **not** in the initial 60:

| Backlog candidate | Why deferred |
|-------------------|--------------|
| **Financial Services Representative** | Title breadth, employer variation, and possible regulated-adjacent claims need later review; **removed from launch 60** |
| Agriculture / farm worker | Sector coverage gap |
| Food processing worker | Manufacturing-adjacent gap |
| Esthetician / hairstylist | Personal services gap |
| Childcare assistant (non-ECE) | Entry vs regulated ECE distinction |
| Laboratory technologist (higher credential) | Distinct from Medical Laboratory Assistant — avoid collapse |
| Heavy equipment operator | Construction equipment niche |
| Sheet metal worker | Additional trade niche |
| Social service worker (college pathway) | Community services depth |
| Nursing / regulated clinical professions | Excluded by PRD professional-degree easy-match rule |

Architecture may later expand toward 70–80 occupations without changing family-count locks for the initial 60.

---

## 12. Cross-cutting tag rules

Cross-cutting tags annotate occupations; they **must not**:

- Create a second occupation record  
- Change primary family  
- Bypass deal-breaker or soft-score design in this phase  

### Allowed future tag examples (not scored here)

| Tag | Intent |
|-----|--------|
| `newcomer-accessible` | Relatively approachable entry framing (editorial) |
| `self-employment-friendly` | Work-model flexibility — **not** income guarantee |
| `shift-common` | Shift patterns often present (factual claims HV if published as fact) |
| `outdoor-common` | Outdoor work common |
| `often-licensed` | Marker that HV is required before licence copy |

### Approved later SE cross-tag candidates (primary family unchanged)

- Graphic Designer → remains Technology  
- Property Maintenance Worker → remains Building operations & facilities  
- Real Estate Salesperson → remains Sales & customer service  

**Sole Self-employment-friendly primary occupation:** Personal Trainer (`v2-personal-trainer`).

---

## 13. Human Verify priority groups

**No external HV research is performed in this phase.**

### Criteria

| Group | Criteria |
|-------|----------|
| **A — High priority** | Likely regulated/licensed **or** high risk of false legal/credential claims; needed before any live regulated field |
| **B — Medium priority** | Certification-common or premium entry-path copy likely; HV before premium publication of those fields |
| **C — Lower risk** | Primarily editorial work-style profiles; still requires content QA; no licence assertions |

### Group A

`v2-electrician`, `v2-plumber`, `v2-hvac-technician`, `v2-millwright`, `v2-welder`, `v2-auto-service-technician`, `v2-instrumentation-technician`, `v2-power-engineer`, `v2-carpenter`, `v2-psw`, `v2-dental-assistant`, `v2-medical-laboratory-assistant`, `v2-early-childhood-educator`, `v2-security-guard`, `v2-truck-driver`, `v2-transit-operator`, `v2-real-estate-salesperson`

### Group B

`v2-building-operator`, `v2-hospital-facilities-technician`, `v2-facilities-coordinator`, `v2-medical-office-assistant`, `v2-pharmacy-assistant`, `v2-educational-assistant`, `v2-community-support-worker`, `v2-bookkeeper`, `v2-payroll-clerk`, `v2-forklift-operator`, `v2-commercial-cook`, `v2-food-service-supervisor`, `v2-hotel-front-desk-agent`, `v2-network-technician`, `v2-it-support-specialist`, `v2-estimator`, `v2-project-coordinator`, `v2-quality-control-inspector`, `v2-production-supervisor`, `v2-warehouse-supervisor`, `v2-inside-sales-representative`, `v2-personal-trainer`

### Group C

`v2-construction-labourer`, `v2-property-maintenance-worker`, `v2-commercial-custodian`, `v2-groundskeeper`, `v2-maintenance-helper`, `v2-dietary-aide`, `v2-local-delivery-driver`, `v2-warehouse-associate`, `v2-assembler`, `v2-machine-operator`, `v2-administrative-assistant`, `v2-receptionist`, `v2-software-developer`, `v2-data-analyst`, `v2-graphic-designer`, `v2-customer-service-representative`, `v2-retail-sales-associate`, `v2-settlement-worker`, `v2-kitchen-helper`, `v2-municipal-maintenance-worker`, `v2-school-custodian`

---

## 14. Per-occupation HV checklist

For **every** occupation, before publishing regulated or training facts, complete:

1. Regulated status (yes/no/unclear) with source artifact  
2. Mandatory licence (if any)  
3. Mandatory certification (if any)  
4. Apprenticeship requirement (if any)  
5. Mandatory education pathway (if any)  
6. Safety-sensitive requirements (if relevant and published)  
7. Typical shift / on-call pattern **only if** later presented as fact  
8. Sign-off metadata: source URL, retrieved date, verifier  

Until checklist artifacts exist, omit those fields from live product copy.

---

## 15. Publication-risk register

| Risk | Occupations / area | Mitigation |
|------|--------------------|------------|
| ZH implies professional engineer | Power Engineer | Locked ZH: 动力设备运行员（Power Engineer） |
| Broker title before HV | Real Estate Salesperson | Use 房地产销售人员; block 房产经纪 until HV |
| Pharmacy Technician mislabel | Pharmacy Assistant | Keep Assistant; no silent rename |
| Lab title/regulation ambiguity | Medical Laboratory Assistant | Group A HV before any credential claims |
| PSW provincial aliases | Personal Support Worker | HV naming before regulated copy |
| Settlement copy drifts into PR claims | Settlement Worker | Explicit non-goal; copy review |
| Near-identical Top 5 dominance | Pairs in §9.1 | Deferred diversity rule in V2.3–V2.4 |
| SE slot read as income promise | Personal Trainer | Work-model disclaimer only |
| Broad labour title | Construction Labourer | Keep profile general |
| Facilities vs clinical confusion | Hospital Facilities Technician | Non-clinical framing |

---

## 16. Fields allowed for editorial drafting (V2.1)

- Provisional V2 ID  
- English / Chinese working titles (within locked rules)  
- Primary family  
- V1 relationship notes  
- Short distinct-profile statements  
- Nearby-occupation distinctions  
- Provisional physical / customer-facing / indoor-outdoor **profile notes** (non-factual marketing care)  
- Cross-cutting tag candidates  
- HV priority group  
- Publication-risk notes  

---

## 17. Fields blocked until Human Verify

- Regulated status presented as fact  
- Licences  
- Mandatory certification  
- Apprenticeship requirements  
- Mandatory education  
- Factual training duration  
- Safety-sensitive requirements presented as fact  
- Factual shift / on-call patterns  
- Official NOC mapping  

---

## 18. Intentionally deferred fields

Deferred beyond editorial V2.1 (and blocked from invention now):

- Wages / salary bands  
- Employment outlook  
- Immigration relevance / pathway matching / PR claims  
- Official NOC codes or official NOC titles as product truth  
- Scoring values, dimension weights, match percentages, ranking formulas  

---

## 19. Acceptance criteria

This V2.1 framework document is acceptable when all of the following are true:

1. Exactly **60** occupations are listed.  
2. Every occupation has **exactly one** primary family.  
3. Family counts match the locked allocation table.  
4. No duplicate provisional IDs or duplicate occupation records.  
5. Three-way inventory revision is applied:  
   - Medical Laboratory Assistant ∈ Healthcare support  
   - Real Estate Salesperson ∈ Sales & customer service  
   - Personal Trainer = sole Self-employment-friendly primary  
6. Financial Services Representative is **not** in the launch 60.  
7. Power Engineer Chinese working title is **动力设备运行员（Power Engineer）**, not standalone 动力工程师.  
8. Pharmacy Assistant is not renamed Pharmacy Technician.  
9. V1 data/IDs/titles/categories/scoring are described as untouched.  
10. No wages, outlook, immigration, NOC, licence, or training-duration **facts** were invented.  
11. Near-duplicate keep-both pairs and omitted titles are documented.  
12. Document remains documentation-only (no code or data modules).  

**This phase** does not require implementing V2 data files.

---

## 20. Remaining open decisions

These are **not** blockers for reviewing this framework document, but need explicit product approval before later phases treat them as final:

| ID | Issue | Options | Recommended | Consequence |
|----|-------|---------|-------------|-------------|
| CTV2.1-F1 | Approve this exact 60 inventory for framework sign-off | Approve / request row edits | Approve | Unlocks later V2.2/V2.3 prep after commit approval |
| CTV2.1-F2 | Millwright English display subtitle | Millwright only / add Industrial Mechanic (Millwright) | Decide in title polish | Display clarity |
| CTV2.1-F3 | Settlement Worker vs Community Support Worker copy separation checklist | Accept §9.1 / merge later | Keep both | Prevent profile collapse |
| CTV2.1-F4 | When SE cross-tags apply to designer / property maintenance / real estate | V2.3 tags / later | Later tags only | No extra primary rows |
| CTV2.1-F5 | Medical Laboratory Assistant final EN/ZH after HV | Keep provisional / rename post-HV | Keep provisional until HV | Avoid false credential claims |
| CTV2.1-F6 | Real Estate Chinese upgrade to 房产经纪 | Only after HV / never | Only after HV | Compliance |
| CTV2.1-F7 | Diversity rule details for near-duplicate Top 5 control | Specify in V2.3–V2.4 | Defer | Scoring phase ownership |
| CTV2.1-F8 | Priority order for 61–80 backlog (incl. Financial Services Representative) | Product ranking later | Defer | Expansion planning |

---

## Document control

| Field | Value |
|-------|--------|
| Phase | V2.1 occupation framework documentation |
| Implements code or V2 data? | **No** |
| Modifies V1? | **No** |
| Next phase (when approved & committed) | V2.2 question framework — **not started** |
