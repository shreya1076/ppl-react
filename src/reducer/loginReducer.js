import initialState from "../states/loginStates";
export default (state = initialState, action) => {
  console.log("<<<<<<state for login", state);
  return state;
};
