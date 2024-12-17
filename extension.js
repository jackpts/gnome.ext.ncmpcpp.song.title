const St = imports.gi.St;
const Main = imports.ui.main;

let indicator;

function init() {
  //init
}

function enable() {
  indicator = new St.Label({ text: "Song name test!" });
  Main.panel.addToStatusArea("my-indicator", indicator);
}

function disable() {
  indicator.destroy();
}
