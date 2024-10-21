import axios from "axios";
import { toast } from "react-toastify";

const key = 'f5041219e66dd1f77b3316f0cf13ec33'

const api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/forecast",
    params: {
      appid: "f5041219e66dd1f77b3316f0cf13ec33",
    }
  });

export const getData = (params)=>{
    return  api.get("", {
      params: params
    }).then((res)=>res)
}