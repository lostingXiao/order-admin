/**
 * 判断是否为空
 */
export function validatenull (val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}

export const uuid = () => {
  let s = [];
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    const randomIndex = Math.floor(Math.random() * 0x10)
    s[i] = hexDigits.substring(randomIndex, randomIndex+1)
  }
  s[14] = '4'
  const index = (s[19] & 0x3) | 0x8
  s[19] = hexDigits.substring(index, index+1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}