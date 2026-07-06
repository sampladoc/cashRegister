import { USD, GBP } from "./denominations.js";
import { getMinimumChange, getRandomChange } from "./changeStrategies.js";

const DEFAULT_OPTIONS = {
    currency: GBP,
    randomDivisor: 3,
};

export function formatChange(change) {
    return change
        .filter((item) => item.count > 0)
        .map((item) => {
            const label = item.count === 1 ? item.singular : item.plural;
            return `${item.count} ${label}`;
        })
        .join(", ");
}

export function calculateChange(owedInCents, paidInCents, options = DEFAULT_OPTIONS) {
    const changeInCents = paidInCents - owedInCents;

    if (changeInCents < 0) {
        throw new Error(`Paid $${(paidInCents / 100)} is less than owed $${(owedInCents / 100).toFixed(2)}.`);
    }

    const shouldUseRandomStrategy = changeInCents % options.randomDivisor === 0;

    const change = shouldUseRandomStrategy
        ? getRandomChange(changeInCents, options.currency.denominations)
        : getMinimumChange(changeInCents, options.currency.denominations);

    return formatChange(change);
}