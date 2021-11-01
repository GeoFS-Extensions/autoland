import { Keybind } from "../../keyboard_mapping_types";

/**
 * An unordered collection of unique values of a Keybind interface.
 */
export default class KeybindSet<T extends Keybind> extends Set<T> {
  /**
   * Add a value to the set. If it doesn't exists, the value will be added. Otherwise, nothing will be added.
   * @param {T} value the value to be added.
   * @return {KeybindSet<T>} The set
   */
  add(value: T): this {
    if (!this.has(value)) {
      super.add(value);
    }
    return this;
  }

  /**
   * Check if a value is in the set.
   * @param {T} value The value to check againt.
   * @returns {boolean} true if the value exists in the set, false otherwise.
   */
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

  /**
   * Delete a value from the set, if it exists.
   * @param value {T} The value to delete.
   * @returns {boolean} true if the value was deleted, false otherwise.
   */
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

  /**
   * Filter the set to include only the elements that pass a callback.
   * @param {(value: T) => boolean} callback The function to filter on.
   * @returns {KeybindSet<T>} The set.
   */
  filter(callback: (item: T) => boolean): this {
    this.forEach(item => {
      if (callback(item)) {
        this.delete(item);
      }
    });
    //Array.prototype.
    return this;
  }

  /**
   * Join multiple sets together
   * @param {...KeybindSet<T>[]} sets The sets to concat.
   * @return {KeybindSet<T>} This set.
   */
  join(...sets: KeybindSet<T>[]): this {
    sets.forEach(set => {
      set.forEach(item => {
        this.add(item);
      });
    });

    return this;
  }

  /**
   * Checks if all elements meet a condition
   * @param {(item: T) => boolean} callback The function to test against
   * @returns {boolean} true if all elements meet the condition, false otherwise.
   */
  every(callback: (item: T) => boolean): boolean {
    let meet = false;
    this.forEach(item => {
      meet = callback(item);
    });
    return meet;
  }

  /**
   * Checks if at least one of the elements meets a condition
   * @param {(item: T) => boolean} callback The function to test against
   * @returns {boolean} true if at least one of the elements meets the condition, false otherwise.
   */
   some(callback: (item: T) => boolean): boolean {
    let meet = false;
    this.forEach(item => {
      if (callback(item)) meet = true;
    });
    return meet;
  }
}