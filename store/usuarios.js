usuariosInitialState = [
  {
    usr_codigo: 1,
    usr_login: "master",
    usr_senha: "f33296e4a482a38916e037cf2bc3acec"
  }
];

export default function usuarios(state = usuariosInitialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state
      };
    case "LOGOUT":
      return {
        ...state
      };
    default:
      return state;
  }
}
