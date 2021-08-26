import {Filter} from "../../utils";

export const defaultState = (overrideObj = {}) => {
    return {
        ...{
            items: [],
            selectedItem: {},
            isLoading: true,
            filter: new Filter()
        },
        ...overrideObj
    }
}