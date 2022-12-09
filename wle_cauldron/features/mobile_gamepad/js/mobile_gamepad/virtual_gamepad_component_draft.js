WL.registerComponent("virtual-gamepad-draft", {
}, {
    start() {
        let params = new VirtualGamepadParams();
        params.defaultSetup();

        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.LABEL;
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabel = "T";
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabelFontSize = 2;

        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.IMAGE;
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageURL = "./image2.png";
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageBrightnessPressed = 0.5;

        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myBackgroundColorPressed = params.myThumbstickParams[PP.Handedness.RIGHT].myBackgroundColor;
        params.myThumbstickParams[PP.Handedness.RIGHT].myBackgroundColor = "#123123";
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myIconShape = VirtualGamepadIconShape.IMAGE;
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myImageURL = "./image2.png";
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myImageBrightnessPressed = 1.5;

        params.myButtonsOrder[PP.Handedness.LEFT][2] = null;

        params.myReleaseOnMouseLeave = false;
        params.myInterfaceScale = 1;
        params.myMarginScale = 1;

        params.myShowOnDesktopBrowser = false;
        params.myShowOnHeadset = true;
        params.myShowOnMobileBrowser = true;

        this._myVirtualGamepad = new VirtualGamepad(params);

        this._myVirtualGamepad.start();
    },
    update(dt) {
        this._myVirtualGamepad.update(dt);
    }
});