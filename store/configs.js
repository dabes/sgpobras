configurationInitialState = {
  ip: null,
  showsearch: false,
  showfiltrobem: false
};

export default function configs(state = configurationInitialState, action) {
  switch (action.type) {
    case "IP":
      state.ip = action.ip;
      return {
        ...state
      };
    case "CCUSTO":
      state.ccusto_selecionado = action.ccusto;
      return {
        ...state
      };
    case "TOOGLESEARCH":
      state.showsearch = !state.showsearch;
      return {
        ...state
      };
    case "TOOGLEFILTERBEMOBRA":
      state.showfiltrobem = !state.showfiltrobem;
    default:
      return state;
  }
}
