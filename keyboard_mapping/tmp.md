# To Do

## #129 - Can't remap keybinds with keyup

- Need to use the current keydown keybind if it exists (no remapping is available)
- Need to detect the currently unpressed keybind

```
Store the currently pressed keybinds (the **actual** keybinds, of type Keybind) in a set on every keydown.
On keyup, remove the unpressed key.
Get the unpressed key using event.code.
If we cannot create the keybind now, callback();
else, oldKeyUp(event);
```
