export const pendingReducer = (state = {}, action) => {
    const { type } = action;
    const actionName = getActionName(type);
  
    if (!actionName) {
      return {
        ...state
      };
    }
  
    if (type.endsWith('_START')) {
      return {
        ...state,
        [actionName]: {
          pending: true
        }
      };
    }
  
    if (type.endsWith('_SUCCESS') || type.endsWith('_FAIL')) {
      return {
        ...state,
        [actionName]: {
          pending: false
        }
      };
    }
  
    return {
      ...state
    };
  };

  function getActionName(actionType) {
    if (typeof actionType !== 'string') {
      return null;
    }
   
    return actionType
      .split("_")
      .slice(0, -1)
      .join("_");
   }

   export function getLoadingIndicator(actionName, pendingState) {
     return pendingState[actionName]?.pending
  }
  