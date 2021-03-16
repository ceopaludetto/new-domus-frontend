export class AccessToken {
  private t = "";

  public set(t: string) {
    this.t = t;
  }

  public get() {
    return this.t;
  }

  public clear() {
    this.t = "";
  }

  public has() {
    return !!this.t;
  }
}
