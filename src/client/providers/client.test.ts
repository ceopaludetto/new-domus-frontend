import { Client } from "urql";

import { saveToken, createURQLClient, fetchOptions } from "./client";
import { accessTokenStorage } from "./storage";

import "cross-fetch/polyfill";

describe("createClient", () => {
  it("should return a instance of urql client", () => {
    const { client } = createURQLClient(false);

    expect(client).toBeInstanceOf(Client);
  });

  it("should restore from urql state", () => {
    const script = document.createElement("script");
    script.id = "__URQL_STATE__";
    script.type = "application/json";
    script.innerHTML = JSON.stringify({ test: "" });
    document.body.appendChild(script);

    const { client } = createURQLClient(false);
    expect(client).toBeTruthy();
  });
});

describe("fetchOptions", () => {
  it("should return default options to requests", () => {
    const configurator = fetchOptions();
    expect(configurator()).toStrictEqual({ credentials: "include", mode: "cors", headers: {} });
  });

  it("should add accessToken to headers", () => {
    accessTokenStorage.set("dummytoken");

    const configurator = fetchOptions();
    expect(configurator()).toStrictEqual({
      credentials: "include",
      mode: "cors",
      headers: { Authorization: "Bearer dummytoken" },
    });
  });

  it("should add cookie header from server request", () => {
    const fn = jest.fn(() => "anycookie");
    const request = { header: fn };

    const configurator = fetchOptions(request as any);
    expect(configurator()).toStrictEqual({
      credentials: "include",
      mode: "cors",
      headers: { Cookie: "anycookie" },
    });
    expect(fn).toBeCalled();
  });
});

describe("saveTokenLink", () => {
  it("should add token to storage", async () => {
    jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(async () => ({ headers: new Headers({ AccessToken: "dummytoken" }) } as any));

    await saveToken("");
    expect(accessTokenStorage.get()).toBe("dummytoken");
    expect(window.fetch).toBeCalled();
  });
});
