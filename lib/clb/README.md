# lib/clb

CLB 语言成绩转换 —— 算法与官方对照数据（V2.3 Phase 1）。

## 范围

- **已实现**：IELTS General Training → CLB（纯函数）
- **未实现**：UI、CELPIP、PTE、TEF、TCF

## Architecture Flow

```text
User Input (IELTS General Training bands)
        ↓
  validation.ts   ← 范围 / 0.5 步进校验
        ↓
  calculator.ts   ← 查 IRCC 阈值 → 四项 CLB + Overall
        ↓
  CLB Result      ← { ok, input, result } 或 { ok: false, input, error, field? }
        ↓
  UI（Phase 2+，本目录不包含）
```

## 文件职责

| 文件 | 职责 |
|------|------|
| `types.ts` | 输入 / 结果类型；统一 Tool API：`{ ok, input, result?, error?, field? }` |
| `constants.ts` | IRCC 映射阈值 + 来源元数据（**唯一**允许存放分值处）；含 Human Verify TODO |
| `validation.ts` | 校验 Listening / Reading / Writing / Speaking 是否为合法 IELTS 分 |
| `calculator.ts` | 纯函数 `calculateCLB(input)`：查表换算；`overall = min(四项 CLB)` |

## Tool API 示例

```ts
import { calculateCLB } from "@/lib/clb/calculator";

const outcome = calculateCLB({
  listening: 7.5,
  reading: 6.5,
  writing: 6.5,
  speaking: 6.5,
});

if (outcome.ok) {
  // outcome.input  — 标准化输入
  // outcome.result — { listening, reading, writing, speaking, overall }
} else {
  // outcome.input / outcome.error / outcome.field?
}
```

## 数据规则

对照表必须来自 IRCC / Canada.ca。禁止第三方网站。  
写入或更新 `constants.ts` 前须人工核对官方页（见文件内 `IELTS_GT_CLB_HUMAN_VERIFY_TODO`）。  
该 TODO 属于发版检查项，**不得删除**。
