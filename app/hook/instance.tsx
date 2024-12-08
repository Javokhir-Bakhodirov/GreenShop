import axios from "axios";
import { API } from "./getApi";

export const instance = () => axios.create({ baseURL: API });
