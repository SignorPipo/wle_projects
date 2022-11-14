PP.EasyTuneTransformWidgetSetup = class EasyTuneTransformWidgetSetup extends PP.EasyTuneBaseWidgetSetup {

    _getBackPanelMinY() {
        return super._getBackPanelMinY() + this.myPositionPanelPosition[1] + this.myStepPanelPosition[1];
    }

    _getBackPanelMaxX() {
        return this.myDisplayPanelPosition[0] + this.myRotationPanelPosition[0] + this.myIncreaseButtonPosition[0] + this.mySideButtonBackgroundScale[0] + this._mySideButtonDistanceFromBorder;
    }

    _getBackPanelMinX() {
        return this.myDisplayPanelPosition[0] + this.myScalePanelPosition[0] + this.myDecreaseButtonPosition[0] - this.mySideButtonBackgroundScale[0] - this._mySideButtonDistanceFromBorder;
    }

    _getPivotZOffset() {
        return 0.00805713;
    }

    _initializeBuildSetupHook() {
        this.myIncreaseButtonText = "+";
        this.myDecreaseButtonText = "-";

        this.myDecreaseButtonPosition = [-0.13, 0, 0];
        this.myIncreaseButtonPosition = [-this.myDecreaseButtonPosition[0], 0, 0];

        let distanceBetweenComponents = Math.abs(this.myIncreaseButtonPosition[0]) + Math.abs(this.myRightSideButtonPosition[0]);
        let distanceFromVariableLabel = 0.045;
        this.myPositionPanelPosition = [0, this.myVariableLabelPanelPosition[1] - distanceFromVariableLabel, this._myPanelZOffset];
        this.myRotationPanelPosition = [this.myPositionPanelPosition[0] + distanceBetweenComponents, this.myVariableLabelPanelPosition[1] - distanceFromVariableLabel, this._myPanelZOffset];
        this.myScalePanelPosition = [this.myPositionPanelPosition[0] - distanceBetweenComponents, this.myVariableLabelPanelPosition[1] - distanceFromVariableLabel, this._myPanelZOffset];

        this.myPositionText = "Position";
        this.myRotationText = "Rotation";
        this.myScaleText = "Scale";

        this.myComponentLabelTextScale = [0.19, 0.19, 0.19];
        this.myComponentLabelCursorTargetPosition = [0, 0, 0];
        this.myComponentLabelCursorTargetPosition[2] = this._myColliderZOffset - this._myPanelZOffset;
        this.myComponentLabelCollisionExtents = [0.065, 0.0175, 1];
        this.myComponentLabelCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this._myValuePanelDistanceFromVariableLabelPanel = 0.055;
        this._myDistanceBetweenValues = this.mySideButtonBackgroundScale[1] * 2 + 0.015;

        this.myValueTextScale = [0.4, 0.4, 0.4];

        this.myValueCursorTargetPosition = [0, 0, 0];
        this.myValueCursorTargetPosition[2] = this._myColliderZOffset - this._myPanelZOffset;
        this.myValueCollisionExtents = [0.065, 0.02, 1];
        this.myValueCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this.myValuePanelsPositions = [];
        this.myValuePanelsPositions[0] = [0, -this._myValuePanelDistanceFromVariableLabelPanel, 0];
        for (let i = 1; i < 3; i++) {
            this.myValuePanelsPositions[i] = this.myValuePanelsPositions[i - 1].slice(0);
            this.myValuePanelsPositions[i][1] -= this._myDistanceBetweenValues;
        }

        let valuePanelLastPosition = this.myValuePanelsPositions[2][1];
        this.myStepPanelPosition = [0, valuePanelLastPosition - this._myValuePanelDistanceFromVariableLabelPanel, 0];
        this.myStepTextScale = [0.19, 0.19, 0.19];
        this.myStepStartString = "Step: ";

        this.myStepCursorTargetPosition = [0, 0, 0];
        this.myStepCursorTargetPosition[2] = this._myColliderZOffset - this.myStepPanelPosition[2];
        this.myStepCollisionExtents = [0.065, 0.0175, 1];
        this.myStepCollisionExtents[2] = this.myCursorTargetCollisionThickness;
    }

    _initializeRuntimeSetupHook() {
        this.myTextHoverScaleMultiplier = [1.25, 1.25, 1.25];

        this.myEditThumbstickMinThreshold = 0.35;
        this.myStepMultiplierStepPerSecond = 2.25;
        this.myButtonEditDelay = 0;
    }
};