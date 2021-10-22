import { E } from "./ui/elements";

// If FMC is production
const PRODUCTION = false;

// Stops event propagation
function stopPropagation(event: Event) {
  event.stopImmediatePropagation();
}

export const debug = {
  /**
   * Stops input key propagation
   */
  stopPropagation: function () {
    $(E.modal)
      .on("keyup", stopPropagation)
      .on("keydown", stopPropagation)
      .on("keypress", stopPropagation);
  },

  /**
   * Logs debug statement into console when needed if not PRODUCTION
   */
  log: function (text) {
    if (!PRODUCTION) console.log(text);
  },
};
