define(["knockout"], function (ko: KnockoutStatic) {
  const _keydown = ko.observable<KeyDown>(() => {
    void 0;
  });
  const keydown: KnockoutComputed<KeyDown> = ko.pureComputed({
    read: _keydown,
    write: (keydown: KeyDown): void => {
      _keydown(keydown);
      // reapply the keydown
      window.controls.keyDown = keydown;
    },
  });
  // Remove the keydown listener from the document, and add a different one
  $(document).off(
    "keydown",
    window.controls.keyDown as unknown as JQuery.TypeEventHandler<
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
  return keydown;
});
