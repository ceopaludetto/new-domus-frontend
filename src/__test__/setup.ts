import dotenv from "dotenv";
import MatchMediaMock from "jest-matchmedia-mock";

import { accessTokenStorage } from "@/client/providers/storage";

import "@testing-library/jest-dom";

let matchMedia!: MatchMediaMock;

dotenv.config({ path: ".env.development" });

beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

beforeEach(() => {
  accessTokenStorage.del();
});
