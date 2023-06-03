export function toLetters(num) {
  const code = 'A'.charCodeAt(0);
  let mod = num % 26,
    pow = Math.floor(num / 26);
  let out = String.fromCharCode(code + mod);
  return pow ? toLetters(num - pow * 26) + out : out;
}
