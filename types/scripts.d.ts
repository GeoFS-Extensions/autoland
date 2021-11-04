export {};

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
