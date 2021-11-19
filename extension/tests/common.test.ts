import { readFromStorage, ScriptPrefs } from "../source/common";
import { createChromeFake, ChromeFake } from "./chrome_fake";

let chrome: ChromeFake;

beforeEach(() => {
  chrome = createChromeFake(jest.fn);
});

describe("Reading from storage", () => {
  chrome = createChromeFake(jest.fn);

  it("Outputs a call to the storage api", () => {
    readFromStorage<ScriptPrefs>("test");
  });
});
