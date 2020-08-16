

const FUZZ = 1e-3;
export function equln(n1, n2, fuzz = FUZZ) {
  return Math.abs(n1 - n2) < fuzz;
}

export function equlnPt(p1, p2, fuzz = FUZZ) {
  let z1 = p1.z || 0;
  let z2 = p2.z || 0;
  return equln(p1.x, p2.x, fuzz) && equln(p1.y, p2.y, fuzz) && equln(z1, z2, fuzz);
}

export function isReverseDir(p1, p2, fuzz = FUZZ) {
  let z1 = p1.z || 0;
  let z2 = p2.z || 0;
  return equln(p1.x, p2.x * -1, fuzz) && equln(p1.y, p2.y * -1, fuzz) && equln(z1, z2 * -1, fuzz);
}