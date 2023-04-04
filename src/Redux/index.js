import {configureStore} from "@reduxjs/toolkit"
import UserAthu from "./UserAuth"
import AdminAthu from "./AdminAuth"

const Store=  configureStore(
    {reducer:{ user:UserAthu.reducer ,Admin:AdminAthu.reducer}
}
)

export default Store