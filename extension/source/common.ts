interface ScriptPrefs extends Record<string, unknown> {
  ap: boolean;
  fmc: boolean;
  spoilersArming: boolean;
  keyboardMapping: boolean;
}

interface UpdateInfo extends Record<string, unknown> {
  shouldBeUpdated: boolean;
  new?: string;
}

export interface StorageEntry extends Record<string, unknown> {
  devModeEnabled: boolean;
  scriptPrefs: ScriptPrefs;
  updateInfo: UpdateInfo;
}

/**
 * Grabs data from chrome.storage and returns it.
 * @param name The name of the entry to grab from storage.
 */
export function readFromStorage<T>(name: string): T {
  let toReturn: T;
  chrome.storage.sync
    .get(name)
    // destructure the response to get the first value and return it
    .then(({ data }) => (toReturn = data));
  return toReturn;
}

export function writeToStorage<T>(name: string, data: T): T {
  const toSave: { [key: string]: T } = {};
  toSave[name] = data;
  chrome.storage.sync
    .set(toSave)
    // the .then() forces to async operation to complete synchronously
    .then();
  return data;
}
