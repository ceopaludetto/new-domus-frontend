export { Block } from "./block.model";
export { City } from "./city.model";
export { Condominium } from "./condominium.model";
export { Local } from "./local.model";
export { PersonCondominium } from "./person.condominium.model";
export { Person } from "./person.model";
export { Phone } from "./phone.model";
export { State } from "./state.model";
export { User } from "./user.model";
export { Address } from "./address.model";

const context = require.context(".", false, /^(?!base).*\.model$/);
const entities = context.keys().map((k) => {
  const model = context(k);
  return Object.keys(model)
    .filter((i) => typeof model[i] === "function")
    .map((i) => model[i])[0];
});

export default entities;
