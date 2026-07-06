export function getMinimumChange(changeInCents, denominations) {
  let remaining = changeInCents;

  return denominations.map((denomination) => {
    const count = Math.floor(remaining / denomination.value);
    remaining %= denomination.value;

    return {
      ...denomination,
      count,
    };
  });
}

export function getRandomChange(changeInCents, denominations) {
  let remaining = changeInCents;

  return denominations.map((denomination, index) => {
    const isLastDenomination = index === denominations.length - 1;
    const count = isLastDenomination ? Math.floor(remaining / denomination.value) : Math.floor(Math.random() * (Math.floor(remaining / denomination.value) + 1));
    remaining -= count * denomination.value;

    return {
      ...denomination,
      count,
    };
  });
}