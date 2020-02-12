import CargaApp from "../screens/CargaApp";
import DescargaApp from "../screens/DescargaApp";
import Configuration from "../screens/Configuration";
import Obras from "../screens/Obras";

export default [
  {
    id: 1,
    routename: "Carregar Dados",
    screen: CargaApp,
    label: "Carga de Dados",
    path: "",
    ios_icon: "ios-information-circle",
    other_icon: "md-information-circle"
  },
  {
    id: 2,
    routename: "Configuração",
    screen: Configuration,
    label: "Configuração",
    path: "",
    ios_icon: "ios-cog",
    other_icon: "md-cog"
  },
  {
    id: 3,
    routename: "Obras",
    screen: Obras,
    label: "Obras",
    path: "",
    ios_icon: "ios-cog",
    other_icon: "md-cog"
  },
  {
    id: 4,
    routename: "Descarregar Dados",
    screen: DescargaApp,
    label: "Descarga de Dados",
    path: "",
    ios_icon: "ios-information-circle",
    other_icon: "md-information-circle"
  }
];
