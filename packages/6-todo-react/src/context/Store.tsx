
import React, { createContext, FC, useReducer } from "react";
import { TodosActions } from './TodosActions';
import TodosReducer from './TodosReducer';
import { TodosState } from './TodosState';
interface GlobalContext {
    state: TodosState,
    dispatch: React.Dispatch<TodosActions>;
}

const initialState: TodosState = {
    todos: {}
};

export const Context: React.Context<GlobalContext> = createContext<GlobalContext>({ state: initialState, dispatch: () => null });

const Store: FC = ({ children }) => {
    const [state, dispatch] = useReducer(TodosReducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }} >
            {children}
        </Context.Provider>
    )
};

export default Store;