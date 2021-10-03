import * as ko from "knockout";
import keyboardMapping from "../keyboard_mapping_types";

const _keydown = ko.observable<keyboardMapping.KeyDown>(() => {
  void 0;
});
const keydown = ko.pureComputed({
  read: _keydown,
  write: (keydown) => {
    _keydown(keydown);
    // reapply the keydown
    controls.keyDown = keydown;
  },
});
// Remove the keydown listener from the document, and add a different one
$(document).off(
  "keydown",
  controls.keyDown as unknown as JQuery.TypeEventHandler<
    Document,
    any,
    any,
    any,
    "keydown"
  >
);
$(document).on("keydown", (event) => {
  keydown()(event as unknown as KeyboardEvent);
});

export default keydown;
