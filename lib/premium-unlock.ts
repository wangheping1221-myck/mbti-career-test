export const PREMIUM_UNLOCK_STORAGE_KEY = "career-nav-premium-unlocked";

export function readPremiumUnlocked(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(PREMIUM_UNLOCK_STORAGE_KEY) === "true";
}

export function writePremiumUnlocked(unlocked: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  if (unlocked) {
    localStorage.setItem(PREMIUM_UNLOCK_STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(PREMIUM_UNLOCK_STORAGE_KEY);
  }
}

export async function verifyUnlockCode(
  code: string,
): Promise<{ valid: boolean; error?: string }> {
  const trimmed = code.trim();
  if (!trimmed) {
    return { valid: false, error: "请输入解锁码" };
  }

  try {
    const response = await fetch("/api/verify-unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: trimmed }),
    });

    if (!response.ok) {
      return { valid: false, error: "验证失败，请稍后重试" };
    }

    const data = (await response.json()) as { valid?: boolean };
    if (data.valid) {
      writePremiumUnlocked(true);
      return { valid: true };
    }

    return { valid: false, error: "解锁码无效，请核对后重试" };
  } catch {
    return { valid: false, error: "网络异常，请稍后重试" };
  }
}
