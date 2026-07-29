const cadFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 将金额格式化为 CAD（两位小数），例如 $31.25 */
export function formatCad(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "—";
  }

  return cadFormatter.format(amount);
}

/** 解析用户输入的金额/数字字符串（允许小数，忽略千分位逗号） */
export function parseNumericInput(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, "");
  if (!trimmed) {
    return null;
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
}
