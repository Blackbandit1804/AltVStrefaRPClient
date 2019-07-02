/// <reference path="../../../natives.d.ts" />
/// <reference path="../../../alt.d.ts" />

import * as alt from 'alt';
import * as game from 'natives';
import Animations from 'src/Modules/animations.js';
let animations = new Animations();
import { showUiAndFreezePlayer, showUi } from 'src/Helpers/uiHelper.js';

class MenusManager {
    constructor() {
        alt.log('Initialized MenusView Class');
        this.tablet = null;
        this.tabletView = null;
        this.viewOpened = false;
        this.viewLoaded = false;

        this.menusView = new alt.WebView('http://resources/AltVStrefaRPClient/client-ui/dist/index.html#', false);
    }

    onClientEvent(eventName, callback) {
        alt.on(eventName, callback);
    }

    onUiEvent(eventName, callback) {
        this.menusView.on(eventName, callback);
    }

    emitUiEvent(eventName, ...args) {
        if (this.viewLoaded)
            this.menusView.emit(eventName, ...args);
    }

    openMenu(name, hideUi, freezePlayer, ...args) {
        if (hideUi && freezePlayer) {
            showUiAndFreezePlayer(false);
        } else if (hideUi) {
            showUi(false);
        } else if (freezePlayer) {
            game.freezeEntityPosition(game.playerPedId(), true);
        }

        // var localPlayer = alt.getLocalPlayer().scriptID;
        // let position = game.getEntityCoords(localPlayer, true);
        // this.tablet = game.createObject(game.getHashKey('xm_prop_x17_sec_panel_01'), position.x, position.y, position.z + 0.5, 0, 0, 0);
        // alt.log('Exists ' + alt.isTextureExistInArchetype(game.getHashKey('xm_prop_x17_sec_panel_01'), 'script_rt_prop_x17_p_01'));
        // game.attachEntityToEntity(this.tablet, localPlayer, game.getPedBoneIndex(localPlayer, 60309),
        //     0.035, 0.015, 0.012, 0.0, 0, 0, true, true, false, true, 1, true);

        this.menusView.emit(name, ...args);
        this.viewOpened = true;
        alt.showCursor(true);
        this.menusView.focus();

        // let inter = alt.setInterval(() => {
        //     if (alt.isTextureExistInArchetype(game.getHashKey('xm_prop_x17_sec_panel_01'), 'script_rt_prop_x17_p_01')) {
        //         this.tabletView = new alt.WebView("http://resources/AltVStrefaRPClient/mainUi/menus.html", game.getHashKey('xm_prop_x17_sec_panel_01'), 'script_rt_prop_x17_p_01');
        //         this.tabletView.emit(name, ...args);
        //         alt.clearInterval(inter);
        //         return;
        //     }
        // }, 10);

        // animations.loadAnimDict("amb@world_human_clipboard@male@base").then(() => {
        //     game.taskPlayAnim(localPlayer, "amb@world_human_clipboard@male@base", "base", 8.0, 1.0, -1, 63, 0, false, false, false);
        // });
    }

    closeMenu(showUi = true, unFreezePlayer = true, showCursor = false) {
        if (showUi && unFreezePlayer) {
            showUiAndFreezePlayer(showUi);
        } else if (showUi) {
            showUi(showUi)
        } else if (unFreezePlayer) {
            game.freezeEntityPosition(game.playerPedId(), true);
        }

        // alt.setTimeout(() => {
        //     game.clearPedSecondaryTask(alt.getLocalPlayer().scriptID);
        //     game.detachEntity(this.tablet, true, true);
        //     game.deleteObject(this.tablet);
        //     this.tabletView.destroy();
        // }, 0);
        alt.log('Inside closeMenu function');
        this.menusView.emit('closeMenu');
        this.menusView.unfocus();
        this.viewOpened = false;
        alt.showCursor(showCursor);
        alt.log(`Setting the cursor to ${showCursor}`);
    }

    showCefNotification(type, title, message, duration = 5000, icon = true) {
        try {
            if (typeof type === 'number' && typeof message === 'string') {
                this.menusView.emit('showNotification', type, title, message, duration, icon);
            }
        } catch (error) {
            alt.log('MenusManager -> showCefNotification -> ' + error);
        }
    }

    showConfirmModal(title, message, confirmCallback = null, cancelCallback = null, args = null) {
        try {
            if (typeof message == 'string') {
                alt.log(`[CONFIRM MODAL] ConfirmCallback = ${JSON.stringify(confirmCallback)} type = ${typeof confirmCallback} CancelCallback = ${JSON.stringify(cancelCallback)} type = ${typeof cancelCallback}`);
                this.menusView.emit('showConfirmModal', title, message, confirmCallback, cancelCallback, args);
                this.viewOpened = true;
                this.menusView.focus();
            }
        } catch (error) {
            alt.log('MenusManager -> showConfirmModal -> ' + error);
        }
    }

    focusView() {
        if (this.viewOpened)
            this.menusView.focus();
    }

    unfocusView() {
        this.menusView.unfocus();
    }
}

const menusManager = new MenusManager();

menusManager.onUiEvent('viewLoaded', () => {
    menusManager.viewLoaded = true;
});

export default menusManager;
