import { fileReader } from "./file";

describe("file", () => {
  describe("fileReader", () => {
    it("should read file", async () => {
      const file = new File(["oi"], "index.txt", { type: "text/plain" });

      const content = await fileReader(file);

      expect(content).toBe(`data:text/plain;base64,${window.btoa("oi")}`);
    });

    it("should throw", async () => {
      const file = {} as any;

      expect(fileReader(file)).rejects.toThrowError();
    });
  });
});
