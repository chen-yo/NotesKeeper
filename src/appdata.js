import React from "react";

const AppContext = React.createContext();
AppContext.displayName = "NotesAppContext";

let initialState = {user: null, notes: []};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.data };
    }

    case "LOAD_NOTES": {
      return { ...state, notes: action.data };
    }

    case "DELETE_NOTE": {
      const noteId = action.data
      return { ...state, notes: state.notes.filter(note=>note.id !== noteId) };
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
