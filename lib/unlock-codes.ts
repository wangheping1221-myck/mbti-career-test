/** 服务端解锁码校验（代码仅存于环境变量，不暴露给前端） */

export function normalizeUnlockCode(code: string): string {
  return code.trim().toUpperCase().replace(/[\s-]+/g, "");
}

export function getValidUnlockCodes(): string[] {
  const raw = process.env.PREMIUM_UNLOCK_CODES ?? "";

  return raw
    .split(",")
    .map(normalizeUnlockCode)
    .filter(Boolean);
}

export function isValidUnlockCode(code: string): boolean {
  const normalized = normalizeUnlockCode(code);
  if (!normalized) {
    return false;
  }

  const validCodes = getValidUnlockCodes();
  return validCodes.length > 0 && validCodes.includes(normalized);
}
