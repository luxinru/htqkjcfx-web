import * as Big from "big.js";

const covertFun = (val, divNum) => {
  if (val === "" || typeof val === "undefined" || val === null) {
    return "";
  }
  const num = parseFloat(val);
  return new Big(Number(num))
    .div(divNum)
    .toNumber()
    .toFixed(2);
};

export const $money100m = val => covertFun(val, 10000);
