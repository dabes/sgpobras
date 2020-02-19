obrasInitialState = [];

export default function configs(state = obrasInitialState, action) {
  switch (action.type) {
    case "FILTERBEMOBRA":
      state = action.filter;
      return {
        ...state
      };
    default:
      return state;
  }
}
