import { Route, Routes } from "react-router";
import Page from "../pages/main"



export function MyRouter(){
    return(
    <Routes>
        <Route path="/" element={<Page />} />
    </Routes>
    )
}