export const DEFAULT_HOURS_PER_WEEK = 40;
export const DEFAULT_WEEKS_PER_YEAR = 52;
export const MAX_HOURS_PER_WEEK = 168;
export const MAX_WEEKS_PER_YEAR = 52;

/** 每周工时快捷选项；null 表示自定义 */
export const HOURS_PRESETS: ReadonlyArray<number | "custom"> = [
  20,
  30,
  35,
  37.5,
  40,
  44,
  "custom",
];

export const EXAMPLE_ANNUAL_SALARY = 65000;
