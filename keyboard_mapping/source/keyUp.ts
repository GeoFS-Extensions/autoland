import * as ko from "knockout";
import { KeyUp } from "../keyboard_mapping_types";

const _keyup = ko.observable<KeyUp>((event) => {
  event; // here just so ts won't be annoyed
});
const keyup = ko.pureComputed({
  read: _keyup,
  write: (keyup) => {
    _keyup(keyup);
    // reapply the keyup
    controls.keyUp = keyup;
  },
});
// Remove the keyup listener from the document, and add a different one
$(document).off(
  "keyup",
  controls.keyUp as unknown as JQuery.TypeEventHandler<
    Document,
    any,
    any,
    any,
    "keyup"
  >
);
$(document).on("keyup", (event) => {
  keyup()(event as unknown as KeyboardEvent);
});

export default keyup;
