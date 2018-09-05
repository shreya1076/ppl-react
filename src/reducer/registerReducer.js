import initialState from "../states/registerStates";
console.log("intailstate", initialState);
export default (state = initialState, action) => {
  console.log("<<<state for registration", state);
  switch (action.type) {
    case "inputTypeHandler":
      console.log("the action is ", action);
      return {
        ...state,
        [action.name]: action.value
      };
  }
};
