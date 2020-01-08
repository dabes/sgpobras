import { combineReducers } from "redux";

configurationInitialState = {
  ip: "10.0.18.70:3000",
  ccusto_selecionado: null
};

bemInitialState = {
  id: null,
  tombamento: null,
  descricao: null,
  produto_descricao: null,
  sigla: null,
  encontrado: null,
  ccusto: null,
  photo: null,
  obs: null,
  searchBem: null
};

bensInitialState = [
  {
    id: 1,
    tombamento: "1",
    descricao: "1",
    produto_descricao: "1",
    sigla: "1",
    encontrado: false,
    ccusto: 1,
    photo: null,
    obs: null
  },
  {
    id: 2,
    tombamento: "031821",
    descricao: "2",
    produto_descricao: "2",
    sigla: "2",
    encontrado: false,
    ccusto: 1,
    photo: null,
    obs: null
  }
];

function configs(state = configurationInitialState, action) {
  switch (action.type) {
    case "IP":
      console.log(state, action);
      state.ip = action.ip;
      return {
        ...state
      };
    default:
      return state;
  }
}

function bens(state = bensInitialState, action) {
  switch (action.type) {
    case "B":
      state = action.bens;
      return {
        ...state
      };
    default:
      return state;
  }
}

function bem(state = bemInitialState, action) {
  switch (action.type) {
    case "A":
      state.searchBem = state.tombamento;
      state = action.bem;
      return {
        ...state
      };
    case "BARCODE":
      state.searchBem = action.code;
      state = action.bem;
      return {
        ...state,
        searchBem: action.code
      };
    case "D":
      state.todos = action.todos;
      return {
        ...state
      };
    default:
      return state;
  }
}

export default combineReducers({ bem, bens, configs });
