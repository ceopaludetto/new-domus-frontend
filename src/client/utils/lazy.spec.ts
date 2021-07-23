import { routes } from "../providers/routes";
import { getModule, preload, hasFetchBefore } from "./lazy";
import { findRouteByName } from "./routes";

describe("lazy", () => {
  describe("getModule", () => {
    it("should return if default exported", () => {
      const lib = { default: () => "teste" };

      expect(getModule(lib)()).toBe("teste");
    });

    it("should return if no default exported", () => {
      const lib = () => "teste";

      expect(getModule(lib)()).toBe("teste");
    });
  });

  describe("hasFetchBefore", () => {
    it("should return true", () => {
      const c = () => {};

      c.fetchBefore = () => {};

      expect(hasFetchBefore(c)).toBe(true);
    });

    it("should return false in primitive value", () => {
      const c = "any value";

      expect(hasFetchBefore(c)).toBe(false);
    });

    it("should return false in object", () => {
      const c = {};

      expect(hasFetchBefore(c)).toBe(false);
    });
  });

  describe("preload", () => {
    it("should preload route", async () => {
      const client: Record<string, any> = { query: jest.fn(() => Promise.resolve()) };

      const components = await preload("/", { client: client as any });

      expect(Array.isArray(components)).toBe(true);
      expect(typeof components[0]).toBe("function");
      expect(components.length).toBe(2);

      expect(client.query).toBeCalledTimes(0);

      await preload("/app/blocks", { client: client as any });

      expect(client.query).toBeCalledTimes(1);
    });

    it("should preload component", async () => {
      const client: Record<string, any> = { query: jest.fn(() => Promise.resolve()) };
      const route = findRouteByName("@APP:BLOCKS:LIST", routes);

      if (route?.component) {
        const component = await preload(route?.component, { client: client as any });

        expect(typeof component).toBe("function");

        expect(client.query).toBeCalledTimes(1);
      }
    });
  });
});
