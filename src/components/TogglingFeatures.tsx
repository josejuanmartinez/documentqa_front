import React, {useState} from "react";
import {Box} from "@mui/material";
import {features} from "../constants/features";
import {Switch} from "@mui/joy";

export default function TogglingFeatures(
    {changeScreen}: {changeScreen: (index: number) => void}
) {
    const [customizeSplitting, setCustomizeSplitting] = useState(features['customizeSplitting']);
    const [generateAnswer, setGenerateAnswer] = useState(features['generateAnswer']);
    const [returnMockupAnswer, setReturnMockupAnswer] = useState(features['returnMockupAnswer']);

    const handleSwitchChange = (e: any) => {
        if(e == undefined) {
            return;
        }
        if (e.target == undefined) {
            return;
        }
        switch(e.target.id) {
            case undefined:
                return;
            case "customizeSplitting":
                features['customizeSplitting'] = !customizeSplitting;
                setCustomizeSplitting(!customizeSplitting);
                break;
            case "generateAnswer":
                features['generateAnswer'] = !generateAnswer;
                setGenerateAnswer(!generateAnswer);
                break;
            case "returnMockupAnswer":
                features['returnMockupAnswer'] = !returnMockupAnswer;
                setReturnMockupAnswer(!returnMockupAnswer);
                break;
        }
    };

    return <Box className="togglingFeaturesBox">
        <label>
            <Switch
                id="customizeSplitting"
                checked={customizeSplitting}
                onChange={handleSwitchChange}
            />
            <span>Customize Splitting</span>
        </label>
        <label>
            <Switch
                id="generateAnswer"
                checked={generateAnswer}
                onChange={handleSwitchChange}
            />
            <span>Generate Answer</span>
        </label>
        <label>
            <Switch
                id="returnMockupAnswer"
                checked={returnMockupAnswer}
                onChange={handleSwitchChange}
            />
            <span>Return Mock-up Answer</span>
        </label>

           </Box>
}