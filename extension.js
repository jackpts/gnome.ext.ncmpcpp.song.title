import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import St from "gi://St";
import Clutter from "gi://Clutter";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

export default class SongTitleExtension extends Extension {
  enable() {
    this.button = new PanelMenu.Button(0.0, this.metadata.name, false);
    const text = new St.button({
      text: "Song name test!",
      x_align: Clutter.ActorAlign.CENTER,
      y_align: Clutter.ActorAlign.CENTER,
      style_class: "my-custom-button",
    });

    this.button.add_child(text);
    Main.panel.addToStatusArea("my-button", this.button);
  }

  disable() {
    this.button?.destroy();
    this.button = null;
  }
}
