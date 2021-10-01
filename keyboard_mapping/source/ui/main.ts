define(["knockout", "./ViewModel", "../addDefaultKeybinds"], function (
  ko: KnockoutStatic,
  ViewModel,
  addDefaultKeybinds: () => void
) {
  addDefaultKeybinds();
  new ViewModel();
});
