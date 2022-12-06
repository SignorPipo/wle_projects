VirtualGamepad = class VirtualGamepad {
    constructor(params = new VirtualGamepadParams()) {
        this._myParams = params;

        this._myVisible = true;
        this._myVirtualGamepadContainer = null;

        this._myVirtualGamepadVirtualButtons = [];
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT] = [];
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT] = [];

        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON] = null;

        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON] = null;

        this._myButtonsAmount = this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT].length;
    }

    setVisible(visible) {
        if (this._myVirtualGamepadContainer == null) return;

        if (this._myVisible != visible) {
            this._myVisible = visible;

            if (this._myVisible) {
                this._myVirtualGamepadContainer.style.display = "block";
            } else {
                this._myVirtualGamepadContainer.style.display = "none";
            }

            for (let handednessButtons of this._myVirtualGamepadVirtualButtons) {
                for (let button of handednessButtons) {
                    if (button != null) {
                        button.reset();
                    }
                }
            }
        }
    }

    isButtonPressed(handedness, gamepadButtonID) {
        let button = this._myVirtualGamepadVirtualButtons[handedness][gamepadButtonID];
        if (button != null) {
            return button.isPressed();
        }

        return false;
    }

    getAxes(handedness) {

    }

    start() {
        this._buildVirtualGamepad();

        for (let handednessButtons of this._myVirtualGamepadVirtualButtons) {
            for (let button of handednessButtons) {
                if (button != null) {
                    button.start();
                }
            }
        }

        this._myVisible = !this._myVisible;
        this.setVisible(this._myVisible);
    }

    update(dt) {

    }

    _buildVirtualGamepad() {
        this._documentBodySetup();

        this._myVirtualGamepadContainer = document.createElement("div");
        this._myVirtualGamepadContainer.style.display = "block";
        this._myVirtualGamepadContainer.style.opacity = this._myParams.myOpacity.toString();
        document.body.appendChild(this._myVirtualGamepadContainer);

        let leftDiv = document.createElement("div");
        this._myVirtualGamepadContainer.appendChild(leftDiv);

        let rightDiv = document.createElement("div");
        this._myVirtualGamepadContainer.appendChild(rightDiv);

        let buttonsAmount = this._myParams.myButtonsOrder[PP.Handedness.LEFT].length;
        for (let i = 0; i < buttonsAmount; i++) {
            if (this._myParams.myButtonsOrder[PP.Handedness.LEFT][i] != null) {
                let gamepadButtonHandedness = this._myParams.myButtonsOrder[PP.Handedness.LEFT][i][0];
                let gamepadButtonID = this._myParams.myButtonsOrder[PP.Handedness.LEFT][i][1];
                this._buildButton(leftDiv, PP.Handedness.LEFT, i, gamepadButtonHandedness, gamepadButtonID);
            }

            if (this._myParams.myButtonsOrder[PP.Handedness.RIGHT][i] != null) {
                let gamepadButtonHandedness = this._myParams.myButtonsOrder[PP.Handedness.RIGHT][i][0];
                let gamepadButtonID = this._myParams.myButtonsOrder[PP.Handedness.RIGHT][i][1];
                this._buildButton(rightDiv, PP.Handedness.RIGHT, i, gamepadButtonHandedness, gamepadButtonID);
            }
        }
    }

    _documentBodySetup() {
        document.body.style.overflow = "hidden";
        document.body.style.userSelect = "none";
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
        document.body.style.webkitTapHighlightColor = "transparent";
        document.body.style.touchAction = "none";
    }

    _buildThumbstick() {
        let thumbstickSize = this._myThumbstickSize * this._myParams.myScaleMargin;

        let thumbstickBottom = this._myMarginBottom * this._myParams.myScaleMargin;
        let thumbstickLeft = this._myMarginLeft * this._myParams.myScaleMargin;
        let thumbstickRight = this._myMarginRight * this._myParams.myScaleMargin;

        let minSizeMultiplier = this._myMinSizeMultiplier * this._myParams.myScale;

        let fontSize = this._myFontSize * this._myParams.myScale * this._myParams.myScaleLabelFont;

    }

    _buildButton(buttonElementParent, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        let virtualGamepadVirtualButton = new VirtualGamepadVirtualButton(buttonElementParent, this._myParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID);
        this._myVirtualGamepadVirtualButtons[gamepadButtonHandedness][gamepadButtonID] = virtualGamepadVirtualButton;
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }
};