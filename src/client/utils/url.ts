import { parse, stringify, ParsedQs } from "qs";

export function getURLWithCondominium(location: { pathname: string; search: string }) {
  if (location.search) {
    return `${location.pathname}${location.search}`;
  }

  return location.pathname;
}

type Location = { pathname: string; search?: string };

export class CondominiumURL {
  private location!: Location;

  private query: ParsedQs = {};

  public constructor(location: Location) {
    this.location = location;

    if (this.location.search) {
      if (this.location.search.includes("?")) {
        this.query = parse(this.location.search.split("?")[1]);
      } else {
        this.query = parse(this.location.search);
      }
    }
  }

  public hasCondominium() {
    return !!this.query.condominium;
  }

  public setCondominium(condominiumID: string) {
    this.query.condominium = condominiumID;
  }

  public getNormalizedURI() {
    if (Object.keys(this.query).length) {
      return `${this.location.pathname}?${stringify({ ...this.query })}`;
    }

    return this.location.pathname;
  }
}
