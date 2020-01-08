import CargaApp from "../screens/CargaApp";
import LinksScreen from "../screens/LinksScreen";
import BemScreen from "../screens/BemScreen";
import Configuration from "../screens/Configuration";

export default [
  {
    id: 1,
    routename: "Carregar Dados",
    screen: CargaApp,
    label: "Carga Dados",
    path: "",
    ios_icon: "ios-information-circle",
    other_icon: "md-information-circle"
  },
  {
    id: 2,
    routename: "LinksScreen",
    screen: LinksScreen,
    label: "LinksScreen",
    path: "",
    ios_icon: "ios-information-circle",
    other_icon: "md-information-circle"
  },
  {
    id: 3,
    routename: "Inventário",
    screen: BemScreen,
    label: "Inventário",
    path: "",
    ios_icon: "ios-create",
    other_icon: "md-create"
  },
  {
    id: 4,
    routename: "Configuração",
    screen: Configuration,
    label: "Configuração",
    path: "",
    ios_icon: "ios-cog",
    other_icon: "md-cog"
  }
];
