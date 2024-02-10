import { useReducer } from 'react';

export default function useMergedState(initialValues) {
    const [
        state,
        setState,
    ] = useReducer(
        (prevState, updatedProperty) => ({
            ...prevState,
            ...updatedProperty,
        }),
        initialValues,
    );

    return [
        state,
        setState,
    ];
}
