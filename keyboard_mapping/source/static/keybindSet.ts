import { Keybind } from "../../keyboard_mapping_types";

export default class KeybindSet<T extends Keybind> extends Set<T> {
  add(value: T): this {
    let found = false;
    this.forEach((item) => {
      if (
        item.altKey === value.altKey &&
        item.ctrlKey === value.ctrlKey &&
        item.shiftKey === value.shiftKey &&
        item.code === value.code
      ) {
        found = true;
      }
    });

    if (!found) {
      super.add(value);
    }
    return this;
  }

  has(value: T): boolean {
    let found = false;
    this.forEach((item) => {
      if (
        item.altKey === value.altKey &&
        item.ctrlKey === value.ctrlKey &&
        item.shiftKey === value.shiftKey &&
        item.code === value.code
      ) {
        found = true;
      }
    });
    return found;
  }

  delete(value: T): boolean {
    let deleted = false;
    this.forEach((item) => {
      if (
        item.altKey === value.altKey &&
        item.ctrlKey === value.ctrlKey &&
        item.shiftKey === value.shiftKey &&
        item.code === value.code
      ) {
        deleted = true;
        super.delete(item);
      }
    });
    return deleted;
  }
}
