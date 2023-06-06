import { z } from "zod";

export const ERROR_MSG = {
  "1001": "建立規則失敗，請稍後再重試。",
  "1002": "更新規則失敗，請稍後再重試。",
  "1003": "刪除規則失敗，請稍後再重試。",
  "1004": "啟用規則失敗，請稍後再重試。",
  "1005": "停用規則失敗，請稍後再重試。",

  "1101": "更新事件失敗，請稍後再重試。",
  "1102": "刪除事件失敗，請稍後再重試。",

  "1201": "帳號或密碼錯誤，請重新輸入。",

  "1301": "使用者名稱已被使用，請嘗試其他名稱。",
  "1302": "電子信箱已被使用，請嘗試其他信箱。",
  UNKNOWN: "未知的錯誤，請聯絡管理員或稍後再試。",
} as const;

export const getErrorMsg = (code: string): string =>
  ERROR_MSG[code as keyof typeof ERROR_MSG] ?? ERROR_MSG.UNKNOWN;

export const errorSchema = z.object({ response: z.object({ code: z.string() }) });
