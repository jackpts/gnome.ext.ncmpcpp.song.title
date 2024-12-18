import * as Main from "resource:///org/gnome/shell/ui/main.js";
// import * as St from "resource:///org/gnome/gjs/modules/st.js";
import St from "gi://St";
// import Clutter from "resource:///org/gnome/gjs/modules/clutter.js";
import Clutter from "gi://Clutter";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

export default class SongTitleExtension extends Extension {
  // class SongTitleExtension {
  // constructor() {
  //   super();
  //   this.label = null;
  // }

  enable() {
    this.label = new St.Label({
      text: "Song name test!",
      x_align: Clutter.ActorAlign.CENTER,
      y_align: Clutter.ActorAlign.CENTER,
      style_class: "my-custom-label",
    });

    Main.panel.addToStatusArea("my-label", this.label);
  }

  disable() {
    this.label?.destroy();
    this.label = null;
  }
}

// function init() {
//   return new SongTitleExtension();
// }
