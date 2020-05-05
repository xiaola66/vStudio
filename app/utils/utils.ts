/**
 * @description Check if the characters contain only Chinese characters, Numbers, underscores, and middle underscores
 * @author changChun Zhang
 * @date 2020-02-17
 * @param {string} character Check character
 * @returns {boolean} Check the results
 */
export function isAllowCharacter(character: string): boolean {
  const pattern = /^[\u4e00-\u9fa5\x00-\xffA-Za-z0-9-_].$/;
  return pattern.test(character);
}

/**
 * @description Whether a character exceeds the specified length
 * @author changChun Zhang
 * @date 2020-02-17
 * @param {string} character Check character
 * @param {number} [number=15] specified length
 * @returns {boolean} Check the results
 */
export function isOverflowLength(
  character: string,
  number: number = 15
): boolean {
  const { length } = character;
  return length > number;
}

/**
 * @description Check whether it is a character of specified length. Characters can only be entered in Chinese, number, bottom line and middle line
 * @author changChun Zhang
 * @date 2020-02-17
 * @param {string} character Check character
 * @param {number} [number=15] specified length
 * @returns {boolean} Check the results
 */
export function isSafeLengthCharacter(
  character: string,
  number: number = 15
): boolean {
  const result =
    isAllowCharacter(character) && !isOverflowLength(character, number);
  return result;
}

/**
 * @description Date formatting function
 * @author Zhao wei
 * @date 2020-02-17
 * @param {string} character Check character
 * @returns {string} Check the results
 */
export function formatDate(date: string) {
  const nowDate = new Date();
  const dateTime = new Date(date);
  const YY = dateTime.getFullYear();
  const MM =
    dateTime.getMonth() + 1 < 10
      ? '0' + (dateTime.getMonth() + 1)
      : dateTime.getMonth() + 1;
  const DD =
    dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
  const hh =
    dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours();
  const mm =
    dateTime.getMinutes() < 10
      ? '0' + dateTime.getMinutes()
      : dateTime.getMinutes();
  return nowDate.toLocaleDateString() == dateTime.toLocaleDateString()
    ? nowDate.getTime() < dateTime.getTime() + 1000 * 60 * 10 &&
      nowDate.getTime() > dateTime.getTime()
      ? `刚刚`
      : `今天 ${hh}:${mm}`
    : `${YY}-${MM}-${DD} ${hh}:${mm}`;
}
