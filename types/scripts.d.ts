// Keyboard mapping specific types
type callback = (event: KeyboardEvent) => void;
interface Keybind {
  code: string;
  altKey: boolean;
  shiftKey: boolean;
  ctrlKey: boolean;
}

interface Keybinds {
  [key: string]: Keybind;
}

type KeyDown = (event: KeyboardEvent) => void;

export { callback, Keybind, Keybinds, KeyDown };

declare global {
  interface Window {
    autopilot_pp: {
      version: string;
      require: Require;
      define: RequireDefine;
      requirejs: Require;
      ready: boolean;
    };
    fmc: {
      version: string;
      require: Require;
      define: RequireDefine;
      requirejs: Require;
      ready: boolean;
    };
    keyboard_mapping: {
      version: string;
      require: Require;
      define: RequireDefine;
      requirejs: Require;
      ready: boolean;
    };
    spoilers_arming: {
      version: string;
      require: Require;
      requirejs: Require;
      define: RequireDefine;
    };
    navData: {
      statusCode: number;
      airports: { [key: string]: number[] };
      waypoints: { [key: string]: number[][] };
      navaids: { [key: string]: number[] };
    };
  }
}
