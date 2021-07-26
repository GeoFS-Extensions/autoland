interface PopupState {
	ap: boolean,
	fmc: boolean
}

interface Buttons {
	ap: HTMLElement,
	fmc: HTMLElement
}

const emptyButtons = (): Buttons => {
    return {
        ap: undefined,
        fmc: undefined
    }
}

// src: modified https://developer.chrome.com/docs/extensions/reference/storage/
const GetStorageSyncData = (name: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get([name], (items) => {
		if (chrome.runtime.lastError) {
			return reject(chrome.runtime.lastError);
		}
		resolve(items);
		});
	});
}

const getOptions = async (): Promise<PopupState> => {
    let data: PopupState;
    await GetStorageSyncData('options').then(val => {
        data = val.options;
    });
    return data;
}

const setOptions = (options: PopupState): PopupState => {
    chrome.storage.sync.set({options: options}, () => {})
    return options;
}

const getButtons = (): Buttons => {
    let buttons = emptyButtons();
    (Object.keys(buttons) as Array<keyof Buttons>).forEach(key => {
        buttons[key] = document.querySelector(`#${key}button`);
    });
    return buttons;
}

const UpdateButtons = (buttons: Buttons, options: PopupState) => {
    (Object.keys(buttons) as Array<keyof Buttons>).forEach(key => {
        if (options[key]) {
            buttons[key].className = 'on';
            if(key == 'ap') buttons.fmc.style.display = '';
        } else {
            buttons[key].className = 'off';
            if(key == 'ap') {
                buttons.fmc.style.display = 'none';
                options = setOptions({ap: false, fmc: false});
            };
        }
    });
}

window.onload = async () => {
    let buttons = getButtons();
    let options = await getOptions();
    UpdateButtons(buttons, options);
    (Object.keys(buttons) as Array<keyof Buttons>).forEach(key => {
        buttons[key].addEventListener('click', () => {
            options = setOptions({...options, [key]: !options[key]}); // works until we add sound
            UpdateButtons(buttons, options);
        });
    });
}