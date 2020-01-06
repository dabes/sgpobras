import { combineReducers } from "redux";

bemInitialState = {
  id: null,
  tombamento: null,
  descricao: null,
  produto_descricao: null,
  sigla: null,
  encontrado: null,
  ccusto: null,
  photo: null,
  obs: null
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
      state = action.bem;
      return {
        ...state
      };
    default:
      return state;
  }
}

export default combineReducers({ bem, bens });
