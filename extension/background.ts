interface options {
	ap: boolean;
	fmc: boolean;
};


// src: modified https://developer.chrome.com/docs/extensions/reference/storage/
function getStorageData(name: string): Promise<any> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get([name], (items) => {
			if (chrome.runtime.lastError) {
				return reject(chrome.runtime.lastError);
			}
			resolve(items);
		});
	});
}

async function readState(): Promise<popupState> {
	let data;
	await getStorageData("options").then(val => {
		data = val;
	});
	return data as popupState
}

var options: popupState
(async function() {
	options = await readState();
})()


/**
 * Add one of the autoland modules
 * @param {string} name The name of the js file, without the .js extension
 */
const addModule = (name: string) => {
	if (name == "ap") {
		name = "ap++"
	}
	let scriptTag = document.createElement('script');
	scriptTag.src = chrome.runtime.getURL(`${name}.js`);
	scriptTag.id = name.toUpperCase();
	scriptTag.type = "module";
	scriptTag.classList.add("autoland-extension-scripts");
	scriptTag.onload = () => {scriptTag.remove()};
	(document.head || document.documentElement).appendChild(scriptTag);
};

// update cache when storage changes
chrome.storage.onChanged.addListener(async () => {
	options = await readState();
	/* TODO
		we can just get the url of the active tab and see if it's geofs
		and if anything turned from false to true we just add the script, if it turns to false we can refresh */
});

chrome.tabs.onCreated.addListener((tab) => {
	if (tab.url != "https://www.geo-fs.com/geofs.php") {
		return;
	}
	// the tab is definitely a geo tab
	let keys = Object.keys(options) as Array<keyof options>;
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];

		if (options[key]) {
			chrome.scripting.executeScript({
				target: {tabId: tab.id, allFrames: true},
				func: (name: any): void => {
					switch (name) {
						case 'ap':
							name = 'ap++'
					}
					let scriptTag = document.createElement('script');
					scriptTag.src = chrome.runtime.getURL(`${name}.js`);
					scriptTag.id = name.toUpperCase();
					scriptTag.type = "module";
					scriptTag.classList.add("autoland-extension-scripts");
					scriptTag.onload = () => {scriptTag.remove()};
					(document.head || document.documentElement).appendChild(scriptTag);
				},
				args: [key]
			});
		}
	}
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.needsData) {
		sendResponse({options: options});
	}
});