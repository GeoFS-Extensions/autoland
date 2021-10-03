export default `<div id="Qantas94Heavy-ap-nav" class="mdl-grid mdl-grid--no-spacing">
  <div class="mdl-cell mdl-cell--2-col">
    <h6>Autopilot</h6>
  </div>
  <div class="mdl-cell mdl-cell--5-col">
    <button
      id="Qantas94Heavy-ap-toggle"
      class="mdl-button mdl-js-button mdl-button--raised"
      data-bind="css: { 'mdl-button--colored': on },
                       click: toggle, text: on() ? 'Engaged' : 'Disengaged'"
    ></button>
  </div>

  <div class="mdl-cell mdl-cell--5-col">
    <button
      class="mdl-button mdl-js-button mdl-button--raised"
      data-bind="click: nextMode, text: currentModeText"
    ></button>
  </div>
</div>

<div id="Qantas94Heavy-ap-displays">
  <div class="mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-switch-container">
        <label class="mdl-switch mdl-js-switch">
          <input
            type="checkbox"
            class="mdl-switch__input"
            data-bind="checked: altitudeEnabled, enable: on, mdlSwitch: true"
          />
        </label>
      </div>

      <div class="Qantas94Heavy-input-container">
        <label>
          Altitude
          <input type="number" min="0" step="500" data-bind="value: altitude" />
        </label>
      </div>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-input-container">
        <label>
          V/S
          <input
            type="number"
            placeholder="-----"
            step="50"
            data-bind="value: vs"
          />
        </label>
      </div>
    </div>
  </div>

  <div class="mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-switch-container">
        <label class="mdl-switch mdl-js-switch">
          <input
            type="checkbox"
            class="mdl-switch__input"
            data-bind="checked: headingEnabled, enable: on, mdlSwitch: true"
          />
        </label>
      </div>

      <!-- Heading mode -->
      <div
        class="Qantas94Heavy-input-container"
        data-bind="visible: currentMode() === 0"
      >
        <label>
          Heading
          <input
            type="number"
            min="1"
            max="360"
            step="1"
            data-bind="value: heading"
          />
        </label>
      </div>

      <!-- Lat/lon mode -->
      <div
        class="Qantas94Heavy-input-container"
        data-bind="visible: currentMode() === 1"
      >
        <label>
          Latitude
          <input type="number" data-bind="value: lat" />
        </label>
      </div>

      <!-- Waypoint mode -->
      <div
        class="Qantas94Heavy-input-container"
        data-bind="visible: currentMode() === 2"
      >
        <label>
          Waypoint
          <input type="text" data-bind="value: waypoint" />
        </label>
      </div>
    </div>

    <!-- Lat/lon mode -->
    <div
      class="mdl-cell mdl-cell--6-col"
      data-bind="visible: currentMode() === 1"
    >
      <div class="Qantas94Heavy-input-container">
        <label>
          Longitude
          <input type="number" data-bind="value: lon" />
        </label>
      </div>
    </div>
  </div>

  <div class="mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-switch-container">
        <label class="mdl-switch mdl-js-switch">
          <input
            type="checkbox"
            class="mdl-switch__input"
            data-bind="checked: speedEnabled, enable: on, mdlSwitch: true"
          />
        </label>
      </div>
      <div class="Qantas94Heavy-input-container">
        <label>
          Speed
          <input
            type="number"
            placeholder="0"
            min="0"
            step="10"
            data-bind="value: speed"
          />
        </label>
      </div>
    </div>

    <div class="mdl-cell mdl-cell--3-col">
      <label
        class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
        for="Qantas94Heavy-spd-kias"
      >
        <input
          type="radio"
          id="Qantas94Heavy-spd-kias"
          class="mdl-radio__button"
          name="options"
          value="kias"
          data-bind="checked: speedMode, mdlRadio: true"
        />
        <span class="mdl-radio__label">KIAS</span>
      </label>
    </div>

    <div class="mdl-cell mdl-cell--3-col">
      <label
        class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
        for="Qantas94Heavy-spd-mach"
      >
        <input
          type="radio"
          id="Qantas94Heavy-spd-mach"
          class="mdl-radio__button"
          name="options"
          value="mach"
          data-bind="checked: speedMode, mdlRadio: true"
        />
        <span class="mdl-radio__label">Mach</span>
      </label>
    </div>
  </div>
</div>
`;
