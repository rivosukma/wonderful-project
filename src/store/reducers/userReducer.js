import {
    USER,
    SET_USER_DATA,
    SET_IS_SEARCH,
    SET_FILTER_USER_DATA,
    SET_SORT_USERNAME,
    SET_SORT_NAME,
    SET_SORT_EMAIL,
    SET_SORT_GENDER,
    SET_SORT_REGISTERED
} from '../actions/userAction';


const initialState = {
    userList: [],
    filtered: [],
    isSearch: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case USER:
            return {
                ...state
            }
        case SET_USER_DATA:
            state.userList = action.data
            return {
                ...state
            }
        case SET_FILTER_USER_DATA:
            let filter = state.userList
                .filter(flt => {
                    if(flt.name.first?.toLowerCase()?.includes(action.data?.toLowerCase())) return flt
                    if(flt.name.last?.toLowerCase()?.includes(action.data?.toLowerCase())) return flt
                    if(flt.email?.toLowerCase()?.includes(action.data?.toLowerCase())) return flt
                    if(flt.login.username?.toLowerCase()?.includes(action.data?.toLowerCase())) return flt
                })
            state.filtered = filter
            return {
                ...state
            }
        case SET_SORT_USERNAME:
            let sort_username = state.userList
            .sort((a, b) => {
                var nameA = a.login.username?.toLowerCase()
                var nameB = b.login.username?.toLowerCase()
                if (nameA < nameB) {
                  return -1
                }
                if (nameA > nameB) {
                  return 1
                }
                return 0
              });
            state.filtered = sort_username
            return {
                ...state
            }
        case SET_SORT_NAME:
            let sort_name = state.userList
            .sort((a, b) => {
                var nameA = a.name.first?.toLowerCase()
                var nameB = b.name.first?.toLowerCase()
                if (nameA < nameB) {
                  return -1
                }
                if (nameA > nameB) {
                  return 1
                }
                return 0
              });
            state.userList = sort_name
            return {
                ...state
            }
        case SET_SORT_EMAIL:
            let sort_email = state.userList
            .sort((a, b) => {
                var nameA = a.email?.toLowerCase()
                var nameB = b.email?.toLowerCase()
                if (nameA < nameB) {
                  return -1
                }
                if (nameA > nameB) {
                  return 1
                }
                return 0
              });
            state.userList = sort_email
            return {
                ...state
            }
        case SET_SORT_GENDER:
            let sort_gender = state.userList
            .sort((a, b) => {
                var nameA = a.gender?.toLowerCase()
                var nameB = b.gender?.toLowerCase()
                if (nameA < nameB) {
                  return -1
                }
                if (nameA > nameB) {
                  return 1
                }
                return 0
              });
            state.userList = sort_gender
            return {
                ...state
            }
        case SET_SORT_REGISTERED:
            let sort_registered = state.userList
            .sort((a, b) => {
                var nameA = a.registered.date?.toLowerCase()
                var nameB = b.registered.date?.toLowerCase()
                if (nameA < nameB) {
                  return -1
                }
                if (nameA > nameB) {
                  return 1
                }
                return 0
              });
            state.userList = sort_registered
            return {
                ...state
            }
        case SET_IS_SEARCH:
            state.isSearch = action.data
            return {
                ...state
            }
        default:
            return state
    }
}