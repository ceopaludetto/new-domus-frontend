import { createApplicationTheme, createApplicationCache } from "./create";

describe("createApplicationTheme", () => {
  it("should create theme varying in color mode", () => {
    const lightTheme = createApplicationTheme("light");
    expect(lightTheme.palette.mode).toBe("light");

    const darkTheme = createApplicationTheme("dark");
    expect(darkTheme.palette.mode).toBe("dark");
  });

  it("should change default radius", () => {
    const theme = createApplicationTheme("light");

    expect(theme.shape.borderRadius).toBe(6);
  });
});

describe("createApplicationCache", () => {
  it("should return a instance of emotion cache", () => {
    const cache = createApplicationCache();

    expect(cache).toBeTruthy();
  });
});
