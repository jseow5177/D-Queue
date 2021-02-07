import React from "react";

export function useSetStepVerifier(verifier, setVerifier, dependentState) {
    React.useEffect(() => {
        setVerifier(() => verifier);

        //Return unmount cleanup function to reset verifier
        return () => setVerifier(() => undefined);
    }, [dependentState]);
}