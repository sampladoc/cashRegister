export function parseMoneyToCents(amount) {
  return Math.round(Number(amount) * 100);
}

export function parseInputLines(fileContent) {
  return fileContent
    .split(/\r?\n/)
    .map((line, index) => ({
      lineNumber: index + 1,
      raw: line.trim(),
    }))
    .filter((line) => line.raw.length > 0)
    .map(({ lineNumber, raw }) => {
      const [owed, paid] = raw.split(",").map((x) => x.trim());

      return {
        lineNumber,
        raw,
        owedInCents: parseMoneyToCents(owed),
        paidInCents: parseMoneyToCents(paid),
      };
    });
}