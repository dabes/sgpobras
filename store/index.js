import { combineReducers } from "redux";
import configs from "./configs";
import obra from "./obra";
import obras from "./obras";
import bempublico from "./bempublico";

export default combineReducers({ configs, obra, obras, bempublico });
