class TokenStorage {
  private state: string | null;

  public constructor(initialValue?: string) {
    this.state = initialValue ?? null;
  }

  public get() {
    return this.state;
  }

  public set(next: string | null) {
    this.state = next;
  }

  public del() {
    this.state = null;
  }
}

export const accessTokenStorage = new TokenStorage();
