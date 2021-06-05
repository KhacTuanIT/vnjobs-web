import * as Types from './../constants/ActionTypes';

export const search = (keywory, options) => {
    return {
        type: Types.SEARCH,
        keywory,
        options
    }
}

export const apply = (data) => {
    return {
        type: Types.APPLY,
        data
    }
}