import { createSlice } from "@reduxjs/toolkit"

const UserAuth = createSlice({
    name: "user",
    initialState: {
        userToken: null,
        userName: null
    },
    reducers:{
        userAddDetails(state,actions){
        const user =actions.payload;
         state.userName=user.name
         state.userToken=user.token
        },
        userLogout(state,actions){
            state.userName=""
            state.userToken=""
        }
    }
})

export const UserActions= UserAuth.actions

export default UserAuth

