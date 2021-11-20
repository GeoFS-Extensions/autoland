// TODO
const storageEntryName = "";

export interface ScriptPrefs {
  ap: boolean;
  fmc: boolean;
  spoilersArming: boolean;
  keyboardMapping: boolean;
}

export type UpdateInfo =
  | {
      shouldBeUpdated: true;
      new: string;
    }
  | {
      shouldBeUpdated: false;
    };

export interface StorageEntry {
  devModeEnabled: boolean;
  scriptPrefs: ScriptPrefs;
  updateInfo: UpdateInfo;
}

export function defaultPrefs(): StorageEntry {
  return {
    devModeEnabled: false,
    scriptPrefs: {
      ap: false,
      fmc: false,
      spoilersArming: false,
      keyboardMapping: true,
    },
    updateInfo: {
      shouldBeUpdated: false,
    },
  };
}

/**
 * Validates data not guarenteed to be valid, and returns a valid version of the data.
 */
export function validateUnsecureData(unsecureData: StorageEntry): StorageEntry {
  // TODO implement

  return { ...defaultPrefs(), ...unsecureData };
}

/**
 * A wrapper for {@link readFromStorageUnsecure} that returns a valid storage entry, ready to be used.
 */
export function readStorageData(): StorageEntry {
  let data = readFromStorageUnsecure<StorageEntry>(storageEntryName);
  data = validateUnsecureData(data);

  return data;
}

/**
 * Grabs data from chrome.storage and returns it.
 * **CAUTION**: do not use this function directly, its output cannot be trusted.
 * Use {@link readStorageData} to read from storage instead.
 * @param name The name of the entry to grab from storage.
 */
function readFromStorageUnsecure<T>(name: string): T {
  let toReturn: T;
  chrome.storage.sync
    .get(name)
    // destructure the response to get the first value and return it
    .then(({ data }) => (toReturn = data));
  return toReturn;
}

/**
 * Writes directly to storage. **CAUTION**: Make sure the data inputted here is valid, otherwise you risk intent destroyed on read!
 */
export function writeToStorage<T>(name: string, data: T): T {
  const toSave: { [key: string]: T } = {};
  toSave[name] = data;
  chrome.storage.sync
    .set(toSave)
    // the .then() forces to async operation to complete synchronously
    .then();
  return data;
}
