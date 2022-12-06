VirtualGamepadVirtualButton = class VirtualGamepadVirtualButton {
    constructor(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        this._myButtonElement = null;
        this._myButtonBackElement = null;
        this._myButtonIconElement = null;

        this._myIsActive = true;

        this._myTouchID = null;

        this._myIsPressed = false;

        this._build(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID);

        this._myButtonElement.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._myButtonElement.addEventListener("touchstart", this._onMouseDown.bind(this));
        document.body.addEventListener("mouseup", this._onMouseUp.bind(this));
        document.body.addEventListener("touchend", this._onMouseUp.bind(this));

        if (virtualGamepadParams.myReleaseOnMouseLeave) {
            document.body.addEventListener("mouseenter", this._onMouseUp.bind(this));
            document.body.addEventListener("mouseleave", this._onMouseUp.bind(this));
        }
    }

    isPressed() {
        return this._myIsActive && this._myIsPressed;
    }

    setActive(active) {
        this._myIsActive = active;
    }

    _onMouseDown(event) {
        if (!this._myIsActive) return;
        if (this._myIsPressed) return;

        event.preventDefault();

        this._myButtonIcon.setPressed(true);

        // if this is a touch event, keep track of which one
        if (event.changedTouches) {
            this._myTouchID = event.changedTouches[0].identifier;
        }

        this._myIsPressed = true;
    }

    _onMouseUp(event) {
        if (!this._myIsActive) return;
        if (!this._myIsPressed) return;

        // if this is a touch event, make sure it is the right one
        if (event.changedTouches != null && event.changedTouches.length > 0 && this._myTouchID != event.changedTouches[0].identifier) return;

        this._myButtonIcon.setPressed(false);

        this._myIsPressed = false;
        this._myTouchID = null;
    }

    _build(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        // setup variables used for the sizes and similar

        let buttonSize = virtualGamepadParams.myButtonSize * virtualGamepadParams.myScale;
        let buttonsRingRadius = virtualGamepadParams.myButtonsRingRadius * virtualGamepadParams.myScale;

        let thumbstickSize = virtualGamepadParams.myThumbstickSize * virtualGamepadParams.myScale;

        let marginBottom = virtualGamepadParams.myMarginBottom * virtualGamepadParams.myScale * virtualGamepadParams.myScaleMargin;
        let marginLeft = virtualGamepadParams.myMarginLeft * virtualGamepadParams.myScale * virtualGamepadParams.myScaleMargin;
        let marginRight = virtualGamepadParams.myMarginRight * virtualGamepadParams.myScale * virtualGamepadParams.myScaleMargin;

        let buttonRingStartAngle = virtualGamepadParams.myButtonsRingStartAngle;
        let buttonRingEndAngle = virtualGamepadParams.myButtonsRingEndAngle;

        let minSizeMultiplier = Math.max(1, virtualGamepadParams.myMinSizeMultiplier / virtualGamepadParams.myScale);

        let fontSize = virtualGamepadParams.myLabelFontSize * virtualGamepadParams.myScale * virtualGamepadParams.myScaleLabelFont;

        let buttonsAmount = virtualGamepadParams.myButtonsOrder[PP.Handedness.LEFT].length;

        let buttonParams = virtualGamepadParams.myButtonParams[gamepadButtonHandedness][gamepadButtonID];

        let angleStep = (buttonRingEndAngle - buttonRingStartAngle) / (buttonsAmount - 1);

        let currentAngle = Math.pp_angleClamp(buttonRingStartAngle + angleStep * virtualButtonIndex);

        if (virtualButtonHandedness == PP.Handedness.RIGHT) {
            currentAngle = 270 + (270 - currentAngle);
            currentAngle = Math.pp_angleClamp(currentAngle, true);
        }

        let counterAngle = 360 - currentAngle;

        // actual button creation

        let buttonPivot = document.createElement("div");
        buttonPivot.style.position = "absolute";
        buttonPivot.style.width = this._createSizeValue(buttonSize, minSizeMultiplier);
        buttonPivot.style.height = this._createSizeValue(buttonSize, minSizeMultiplier);

        let centerOnThumbstickBottom = marginBottom + thumbstickSize / 2 - buttonSize / 2;

        buttonPivot.style.bottom = this._createSizeValue(centerOnThumbstickBottom, minSizeMultiplier);

        if (virtualButtonHandedness == PP.Handedness.LEFT) {
            let centerOnThumbstickLeft = marginLeft + thumbstickSize / 2 - buttonSize / 2;
            buttonPivot.style.left = this._createSizeValue(centerOnThumbstickLeft, minSizeMultiplier);
        } else {
            let centerOnThumbstickRight = marginRight + thumbstickSize / 2 - buttonSize / 2;
            buttonPivot.style.right = this._createSizeValue(centerOnThumbstickRight, minSizeMultiplier);
        }

        buttonPivot.style.transform = "rotate(" + currentAngle + "deg) translateX(" + this._createSizeValue(buttonsRingRadius, minSizeMultiplier) + ")";
        buttonElementParent.appendChild(buttonPivot);

        this._myButtonElement = document.createElement("div");
        this._myButtonElement.style.position = "absolute";
        this._myButtonElement.style.width = "100%";
        this._myButtonElement.style.height = "100%";
        this._myButtonElement.style.transform = "rotate(" + counterAngle + "deg)";
        buttonPivot.appendChild(this._myButtonElement);

        this._myButtonIcon = new VirtualGamepadIcon(this._myButtonElement, buttonParams.myIconParams, minSizeMultiplier);
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }
};