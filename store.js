import { combineReducers } from "redux";

configurationInitialState = {
  ip: "10.0.18.70:3000",
  ccusto_selecionado: 1
};

ccustoInitialState = [
  {
    id: -1,
    sigla: "asxp",
    descricao: "a",
    unidade: "0101"
  }
];

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
      state.ip = action.ip;
      return {
        ...state
      };
    case "CCUSTO":
      state.ccusto_selecionado = action.ccusto;
      return {
        ...state
      };
    default:
      return state;
  }
}

function ccustos(state = ccustoInitialState, action) {
  switch (action.type) {
    case "CARGACENTROCUSTO":
      state = action.ccusto;
      return {
        ...state
      };
    default:
      return state;
  }
}

function bens(state = bensInitialState, action) {
  switch (action.type) {
    case "CARGABEM":
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
    case "BEMENCONTRADO":
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
    case "ENCONTRADO":
      state.encontrado = action.encontrado;
      return {
        ...state
      };
    case "BEMCCUSTO":
      state.ccusto = action.ccusto;
      return {
        ...state
      };
    default:
      return state;
  }
}

export default combineReducers({ bem, bens, configs, ccustos });
