import axios from "axios";
import ActionInterface from "../../interfaces/actionInterface";
import { GET_TXLIST } from "../constants";

const { API_KEY, DEFAULT_ADDRESS, URL_BASE } = process.env;

export const getTxList = async (address?: string) => {
    return async (dispatch: any) => {
        try {
            const txList = await axios.get(`${URL_BASE}&address=${address ? address : DEFAULT_ADDRESS}&apikey=${API_KEY}`);

            console.log(txList.data);

            dispatch({
                type: GET_TXLIST,
                payload: txList.data.result
            });
        } catch (error) {
            console.log(error);
        }
    }
}