import test from "node:test";
import assert from "node:assert/strict";
import { calculateChange } from "../src/cashRegister.js";
import { parseMoneyToCents, parseInputLines } from "../src/parser.js";

test("parseMoneyToCents converts dollars to cents", () => {
  assert.equal(parseMoneyToCents("2.12"), 212);
  assert.equal(parseMoneyToCents("3.00"), 300);
});

test("parseInputLines parses multiple transactions", () => {
  const input = `2.12,3.00
1.97,2.00`;

  assert.deepEqual(parseInputLines(input), [
    { owedInCents: 212, paidInCents: 300 },
    { owedInCents: 197, paidInCents: 200 },
  ]);
});

test("calculateChange returns minimum change when change is not divisible by random divisor", () => {
  const result = calculateChange(212, 300, {
    randomDivisor: 3,
    currency: {
      denominations: [
        { singular: "dollar", plural: "dollars", value: 100 },
        { singular: "quarter", plural: "quarters", value: 25 },
        { singular: "dime", plural: "dimes", value: 10 },
        { singular: "nickel", plural: "nickels", value: 5 },
        { singular: "penny", plural: "pennies", value: 1 },
      ],
    },
  });

  assert.equal(result, "3 quarters,1 dime,3 pennies");
});

test("calculateChange returns correct total even when random strategy is used", () => {
  const result = calculateChange(333, 500);

  const total = result.split(",").reduce((sum, item) => {
    const [countText, ...nameParts] = item.trim().split(" ");
    const count = Number(countText);
    const name = nameParts.join(" ");

    const values = {
      dollar: 100,
      dollars: 100,
      quarter: 25,
      quarters: 25,
      dime: 10,
      dimes: 10,
      nickel: 5,
      nickels: 5,
      penny: 1,
      pennies: 1,
    };

    return sum + count * values[name];
  }, 0);

  assert.equal(total, 167);
});