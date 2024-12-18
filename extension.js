import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import St from "gi://St";
import Clutter from "gi://Clutter";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import GLib from "gi://GLib";

export default class SongTitleExtension extends Extension {
  enable() {
    this.button = new PanelMenu.Button(0.0, this.metadata.name, false);
    const text = new St.button({
      text: this.runBashScript(),
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

  runBashScript() {
    let [success, stdout, stderr] = GLib.spawn_command_line_sync(
      "bash ./song_name.sh",
    );

    if (success) {
      // Output from the script
      let output = GLib.file_get_contents(stdout);
      log("Script Output: " + output);
      return output;
    } else {
      log("Error: " + stderr);
      return "Error in bash exec!";
    }
  }
}
