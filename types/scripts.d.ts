export {};

type Require = (arg0: string) => any;

declare global {
  interface Window {
    autopilot_pp: {
      version: string;
      require: Require;
      ready: boolean;
    };
    fmc: {
      version: string;
      require: Require;
      ready: boolean;
    };
    keyboard_mapping: {
      version: string;
      require: Require;
      ready: boolean;
    };
    spoilers_arming: {
      version: string;
      require: Require;
    };
    navData: {
      statusCode: number;
      airports: { [key: string]: number[] };
      waypoints: { [key: string]: number[][] };
      navaids: { [key: string]: number[] };
    };
  }
}
