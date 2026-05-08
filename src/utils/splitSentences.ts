const ABBREVIATIONS = [
  'Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Rev', 'Gen', 'Sgt', 'Cpl', 'Pvt',
  'Sr', 'Jr', 'St', 'Mt', 'Lt', 'Capt', 'Col', 'Gov', 'Sen', 'Rep',
  'Dept', 'Corp', 'Inc', 'Ltd', 'Co', 'Ave', 'Blvd', 'Rd', 'vs', 'etc',
  'approx', 'est', 'vol', 'no', 'fig',
  'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const PLACEHOLDER = '\x00';

export function splitSentences(text: string): string[] {
  let protected_ = text;

  // ① blocklist の略語を保護 (e.g. "Mr. " → "Mr\x00 ")
  const abbrevRegex = new RegExp(`\\b(${ABBREVIATIONS.join('|')})\\.(?=\\s)`, 'g');
  protected_ = protected_.replace(abbrevRegex, '$1' + PLACEHOLDER);

  // ② 単一大文字イニシャル（次の語が小文字始まりの場合のみ保護）
  protected_ = protected_.replace(/\b([A-Z])\.(?=\s+[a-z])/g, '$1' + PLACEHOLDER);

  // ③ 連続する大文字間のドット ("U.S." など)
  protected_ = protected_.replace(/\b([A-Z])\.(?=[A-Z])/g, '$1' + PLACEHOLDER);

  // ④ 固定の複合略語
  protected_ = protected_.replace(/\b(e\.g|i\.e|et al|cf)\.(?=\s)/g, '$1' + PLACEHOLDER);

  const parts = protected_
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return parts.map((s) => s.replaceAll(PLACEHOLDER, '.'));
}
