import ActionInterface from "../../interfaces/ActionInterface";
import StateInterface from "../../interfaces/stateInterface";
import { GET_TXLIST } from "../constants";
import { upgradeAddress, getAddress } from "../../utils/addressApp";

const initialState: StateInterface = {
    txList: []
}

const reducer = (state: StateInterface = initialState, { type, payload }: ActionInterface) => {
    switch (type) {
        case GET_TXLIST:
            upgradeAddress(payload);

            return {
                ...state,
            };

        default:
            return state;
    }
};


export default reducer