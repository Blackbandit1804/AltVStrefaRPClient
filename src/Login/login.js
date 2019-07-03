import * as alt from 'alt';
import * as game from 'natives';
import mainUi from 'src/Modules/Ui/mainUi.js';
import { changeGameState } from 'src/gameState.js';

let localPlayer = alt.getLocalPlayer();

mainUi.onUiEvent('tryToLogin', (username, password) => {
    if (!username || !password) {
        return mainUi.emitUiEvent('showError', 'Wysłano puste dane');
    }

    alt.emitServer('loginAccount', username, password);
});

mainUi.onUiEvent('tryToRegister', (username, password) => {
    if (!username || !password) {
        return mainUi.emitUiEvent('showError', 'Wysłano puste dane');
    }

    alt.emitServer('registerAccount', username, password);
});

mainUi.onUiEvent('loadCharacter', (characterId) => {
    characterId = Number(characterId);
    alt.log('Loading character with id: ' + characterId);
    alt.emitServer('tryToLoadCharacter', characterId);
});

mainUi.onUiEvent('tryToCreateNewCharacter', () => {
    alt.emitServer('tryToCreateNewCharacter');
});

alt.onServer('showAuthenticateWindow', () => {
    alt.log('Loading login view');
    showLoginWindow();
});

alt.onServer('showLoginError', (message) => {
    mainUi.emitUiEvent('showError', message);
});

alt.onServer('successfullyRegistered', () => {
    mainUi.emitUiEvent('registeredSuccessfully');
});

alt.onServer('loginSuccesfully', (characterList) => {
    if (characterList) {
        alt.log('Character list: ' + characterList);
        mainUi.emitUiEvent('succesfullyLoggedIn', characterList);
    }
});

alt.onServer('CharacterCreatedSuccessfully', () => {
    // Destory any camera etc
    alt.log('Character created succesfully');
    game.freezeEntityPosition(localPlayer.scriptID, false);
    game.setPedDefaultComponentVariation(localPlayer.scriptID);
    // mainUi.emitUiEvent('hideCharacterSelectWindow');
    hideLoginView();
});

alt.onServer('loadedCharacter', () => {
    game.freezeEntityPosition(localPlayer.scriptID, false);
    game.setPedDefaultComponentVariation(localPlayer.scriptID);
    // mainUi.emitUiEvent('hideCharacterSelectWindow');
    hideLoginView();
});

function showLoginWindow() {
    if (mainUi.viewLoaded) {
        mainUi.openMenu('openLoginView', true, true);
    } else {
        let interval = alt.setInterval(() => {
            if (mainUi.viewLoaded) {
                mainUi.openMenu('openLoginView', true, true);
                alt.clearInterval(interval);
            }
        }, 100);
    }
}

function hideLoginView() {
    changeGameState('playing');
    mainUi.closeMenu();
}