// import { portfolios } from "../helpers/constants";

// input: {Instacart: [], Rippling: []}
// output: {Instacart: [], Rippling: []}
// sort everything in its own array
export const sort = (input, criteria = {}) => {
  return input;
};

// input: {Instacart: [], Rippling: []}
// output: {Instacart: [], Rippling: []}
// FIXME: use pointer, whoever is biggest, move it to the next pointer
export const pick = (input, NUMBER_OF_PICKS) => {
  const result = {};
  for (const key in input) {
    result[key] = input[key].slice(0, NUMBER_OF_PICKS);
  }
  console.log("pick result", result);
  return result;
};

export const grabTwitterhandles = (portfolios) => {
  let result = "";
  for (const portfolio in portfolios) {
    result += portfolio + ",";
  }
  return result.slice(0, -1);
};
