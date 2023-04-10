import { createSlice } from "@reduxjs/toolkit"

const AdminAuth=createSlice({
    name: "Admin",
    initialState: {
        AdminToken: null
    },
    reducers:{
        AddAdmin(state,actions){
            const admin =actions.payload;
            state.AdminToken=admin.token
        },
        AdminLogout(state,actions){
            state.AdminToken=''
        }
    }
})


export const AdminActions=AdminAuth.actions
export default AdminAuth
