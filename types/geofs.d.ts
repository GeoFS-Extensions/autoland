export interface Object3DOptions {
  "3dModel": Model;
  animations: { [key: string]: any }[];
  brakesController: boolean;
  model: string;
  name: string;
  originalScale: number[];
  points: { [key: string]: any };
  position: number[];
  scale: number[];
  type: number;
  [key: string]: any;
}
export declare class Object3D {
  constructor(a?: Object3DOptions);
  _name: string;
  _nodeName: string;
  _children: Object3D[];
  _points: { [key: string]: any };
  _collisionPoints: any[];
  visible: boolean;
  _options: Object3DOptions;
  _rotation: any;
  _position: number[];

  reset(): void;
  setInitiallRotation(a: any): void;
  rotateInitialRotation(a: any): void;
  rotate(a: any): void;
  rotateX(a: any): void;
  rotateY(a: any): void;
  rotateZ(a: any): void;
  setRotationX(a: any): void;
  setRotationY(a: any): void;
  setRotationZ(a: any): void;
  rotateParentFrameX(a: any): void;
  rotateParentFrameY(a: any): void;
  rotateParentFrameZ(a: any): void;
  getRotation(): any;
  setInitialPosition(a: number[]): void;
  setInitialScale(a: number[]): void;
  scale(a: number | number[], b: any): void;
  setPosition(a: any): void;
  translate(a: any): void;
  setTranslation(a: any): void;
  setScale(a: any, b: any): void;
  setOpacity(a: any): void;
  setScaleOffset(a: any, b: any): void;
  getPosition(): number[];
  getLocalPosition(): number[];
  resetAnimatedTrasnform(): void;
  resetRotationMatrix(): void;
  setVectorWorldPosition(a: any): any;
  compute(a: any): void;
  render(a: any): void;
  setModel(a: Model): void;
  setEntity(a: any): void;
  getModel(a?: any): Model;
  getNode(): any;
  getNodePosition(): number[];
  getNodeRotation(): any;
  setLight(a: any): void;
  getWorldFrame(): any;
  getWorldPosition(): number[];
  getLlaLocation(): number[];
  addChild(a: Object3D): void;
  setVisibility(a: any, b: any): void;
  findModelInAncestry(): Model;
  getParent(): Object3D;
  propagateToTree(a: any, b: any): void;
  destroy(): void;

  utilities?: {
    getPointLla(a: any, b: any): any;
  };

  [key: string]: any;
}
export declare class Model {
  constructor(a: any, b?: any);
  _model: any;
  setOpacity(a: any): void;
  setRotation(a: any, b: any): void;
  setScale(a: any): void;
  setPositionOrientationAndScale(a: any, b: any, c: any): void;
  setLocation(a: any): void;
  setColor(a: any): void;
  setCssColor(a: any): void;
  changeTexture(a: any, b: any, c: any): void;
  hide(): void;
  show(): void;
  destroy(): void;
  remove(): void;

  [key: string]: any;
}

export interface OverlayDefinition {
  url: string;
  anchor: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  size: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  visibility: boolean;
  opacity: number;
  scale: {
    x: number;
    y: number;
  };
  rescale: boolean;
  rescalePosition: boolean;
  alignment: {
    x: string;
    y: string;
  };
  overlays: any[];
  [key: string]: any;
}

export declare class cssTransform {
  constructor();
  _$element: typeof $;
  positionY: number;
  positionX: number;
  rotation: number;
  offset: {
    x: number;
    y: number;
  };
  // these to should be class variables, but I cant get them to work
  rotationThreshold: number;
  translationThreshold: number;

  setDrawOrder(a: number): void;
  setUrl(a: string): void;
  setText(a: string): void;
  setTtitle(a: string): void;
  setClass(a: string): void;
  setStyle(a: string | number | null): void;
  loaded(): void;
  setFrameSize(a: { x: number; y: number }): void;
  setVisibility(a: boolean): void;
  setAnchor(a: { x: number; y: number }): void;
  setRotationCenter(a: { x: number; y: number }): void;
  setSize(a: { x: number; y: number }): void;
  setPosition(a: { x: number; y: number }): void;
  setPositionX(a: number): void;
  setPositionY(a: number): void;
  setPositionOffset(a: { x: number; y: number }): void;
  setOpacity(a: number): void;
  setRotation(a: number): void;
  destroy(): void;

  [key: string]: any;
}

export declare class Overlay {
  constructor(a: any, b: any);
  definition: OverlayDefinition;
  children: Overlay[];
  size: {
    x: number;
    y: number;
  };
  iconFrame: {
    x: number;
    y: number;
  };
  scale: {
    x: number;
    y: number;
  };
  positionOffset: {
    x: number;
    y: number;
  };
  _offset: {
    x: number;
    y: number;
  };
  _sizeScale: number;
  rotation: number;
  opacity: number;
  anchor: {
    x: number;
    y: number;
  };
  visibility: boolean;
  overlay: cssTransform;

  setVisibility(a: boolean): void;
  setOpacity(a: number): void;
  scaleAllProperties(a?: { x: number; y: number }): void;
  scaleAndPlace(a: any, b: any, c: any): void;
  place(a: any): void;
  scaleFromParent(a: { x: number; y: number }): { x: number; y: number };
  positionFromParentRotation(): { x: number; y: number };
  animate(a: boolean): void;
  translateIcon(a: number, b: string): void;
  rotate(a: number): void;
  setText(a: string): void;
  setTitle(a: string): void;
  destroy(): void;

  [key: string]: any;
}

export declare class RigidBody {
  constructor();
  s_inverseMass: number;
  mass: number;
  minLinearVelocity: number;
  minAngularVelocity: number;
  v_linearVelocity: number[];
  v_angularVelocity: number[];
  v_totalForce: number[];
  v_totalTorque: number[];
  v_prevLinearVelocity: number[];
  v_prevTotalTorque: number[];
  v_acceleration: number[];
  v_torque: number[];
  gravityForce: number[];

  reset(): void;
  setMassProps(a: number, b: number[] | number): void;
  getLinearVelocity(): number[];
  getAngularVelocity(): number[];
  setLinearVelocity(a: number[]): void;
  setAngularVelocity(a: number[]): void;
  getVelocityInLocalPoint(a: number[]): number[];
  getForceInLocalPoint(a: number[]): number[];
  applyCentralForce(a: number[]): void;
  applyTorque(a: number[]): void;
  applyForce(a: number[], b: number[]): void;
  applyCentralImpulse(a: number[]): void;
  applyTorqueImpulse(a: number[]): void;
  applyImpulse(a: number[]): void;
  computeJacobian(a: number, b: number, c: number[], d: number[]): number;
}

type RigidBodyType = typeof RigidBody;

export interface AircraftDefinition {
  scale: number;
  startupTime: number;
  com: number[];
  startAltitude: number;
  cockpitScaleFix: number;
  motionSensitivity: number;
  cameras: {
    distance: number;
    position: number[];
  };
  parts: any[];
  instruments: {
    [key: string]: {
      [key: string]: any;
    };
  };
  [key: string]: any;
}

export declare class Aircraft {
  constructor(a: any);
  engine: {
    rpm: number;
    on: boolean;
  };
  object3d: Object3D;
  brakesOn: boolean;
  groundContact: boolean;
  lastLlaLocaiton: number[];
  collResult: {
    location: number[];
    normal: number[];
  };
  relativeAltitude: number;
  htr: number[];
  htrAngularSpeed: number[];
  veldir: number[];
  trueAirSpeed: number;
  liveryId: string;
  setup: AircraftDefinition;
  definition: AircraftDefinition;

  controllers: {
    pitch: {
      recenter: boolean;
      sensitivity: number;
      ratio: number;
    };
    roll: {
      recenter: boolean;
      sensitivity: number;
      ratio: number;
    };
    yaw: {
      recenter: boolean;
      sensitivity: number;
      ratio: number;
    };
  };

  parts: {
    [key: string]: {
      [key: string]: any;
    };
  };

  airfoils: any[];
  engines: any[];
  balloons: any[];
  wheels: any[];
  collisionPoints: any[];
  lights: any[];
  suspensions: any[];

  getCurrentCoordinates(): number[];
  addShadow(): boolean;
  removeShadow(): void;
  loadDefault(a?: string): void;
  parseRecord(a: string): any;
  change(a: string, b: string, c: any, d: any): any;
  loadLivery(a: string): void;
  loadWithLivery(a: any, b: any, c: string): void;
  load(a: string, b: any, c?: any, d?: any): Promise<any>;
  init(a?: any, b?: any, c?: any, d?: any): void;
  loadCockpit(): Promise<any>;
  addParts(a?: any, b?: any, c?: any): void;
  setVisibility(a: any): void;
  unloadAircraft(): void;
  reset(a: any): void;
  place(a?: any, b?: any): void;
  placeParts(a: any): void;
  placePart(a: any): void;
  render(): void;
  startEngine(): void;
  stopEngine(): void;
  addOffsets(a?: any, b?: any): void;
  fixCockpitScale(a: any): void;
  crash(): void;
  [key: string]: any;
}

export declare class PID {
  constructor(a: number, b: number, c: number);
  _kp: number;
  _ki: number;
  _kd: number;
  _maxOutput: number;
  _minOutput: number;
  _setPoint: number;
  _integral: number;
  _previousError: number;
  _previousInput: number;
  reset(): void;
  initialize(a: number, b: number): void;
  set(a: number, b: number, c: number): void;
  compute(a: number, b: number): number;
  [key: string]: any;
}

export declare class Indicator {
  constructor(a: InstrumentsDefinitions);
  definition: InstrumentsDefinitions;
  visibility: boolean;
  overlay: Overlay;
  scale(): void;
  show(): void;
  hide(): void;
  setVisibility(a: boolean): void;
  updateCockpitPosition(): void;
  update(a: any): void;
  destroy(): void;
  [key: string]: any;
}

type IndicatorType = typeof Indicator;

export declare class GlassPanel {
  constructor(a: any);
  canvas: any; // geofs.api.Canvas;
  entity: any;
  update(): void;
  updateCockpitPosition(): void;
  destroy(): void;
  [key: string]: any;
}

export declare type jQuery$ =
  | string
  | Element
  | Element[]
  | Record<string, unknown>; // things that can be passed to jQuery's $().

export interface API {
  march2019theTwentyFirst: number;
  halfADayInSeconds: number;
  overlayBaseZIndex: number;
  ALTITUDE_RELATIVE: string;
  CLAMP_TO_GROUND: string;
  nativeMouseHandling: boolean;
  precisionTime: number;
  cssTransform: typeof cssTransform;

  initWorld(a: string, b?: any): void;
  destroyWorld(): void;

  triggerExplicitRendering(): void;
  addFrameCallback(a: (a: number) => void, b?: string, c?: number): number; // a in the callback is geofs.api.precisionTime
  removeFrameCallback(a: number, b?: string): void;
  frameCallbackWrapper(a: number, b: FrameCallback): void;

  configureOutsideView(): void;
  configureInsideView(): void;
  setGlobalLighting(a: boolean): void;
  setWaterEffect(a: boolean): void;
  setHD(a: boolean): void;
  isWebXRAvailable(): boolean;
  toggleVr(): void;
  showSun(): void;
  hideSun(): void;
  getGroundAltitude(a?: any, b?: any): number;

  Model: typeof Model;
  loadModel(a: string | Model): any; // Cesium.Model.fromGltf

  getHeading(a: any): number; // a is the camera

  isMobile(): boolean;
  [key: string]: any;
}

export interface FrameCallback {
  callbacks: {
    [key: string]: any;
  };
  lastId: number;
  maxExecutionTime: number;
  lastIndex: number;
  [key: string]: any;
}

export interface Animation {
  init(): void;
  values: {
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Preferences {
  aircraft: string;
  coordinates: string;
  controlMode: string;
  keyboard: {
    sensitivity: number;
    exponential: number;
    mixYawRoll: boolean;
    mixYawRollQuantity: number;
    keys: {
      [key: string]: {
        keycode: number;
        label: string;
      };
    };
  };
  mouse: {
    sensitivity: number;
    exponential: number;
    mixYawRoll: boolean;
    mixYawRollQuantity: number;
  };
  joystick: {
    sensitivity: number;
    exponential: number;
    mixYawRoll: boolean;
    mixYawRollQuantity: number;
    axis: {
      pitch: number;
      roll: number;
      yaw: number;
      throttle: number;
    };
    multiplier: {
      pitch: boolean;
      roll: boolean;
      yaw: boolean;
      throttle: boolean;
    };
    buttons: {
      [key: number]: string;
    };
  };
  orientation: {
    sensitivity: number;
    exponential: number;
    mixYawRoll: boolean;
    mixYawRollQuantity: number;
    axis: {
      pitch: number;
      roll: number;
      yaw: number;
    };
    multiplier: {
      pitch: boolean;
      roll: boolean;
      yaw: boolean;
    };
  };
  touch: {
    sensitivity: number;
    exponential: number;
    mixYawRoll: boolean;
    mixYawRollQuantity: number;
    axis: {
      pitch: number;
      roll: number;
      yaw: number;
    };
    multiplier: {
      pitch: boolean;
      roll: boolean;
      yaw: boolean;
    };
  };
  camera: {
    headMotion: boolean;
  };
  weather: {
    sun: boolean;
    localTime: number;
    season: number;
    manual: boolean;
    quality: number;
    advanced: {
      clouds: number;
      fog: number;
      windSpeed: number;
      windDirection: number;
      turbulences: number;
    };
  };
  graphics: {
    quality: number;
    enhanceColors: number;
    cloudShadows: boolean;
    waterEffect: boolean;
    contrails: boolean;
    HD: boolean;
    advanced: {
      resolutionScale: number;
      viewingDistance: number;
      tileCacheSize: number;
      fxaa: boolean;
      globeLighting: boolean;
      shadowQuality: number;
      dropShadow: boolean;
      cloudDensity: number;
      waterResolution: number;
    };
  };
  interface: {
    transparent: boolean;
  };
  crashDetection: boolean;
  showPapi: boolean;
  multiplayer: boolean;
  showCommunityMultiplayer: boolean;
  adsb: boolean;
  chat: boolean;
  sound: boolean;
  [key: string]: any;
}

export class Runway {
  constructor(
    a: {
      0: string;
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      distance: number;
    }[],
    b?: string
  );
  id: string;
  icao: string;
  location: number[];
  heading: number;
  headingRad: number;
  lengthFeet: number;
  widthFeet: number;
  lengthMeters: number;
  widthMeters: number;
  threshold1: number;
  padding: number;
  meterlla: number[];
  lengthInLla: number[];
  widthInLla: number[];
  meterAcrossInLla: number[];
  imageryLayers: any[];
  generateRunwayModel(): void;
  destroyRunwayModel(): void;
  destroy(): void;
}

export interface Runways {
  runwayNumberLimit: number;
  refreshRate: number;
  refreshDistanceThreshold: number;
  modelVisibility: boolean;
  defaultPadding: number;
  defaultWidth: number;
  tileLength: number;
  modelRunwayWidth: number;
  thresholdLength: number;
  modelVerticalOffset: number;
  imageryLayers: any[];
  imageryOpacity: number;
  env: {
    [key: string]: any;
  };

  redraw(): void;
  refresh(): void;
  reset(): void;
  getNearestRunway(a: number[]): Runway | null;
  getNearRunways(a: number[], b?: number, c?: number): any[];
  setRunwayDistance(a: any, b: any[]): void;
  setRunwayModelVisibility(a: boolean): void;
  getRotationCanvas(a: string): any;
  asyncSetImageLayerRotationPosition(
    a: any,
    b: any,
    c: any,
    d: any
  ): Promise<any>;
  generateRunwayId(a: {
    0: string;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    distance: number;
  }): string;
  [key: string]: any;
}

interface Camera {
  animations: {
    [key: string]: any;
  };
  currentMode: number;
  urrentModeName: string;
  currentDefinition: { [key: string]: any };
  lastCurrentMode: number;
  worldPosition: number[];
  openSlave: boolean;
  motionRange: number[];
  FOVIncrement: number;
  defaultFOV: number;
  currentFOV: number;
  minFOV: number;
  maxFOV: number;
  groundAvoidanceMargin: number;
  groundAvoidanceIgnore: number;
  shortestDistance: number;
  cam: any;
  lla: number[];
  htr: number[];
  hasMoved: boolean;

  init(): void;
  setFOV(a?: number): void;
  increaseFOV(a?: number): void;
  decreaseFOV(a?: number): void;
  reset(): void;
  cycle(): void;
  set(a: number, b: any): void;
  lookAround(a: number, b: number): boolean;
  rotate(a: number, b: number, c: number): boolean;
  translate(a: number, b: number, c: number): boolean;
  setPosition(a: number, b: number, c: number): boolean;
  isHandlingMouseRotation(): boolean;
  setRotation(a: any, b?: any, c?: any): boolean;
  saveRotation(): void;
  saveOffset(): void;
  setToNatural(): void;
  avoidGrounds(): void;
  getFlytToCoordinates(): number[];
  update(a: any): void;
  update3DOverlayPosition(): void;
  openSlaveWindow(a: number): void;
  updateSlaveData(): void;

  [key: string]: any;
}

export class ParticleEmitter {
  constructor(a: any);
  _birth: number;
  _id: number;
  _lastEmission: number;
  _on: boolean;
  _options: any;

  update(): void;
  idOn(): boolean;
  turnOn(): void;
  turnOff(): void;
  destroy(): void;

  [key: string]: any;
}

export class Particle {
  constructor(a: any, b: any);
  _birth: number;
  _id: number;
  _emitter: any;
  _options: {
    url: string;
    startOpacity: number;
    endOpacity: number;
    startScale: number;
    endScale: number;
    easing: string;
    randomizeStartScale?: number;
    randomizeEndScale?: number;
    startRotation: number;
    endRotation: number;
    location: number[];
    dtOpacity: number;
    dtScale: number;
    dtRotaion: number;
    [key: string]: any;
  };
  currentLocation: number[];

  create(): void;
  setColor(a: any): void;
  setLocation(a: number[]): void;
  setRotation(a: any, b: any): void;
  setScale(a: number): void;
  setPositionOrientationAndScale(a: any, b: any, c: any): void;
  update(a: any): void;
  destroy(): void;

  [key: string]: any;
}

interface Fx {
  texture2url: {
    // these three are different for some reason
    1: string;
    2: string;
    3: string;
    [key: string]: any;
  };
  particles: { [key: string]: any };
  particleEmitters: { [key: string]: any };
  lightBillboardOptions: {
    altitudeMode: string;
    sizeInMeters: boolean;
    scaleByDistance: any;
  };
  papiBillboardOptions: {
    altitudeMode: string;
    sizeInMeters: boolean;
    scaleByDistance: any;
  };
  particleBillboardOptions: {
    sizeInMeters: boolean;
  };
  thresholdLightTemplate: number[][];
  maxTimeSinceLastParticleEmission: number;

  init(): void;
  update(a: any): void;
  setParticlesColor(a: any): void;

  ParticuleEmitter: typeof ParticleEmitter;
  Particle: typeof Particle;

  lastRunwayTestLocation: number[];
  templateCenter: number[];

  [key: string]: any;
  //  there are more types but honestly it's never going to be used so why bother
}

export interface GeoFS {
  runways: Runways;
  api: API;
  frameCallbackStack: FrameCallback;
  animation: Animation;

  init(): void;
  start(a?: any, b?: any): void;
  unload(): void;
  initLoggedInUser(): void;
  terrainProbbingDone(): void;
  terrainProbingDuration: number;
  probeTerrain(): void;
  togglePause(): void;
  isPaused(): boolean;
  resetFlight(): void;

  preferences: Preferences;
  preferencesDefault: Preferences;
  preferencesKeycodeLookup: { [keycode: number]: string };
  initPreferences(): void;
  isPreferencePanelOpen(): boolean;
  saveFlight(): void;
  savePreferences(): void;
  resetPreferences(): void;
  readPreferences(a?: () => void): void; // the callback isn't passed anything, seems pretty weird
  populateButtonAssignments(): void;
  populateAxesAssignments(): void;
  populateKeyAssignments(): void;
  preferencesDebugInfo(): void;
  preferencesTestJoystick(): boolean;
  preferencesTestOrientation(): boolean;
  preferencesStartFeedback(): void;
  preferencesStopFeedback(): void;
  initializePreferencesPanel(): void;
  setPreferenceValues(a: jQuery$, b: boolean): void;
  setInputHandlers(a: jQuery$): void;
  destroyPreferencePanel(): void;
  cancelPreferencesPanel(): void;
  setPreferenceFromInput(a: jQuery$): void;
  savePreferencesPanel(): void;

  handleResize(): void;
  resizeHandlersIndex: number;
  addResizeHandler(a: number, b?: any): any;
  removeResizeHandler(a: number): void;
  getViewportDimentions(): void;
  autopilotIndicator(a: boolean): void;

  aircraft?: {
    default: number;
    Aircraft: Aircraft;
    instance?: Aircraft;
  };

  GlassPanel: typeof GlassPanel;
  camera: Camera;
  fx: Fx;
  [key: string]: any;
}

export interface Chat {
  maxNumberMessages: number;
  init(): void;
  showInput(): void;
  hideInput(a?: boolean): void;
  publish(a: any): void;
  removeUserMessages(a: any): void;
  hide(): void;
  show(): void;
  [key: string]: any;
}

export interface Vr {
  init(): void;
  toggle(): void;
  [key: string]: any;
}

export interface HUD {
  init(): void;
  stall: Overlay;
  stallAlarmSet: boolean;
  stallAlarmOn: boolean;
  stallAlarm(a: boolean): void;
  autopilotIndicator(): void;
  [key: string]: any;
}

export interface Ui {
  playerMarkers: {
    [key: string]: any;
  };
  playerSymbols: {
    [key: string]: any;
  };
  // TODO: what is k.Event?
  // this same function is in addMouseUpHandler()
  mouseUpHandlers: Array<(a: typeof $.Event) => void>;
  svgPlanePath: string;
  svgPlaneStyles: {
    [key: string]: {
      path: string;
      fillColor: string;
      fillOpacity: number;
      scale: number;
      strokeColor: string;
      strokeWeight: number;
      anchor: number[];
    };
  };

  init(): void;
  mouseUpHandler(): void;
  showCrashNotification(): void;
  hideCrashNotification(): void;
  toggleFullscreen(): void;
  applyPreferences(): void;
  toggleButton(a?: any, b?: any): void;
  expandLeft(): void;
  collapseLeft(a?: any): void;
  addMouseUpHandler(a: (a: typeof $.Event) => void): void;
  runMouseUpHandlers(a: any): void;
  panel: {
    init(): void;
    toggleItem(a: jQuery$, b: Event): void;
    expendItem(a: jQuery$, b: Event): void;
    toggle(a: jQuery$): void;
    show(a: jQuery$): void;
    hide(a?: jQuery$, b?: any): void;
  };
  closePreferencePanel(): void;

  chat: Chat;
  vr: Vr;
  hud: HUD;
  [key: string]: any;
}

export interface Recorder {
  tape: {
    time: number;
    coord: number[];
    controls: number[];
    state: boolean[];
    velocities: number[];
  }[];
  rate: number;
  frequency: number;
  maxLength: number;
  playing: boolean;
  lastRecordTime: number;
  record(): void;
  clear(): void;
  enterPlayback(): void;
  exitPlayback(): void;
  pausePlayback(): void;
  unpausePlayback(): void;
  startPlayback(): void;
  setStep(a: number, b: string): boolean;
  play(a: number): void;
  [key: string]: any;
}

export interface Sharing {
  minSafeTimeDelta: number;
  on: boolean;
  start(): void;
  stop(): void;
  reset(): void;
  peerUpdate(a: any): void;
  update(a: any): void;
  [key: string]: any;
}

export interface Flight {
  minPenetrationThreshold: number;
  arrestingHookDiscardVelocity: number;
  arrestingHookDiscardLength: number;
  currentAltitudeTestContext: number;
  pastAltitudeTestContext: number;
  tick(a: number, b: number): void;
  setAnimationValues(a: number): void;
  recorder: Recorder;
  sharing: Sharing;
  // there are some more  functions and stuff I didn't bother implementing bc its pretty useless
  reset(): void;
  [key: string]: any;
}

export type APDefinitions = {
  maxBankAngle: number;
  maxPitchAngle: number;
  minPitchAngle: number;
  baseClimbrate: number;
  baseDescentrate: number;
  maxClimbrate: number;
  maxDescentrate: number;
  verticalSpeedHoldMargin: number;
  targetBankAngleRatio: number;
  heading: number;
  altitude: number;
  kias: number;
  climbrate: number;
  yawBankAngleRatio: number;
  pitchAnglePID: number[];
  elevatorPitchPID: number[];
  bankAnglePID: number[];
  aileronsRollPID: number[];
  throttlePID: number[];
  effectivenessRatioMaximum: number;
  [key: string]: any;
};

interface Autopilot {
  on: boolean;
  PIDs: {
    pitchAngle: PID;
    elevatorPitch: PID;
    bankAngle: PID;
    aileronsRoll: PID;
    throttle: PID;
  };
  defaults: APDefinitions;
  definitions: APDefinitions;
  init(): void;
  update(a: any): void;
  initUI(): void;
  toggle(): void;
  resetPIDs(): void;
  turnOn(): void;
  turnOff(): void;
  [key: string]: any;
}

export interface Controls {
  states: {
    decreaseThrottle: boolean;
    down: boolean;
    increaseThrottle: boolean;
    left: boolean;
    right: boolean;
    rudderLeft: boolean;
    rudderRight: boolean;
    up: boolean;
  };
  mouse: {
    down: boolean;
    orbit: {
      ratioX: number;
      ratioY: number;
      ratioZ: number;
    };
    offset: {
      ratioX: number;
      ratioY: number;
    };
  };

  keyboard: {
    rollIncrement: number;
    pitchIncrement: number;
    yawIncrement: number;
    throttleIncrement: number;
    recenterRatio: number;
    override: boolean;
    overrideRudder: boolean;
    exponential: number;
  };

  touch: {
    pitch: number;
    roll: number;
    yaw: number;
    throttle: number;
  };

  orientation: {
    values: number[];
    available: boolean;
    generalMultiplier: number;
    init(): void;
    fixPitch(a: number): void;
    recenter(): void;
    isAvailable(): boolean;
    getNormalizedAxis(a: any): number;
    getHtr(a: any): number[];
    updateOrientation(a: any): void;
    updateTouch(a: any): void;
  };

  joystick: {
    deadZoneUp: number;
    deadZoneDown: number;
    ready: boolean;
    sticksNumber: number;
    sticks: number[];
    poll(): boolean;
    init(): void;
    configure(): void;
    checkButton(a: any): any;
    getAxisValue(a?: any, b?: any, c?: any): any;
    updateJoystick(a: any): void;
    addButtonListener(a?: any, b?: any, c?: any): void;
  };

  mixYawRoll: boolean;
  exponential: number;
  mixYawRollQuantity: number;
  mode: string;
  init(): void;
  addHammerHandlers(): void;
  initViewportDimensions(): void;
  resetWithAircraftDefinition(): void;
  reset(): void;
  setMode(a: string): void;
  axisSetters: {
    [key: string]: {
      label: string;
      process?(a: number): void | number;
      value?: null;
    };
  };
  setters: {
    [type: string]: {
      label: string;
      set(): void;
      unset(): void;
    };
  };
  trimUp(a?: number): void;
  trimDown(a?: number): void;
  update(a: any): void;
  setPartAnimationDelta(a: any): void;
  animatePart(a: string, b: number): void;
  updateMouse(a?: any): void;
  updateKeyboard(a: number): void;
  recenter(): void;
  keyDown(a: KeyboardEvent): void;
  keyUp(a: KeyboardEvent): void;
  autopilot: Autopilot;
  [key: string]: any;
}

export interface InstrumentsDefinitions {
  stackX?: boolean;
  overlay: any; // might be a boolean?
  [key: string]: any;
}

export interface Instruments {
  stackPosition: { x: number; y: number };
  margins: number[];
  defaultMargin: number;
  visible: boolean;
  list: {
    airspeedJet: Indicator;
    altitude: Indicator;
    attitudeJet: Indicator;
    brakes: Indicator;
    compass: Indicator;
    flaps: Indicator;
    gear: Indicator;
    pfd: Indicator;
    rpmJet: Indicator;
    spoilers: Indicator;
    varioJet: Indicator;
    wind: Indicator;
    [key: string]: Indicator;
  };
  gaugeOverlayPosition: number[];
  gaugeOverlayOrigin: number[];
  definitions: InstrumentsDefinitions;
  definitionsMobile: InstrumentsDefinitions;
  definitions3DOverlay: InstrumentsDefinitions;
  init(a?: any): void;
  toggle(): void;
  add(a?: any, b?: any): void;
  hide(a?: any): void;
  show(a?: any): void;
  rescale(): void;
  update(a?: any): void;
  updateCockpitPositions(): void;
  updateScreenPositions(): void;
  [key: string]: any;
}

export interface Audio {
  soundplayer: HTMLAudioElement;
  sounds: any;
  on: boolean;

  init(a: any[]): void;
  loaded(a: any): void;
  stopped(a: any): void;
  update(): void;
  toggleMute(): void;
  stop(): void;
  mute(): void;
  unmute(): void;
  playStartup(): void;
  playShutdown(): void;
  playSoundLoop(a: any, b: any): void;
  stopSoundLoop(a: any): void;
  impl: {
    webAudio: {
      [key: string]: any;
    };
    html5: {
      [key: string]: any;
    };
    cordova: {
      [key: string]: any;
    };
  };
  peer2peer: {
    init(a: string): void;
    destroy(): void;
  };
  [key: string]: any;
}

export class Wind {
  constructor(a: number, b: number, c: number, d: number);
  mainDirection: number;
  speedKnots: number;
  speedMs: number;
  vector: number[];
  vectorMs: number[];
  vectorCross: number[];
  floor: number;
  ceiling: number;
  direction: number;
  speed: number;
  randomize(): void;
  computeAndSet(a: number[]): void;
  computeTerrainLift(a: number[]): any;
  [key: string]: any;
}

interface Weather {
  dataProxy: string;
  minimumCloudCover: number;
  updateRate: number;
  timeRatio: number;
  seasonRatio: number;
  contrailTemperatureThreshold: number;
  contrailAltitude: number;
  defaults: {
    cloudCover: number;
    ceiling: number;
    cloudCoverThickness: number;
    fogDensity: number;
    fogCeiling: number;
    fogBottom: number;
    precipitationType: string;
    precipitationAmount: number;
    thunderstorm: number;
    visibility: number;
    windDirection: number;
    windSpeedMS: number;
    windGustMS: number;
    windLayerHeight: number;
    windLayerNb: number;
    turbulences: number;
    thermals: number;
    airPressureSL: number;
    airTemperatureSL: number;
  };
  definitionBounds: {
    cloudCover: number[];
    ceiling: number[];
    fogDensity: number[];
    precipitationAmount: number[];
    thunderstorm: number[];
    windDirection: number[];
    windSpeedMS: number[];
    windGustMS: number[];
    turbulences: number[];
    thermals: number[];
  };
  init(a: any): void;
  reset(a: any): void;
  refresh(a: any): void;
  sanitizedDefinition(a: any): any;
  generateDefinition(a: any, b: any): any;
  setManual(): void;
  serAdvanced(): void;
  set(a: any, b: any): void;
  update(a: any): void;
  setWindIndicatorVisibility(a: any): void;
  setDateAndTime(a: any): void;
  getLocalTurbulence(a: any): number[];
  thermals: {
    currentVector: number[];
    minradius: number;
    maxradius: number;
    minspeed: number;
    maxspeed: number;
    invertionRange: number;
  };
  setThermals(a: any): void;
  getLocalThermal(a: number[]): number[];
  Wind: typeof Wind;
  initWind(a: number, b: number): void;
  windOff(): void;

  atmosphere: {
    init(): void;
    update(a: number): void;
  };
  [key: string]: any;
}

export class User {
  constructor(a: any);
  id: string;
  acid: number;
  callsign: string;
  aircraft: number;
  lod: number;
  model: null;
  lastUpdate: any;
  visibleGear: boolean;
  referencePoint: {
    lla: number[];
  };
  currentServerTime: number;
  lastHeartbeatTime: number;
  isTraffic: boolean | undefined;
  updated: boolean;

  heartBeat(): void;
  update(a: any, b: any): void;
  getLOD(a: any): 0 | 1 | 2 | 3;
  updateAircraft(a: any): void;
  updateContrails(): void;
  updateModel(a: any): void;
  addCallsign(a: string, b: string): void;
  removeCallsign(): void;
  removeFromWorld(): void;
  removeModels(): void;
  remove(): void;
  getCoordinates(): number[];
  isOnGround(): boolean;

  [key: string]: any;
}

interface Multiplater {
  nbUsers: number;
  users: { [id: string]: User };
  visibleUsers: { [id: string]: User };
  numberOfLOD: number;
  captainIconUrl: string;
  premiumIconUrl: string;
  minUpdateDelay: number;
  hearbeatLife: number;
  userLife: number;
  userHalfLife: number;
  userHeartBeatPeriod: number;
  trafficLife: number;
  trafficHalfLife: number;
  trafficHeartBeatPeriod: number;
  contrailEmitters: {
    [key: number]: any;
  };
  mapUpdatePeriod: number;
  myId: string;
  lastRequest: any;
  lastResponse: any;
  lastJoinedCoordinates: string;
  lastRequestTime: number;
  serverTimeOffset: number;
  labelVisibilityRange: number;
  farVisibilityRange: number;
  lowVisibilityRange: number;
  nearVisibilityRange: number;
  chatMessage: string;
  chatMessageId: number;
  on: boolean;
  started: boolean;
  callsignPlacemarkAltitude: number;
  updateFunctions: any[];
  init(): void;
  stop(): void;
  startUpdates(): void;
  stopUpdates(a?: any): void;
  getServerTime: number;
  getUser(a: string): User;
  flightSharing: {
    requestTimeout: number;
    host: boolean;
    control: boolean;
    status: string;
    willpeer: User;
    waspeer: User;
    peer: User;
    init(): void;
    request(a: User): void;
    incoming(a: User): void;
    accept(a: User): void;
    accepted(a: User): void;
    peerUpdate(a: any): void;
    swapControl(a: boolean): void;
    refuse(a?: any): void;
    stop(): void;
    [key: string]: any;
  };

  updateUsers(a?: User[]): void;
  startMapUpdate(): void;
  update(a: number): void;
  errorCallback(a?: any): void;
  updateCallback(a: any): void;
  sendUpdate(): void;
  blockUser(a: string): void;
  banUser(a: string): void;
  laodModels(a: any): any[];
  setNbUsers(a: number): void;
  setChatMessage(a: string): void;

  [key: string]: any;
}

// global variables
declare global {
  let geofs: GeoFS;
  let ui: Ui;
  let flight: Flight;
  let controls: Controls;
  let weather: Weather;
  let multiplier: Multiplater;
  let audio: Audio;
  let instruments: Instruments;
  let rigidBody: RigidBodyType;
  let Indicator: IndicatorType;

  // constants
  let GRAVITY: number;
  let DEGREES_TO_RAD: number;
  let RAD_TO_DEGREES: number;
  let KMH_TO_MS: number;
  let METERS_TO_FEET: number;
  let FEET_TO_METERS: number;
  let LONGITUDE_TO_HOURS: number;
  let EPSILON: number;
  let MERIDIONAL_RADIUS: number;
  let EARTH_CIRCUMFERENCE: number;
  let METERS_TO_LOCAL_LAT: number;
  let WGS84_TO_EGM96: number;
  let EGM96_TO_WGS84: number;
  let PI: number;
  let HALF_PI: number;
  let TWO_PI: number;
  let MS_TO_KNOTS: number;
  let KNOTS_TO_MS: number;
  let KMH_TO_KNOTS: number;
  let AXIS_TO_INDEX: {
    X: number;
    Y: number;
    Z: number;
  };
  let AXIS_TO_VECTOR: {
    X: number[];
    Y: number[];
    Z: number[];
  };
  let KELVIN_OFFSET: number;
  let TEMPERATURE_LAPSE_RATE: number;
  let AIR_DENSITY_SL: number;
  let AIR_PRESSURE_SL: number;
  let AIR_TEMP_SL: number;
  let DRAG_CONSTANT: number;
  let MIN_DRAG_COEF: number;
  let PLANFORM_EFFICIENCY_FACTOR: number;
  let TOTAL_DRAG_CONSTANT: number;
  let IDEAL_GAS_CONSTANT: number;
  let MOLAR_MASS_DRY_AIR: number;
  let GAS_CONSTANT: number;
  let GM_RL: number;
  let DEFAULT_AIRFOIL_ASPECT_RATIO: number;
  let FOV: number;
  let VIEWPORT_REFERENCE_WIDTH: number;
  let VIEWPORT_REFERENCE_HEIGHT: number;
  let SMOOTH_BUFFER: {
    [x: string]: any;
  };
  let SMOOTHING_FACTOR: number;
  let SIX_STEP_WARNING: string[];
  let PAGE_PATH: string;
  let L: typeof import("../node_modules/@types/leaflet/index");
  let componentHandler: any;
}
