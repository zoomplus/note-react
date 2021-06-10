import React, {
    useState,
    useContext,
    useEffect,
    useReducer
} from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { reducer } from '@frontend/context/reducer';

import { db } from '@frontend/models/db';

const Context = React.createContext([]);

const Provider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, null);

    // async function, set data awaited useLiveQuery
    const markdown = useLiveQuery(() => db.markdown.toArray());
    useEffect(() => {
        if(markdown) {
            dispatch({
                type: 'SET_MARKDOWN',
                payload: markdown
            });
        }
    }, [markdown]);

    return <Context.Provider value={[state, dispatch]}>
        {children}
    </Context.Provider>

}

const useCustomContext = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('some error');
    }

    return context;
}

export {
    Provider,
    useCustomContext
}