/// <reference path="node_modules/iina-plugin-definition/iina/index.d.ts" />

const { core, console, event, mpv, http, menu, overlay, preferences } = iina;
const utils = require("utils.js");

const item = menu.item("Plugin Demo");

item.addSubMenuItem(menu.item("Show OSD", () => {
    core.osd("This is a demo message");
}))

item.addSubMenuItem(menu.item("Get mpv property", () => {
    core.osd("time-pos: " + mpv.getNumber("time-pos"));
}))

item.addSubMenuItem(menu.separator());

let enableGettingWindowFrame = false;
let windowResizedListenerID, windowMovedListenerID;
item.addSubMenuItem(menu.item("Get window frame update", (item) => {
    enableGettingWindowFrame = !enableGettingWindowFrame;
    item.selected = enableGettingWindowFrame;
    if (enableGettingWindowFrame) {
        windowResizedListenerID = event.on("iina.window-resized", (frame) => {
            core.osd(`Window resized to: (${frame.width},${frame.height})@(${frame.x},${frame.y})`);
        });
        windowMovedListenerID = event.on("iina.window-moved", (frame) => {
            core.osd(`Window moved to: (${frame.width},${frame.height})@(${frame.x},${frame.y})`);
        });
    } else {
        event.off("iina.window-resized", windowResizedListenerID);
        event.off("iina.window-moved", windowMovedListenerID);
    }
}, enableGettingWindowFrame));

menu.addItem(item);

console.log(core.window.screens)

// let volume = mpv.getNumber("volume");
// console.log(addOne(volume));

// event.on("mpv.fullscreen.changed", (isFullScreen) => {
//     if (!isFullScreen) {
//         mpv.set("pause", true);
//     }
// });

const xmlrpc = http.xmlrpc("https://iina.io/");

// event.on("mpv.pause.changed", (isPaused) => {
//     http.get("https://iina.io/").then((response) => {
//         console.log(response)
//     }).catch((response) => {
//         console.log(response)
//     })
//     console.log("Pause: " + isPaused)
//     if (isPaused) {
//         overlay.show()
//         overlay.sendMessage("timeUpdate", mpv.getNumber("time-pos"))
//     } else {
//         overlay.hide()
//     }
// });

// event.on("iina.pip.changed", (pip) => {
//     console.log("PIP: " + pip)
// });

// const { iptvList } = require("iptv.js");

// for (let group of iptvList) {
//     const item = menu.item(group.name);
//     for (let tv of group.items) {
//         item.addSubMenuItem(menu.item(tv.name, () => {
//             core.open(tv.url);
//         }));
//     }
//     menu.addItem(item);
// }

// event.on("iina.window-loaded", () => {
//     overlay.loadFile("overlay/info.html");
//     overlay.onMessage("frame", (f) => { console.log(f) })
// });

// require("ytdl.js");

console.log("test:", preferences.get("test"));
