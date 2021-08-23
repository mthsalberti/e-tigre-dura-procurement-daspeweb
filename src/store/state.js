export const defaultState = (overrideObj = {}) => {
    return {
        ...{
            items: [],
            selectedItem: {},
            isLoading: true
        },
        ...overrideObj
    }
}