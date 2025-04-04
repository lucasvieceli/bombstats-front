import React, { useEffect } from 'react';

export const useEffectExceptOnMount = (effect: any, dependencies: any) => {
    const mounted = React.useRef(false);
    React.useEffect(() => {
        if (mounted.current) {
            const unmount = effect();
            return () => unmount && unmount();
        } else {
            mounted.current = true;
        }
    }, dependencies);

    // Reset on unmount for the next mount.
    // eslint-disable-next-line
    useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);
};
