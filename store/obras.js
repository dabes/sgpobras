obrasInitialState = [
  {
    id: 1,
    codigo: 7,
    descricao: "CONTRUÇÃO DE TORRE DE TRANSMISSÃO",
    bem_publico: "AUTÓDROMO, KARTÓDROMO",
    photos: []
  },
  {
    id: 2,
    codigo: 2,
    descricao: "DESCOMISSIONAMENTO",
    bem_publico: "BARRAGENS",
    photos: []
  }
];

export default function configs(state = obrasInitialState, action) {
  switch (action.type) {
    case "CARGAOBRAS":
      state = action.obras;
      return {
        ...state
      };
    case "ATUALIZAOBRAS":
      for (var cada in state) {
        if (state[cada].id == action.obra.id) state[cada] = action.obra;
      }
      return {
        ...state
      };

    default:
      return state;
  }
}
