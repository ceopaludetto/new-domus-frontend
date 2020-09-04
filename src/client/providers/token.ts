export class AccessToken {
  private t = "";

  public set token(t: string) {
    this.t = t;
  }

  public get token() {
    return this.t;
  }
}
