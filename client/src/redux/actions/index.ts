import axios from "axios";
import ActionInterface from "../../interfaces/ActionInterface";
import { GET_TXLIST } from "../constants";

require('dotenv').config();

const { API_KEY, DEFAULT_ADDRESS, URL_BASE } = process.env;

export const getTxList = async (address: string) => {
    return async (dispatch: any) => {
        try {
            const txList = await axios.get(`${URL_BASE}&address=${address ? address : DEFAULT_ADDRESS}&apikey=${API_KEY}`);

            dispatch({
                type: GET_TXLIST,
                payload: txList.data.result
            });
        } catch (error) {
            console.log(error);
        }
    }
}