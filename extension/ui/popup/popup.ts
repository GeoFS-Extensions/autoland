interface popupState {
	ap: boolean
	fmc: boolean
}

interface buttons {
	ap: HTMLElement,
	fmc: HTMLElement
}

var ap: boolean = false
var fmc: boolean = false
var buttons: buttons = getCurrentButtonState()
var options: popupState

function flipBool (toFlip: "ap" | "fmc"): boolean {
	var flipped: boolean

	if (toFlip == "ap") {
		flipped = !ap
		ap = flipped
		if (fmc) {
			flipBool("fmc")
		}
	} else {
		flipped = !fmc
		fmc = flipped
	}

	return flipped
}

function writeStateToMemory(state: popupState): popupState {
	chrome.storage.sync.set({options: state}, () => {})
	return state
}

function readStateFromMemory(): popupState {
	var data: popupState
	chrome.storage.sync.get("options", (items) => {
		if (items.options) {
			data = items.options
		} else {
			data = {
				ap: false,
				fmc: false
			}
		}
	})

	return data
}

function getCurrentButtonState(): buttons {
	return {
		ap: document.getElementById("apbutton"),
		fmc: document.getElementById("fmcbutton")
	}
}

function getCurrentPopupState(): popupState {
	return {
		ap: ap,
		fmc: fmc
	}
}

function hideOrShowFMCButton(show: boolean, button: HTMLElement): void {
	if (show) {
		button.style.display = ""
	} else {
		button.style.display = "none"
	}
}

function updateButtons(buttons: buttons, bools: popupState): buttons {
	if (bools.ap) {
		buttons.ap.className = "running"
		hideOrShowFMCButton(true, buttons.fmc)
	} else {
		buttons.ap.className = "button"
		hideOrShowFMCButton(false, buttons.fmc)
	}

	if (bools.fmc) {
		buttons.fmc.className = "running"
	} else {
		buttons.fmc.className = "button"
	}
	
	return getCurrentButtonState()
}

window.onload = () => {
	options = readStateFromMemory()
}

buttons.ap.addEventListener("click", () => {
	flipBool("ap")
	options = getCurrentPopupState()
	updateButtons(buttons, options)
	writeStateToMemory(options)
})

buttons.fmc.addEventListener("click", () => {
	flipBool("fmc")
	options = getCurrentPopupState()
	updateButtons(buttons, options)
	writeStateToMemory(options)
})