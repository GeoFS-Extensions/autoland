export default () => {
  if (!keyboard_mapping) {
    $(document).off("keydown");

    // don't break the game:
    $(document).on("keydown", ".geofs-stopKeyboardPropagation", function (a) {
      a.stopImmediatePropagation();
    });
    $(document).on("keydown", ".address-input", function (a) {
      a.stopImmediatePropagation();
    });
  }
};
