import React from "react";

const AppContext = React.createContext();
AppContext.displayName = "NotesAppContext";

let initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.data };
    }

    default: return state;
  }
}

function AppContextProvier(props) {
  let value = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context)
    throw new Error("You must use AppContext inside of a AppContextProvider");
  return context;
}

export { AppContextProvier, useAppContext };
