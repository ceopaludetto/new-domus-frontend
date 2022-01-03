import { makeVar } from "@apollo/client";

export const accessTokenStorage = makeVar<string | null>(null);

const initialValue = typeof window !== "undefined" ? document.querySelector("#__CONDOMINIUM__")?.innerHTML : null;
export const condominiumStorage = makeVar<string | null>(initialValue ? JSON.parse(initialValue) : null);
