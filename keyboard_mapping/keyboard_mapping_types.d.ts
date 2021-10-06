export type callback = (event: KeyboardEvent) => void;
export interface Keybind {
  code: string;
  altKey: boolean;
  shiftKey: boolean;
  ctrlKey: boolean;
}

export interface Keybinds {
  [key: string]: Keybind;
}

export type KeyDown = (event: KeyboardEvent) => void;
