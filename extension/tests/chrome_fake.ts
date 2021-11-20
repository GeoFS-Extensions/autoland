import { ScriptPrefs, StorageEntry, UpdateInfo } from "../source/common";

function createDataFake(): StorageEntry {
  const devModeEnabled = false;
  const scriptPrefs: ScriptPrefs = {
    ap: true,
    fmc: true,
    spoilersArming: true,
    keyboardMapping: true,
  };
  const updateInfo: UpdateInfo = {
    shouldBeUpdated: false,
  };

  return {
    devModeEnabled,
    scriptPrefs,
    updateInfo,
  };
}

/**
 * Creates a fresh fake of the chrome api.
 * @param fakeConstructor Should be passed as `jest.fn`, not calling the function. Will be used to create api function fakes.
 */
export function createChromeFake(fakeConstructor: typeof jest.fn) {
  return {
    storage: {
      sync: {
        set: fakeConstructor(),
        get: fakeConstructor((keys: string) => {
          return Promise.resolve(createDataFake());
        }),
      },
    },
  };
}

export type ChromeFake = ReturnType<typeof createChromeFake>;
