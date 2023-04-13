export default {}
/**
import React, { createContext, useState } from 'react'

type Features = {
    key: string;
    value: boolean;
};

type IFeatureContext = [Features[], React.Dispatch<React.SetStateAction<Features[]>>];
export const FeaturesContext = createContext<IFeatureContext>([[], () => null]);

const FeatureContextProvider = (props:any ) => {
    const [features, setFeatures] = useState<Features[]>([
        {
            key: "customizeSplitting",
            value: false,
        },
        {
            key: "generateAnswer",
            value: false,
        },
    ]);
    return (
        <FeaturesContext.Provider
            value={[features, setFeatures]}>
            {props.children}
        </FeaturesContext.Provider>
    )
}
export default FeatureContextProvider**/