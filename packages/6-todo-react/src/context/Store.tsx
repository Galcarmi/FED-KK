
import React, { createContext, FC, useReducer } from "react";
import TodosReducer from './TodosReducer';
import { TodosState } from './TodosState';


const initialState: TodosState = {
    todos: {}
};

const Store: FC = ({ children }) => {
    const [state, dispatch] = useReducer(TodosReducer, initialState);
    return (
        <Context.Provider value={([state, dispatch] as any)}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;