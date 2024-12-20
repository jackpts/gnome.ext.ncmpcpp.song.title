import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import St from "gi://St";
import Clutter from "gi://Clutter";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import GLib from "gi://GLib";

export default class SongTitleExtension extends Extension {
  enable() {
    this.button = new PanelMenu.Button(0.0, this.metadata.name, false);
    // const decoder = new TextDecoder('utf-8');
    // const fileName = decoder.decode(this.runBashScript());
    const songTitle = this.getSongTitle("bash ./song_title.sh");
    const text = new St.button({
      text: songTitle,
      x_align: Clutter.ActorAlign.CENTER,
      y_align: Clutter.ActorAlign.CENTER,
      style_class: "my-custom-button",
    });

    this.button.add_child(text);
    Main.panel.addToStatusArea("my-button", this.button);
    // Main.panel.statusArea['my-extension'].set_label(output);
  }

  disable() {
    this.button?.destroy();
    this.button = null;
  }

  getSongTitle(command) {
    try {
      let [success, stdout, stderr, exit_status] = GLib.spawn_command_line_sync(
        command,
      );
      log('sss [success, stdout, stderr, exit_status]=' + [success, stdout, stderr, exit_status]);
      log("sss typeof stdout: " + typeof stdout);

      if (success) {
        // Output from the script
        let output = GLib.file_get_contents(stdout);
        log("Script Output: " + output);
        return output.toString().trim();
      } else {
        log("Error: " + stderr);
        return "Error in bash exec!";
      }
    } catch (e) {
        log("Error: " + e);
        return null;
    }
  }
}
