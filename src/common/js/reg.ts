/** 手机号正则 */
export const PHONE_REGEXP = /^(13[0-9]|14[579]|15[012356789]|16[6]|17[0-9]|18[0-9]|19[189])[0-9]{8}$/

/** 邮箱正则 */
export const EMAIL_REGEXP = /^[\w-_]+(\.[\w-_]+)*@[\w-_]+(\.[\w-_]+)+$/

/** 匹配最多两位小数的正数 */
export const MOST_TWO_DCCIMAL = /^([1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2})$/

/** 匹配最多三位小数的正数 */
export const MOST_THREE_DCCIMAL = /^([1-9](\d+)?(\.\d{1,3})?$)|(^0$)|(^\d\.\d{1,3})$/

/** 匹配非负整数 */
export const POSITIVE_INTEGER = /^\d+$/

/** 数字和字母 */
export const NUMBER_LETTER = /^[A-Za-z0-9]+$/

/** 数字和英文逗号, */
export const NUMBER_ENGLISHCOMMA = /^[\d,]+$/
