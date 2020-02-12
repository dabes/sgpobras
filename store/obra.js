obraInitialState = {
  id: 1,
  codigo: 7,
  descricao: "CONTRUÇÃO DE TORRE DE TRANSMISSÃO",
  bem_publico: "AUTÓDROMO, KARTÓDROMO",
  photos: []
};

export default function configs(state = obraInitialState, action) {
  switch (action.type) {
    case "SELECIONADAS":
      state.photos = action.photos;
      return {
        ...state
      };
    case "SEARCHOBRAS":
      state = action.filter;
      return {
        ...state
      };
    case "CARGAOBRAS":
      return { ...obraInitialState };
    default:
      return state;
  }
}
