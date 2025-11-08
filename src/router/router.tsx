import { Route, Routes } from "react-router";
import { App } from "../App";
import CriarPalestra from "../cadastropalestra";



export function MyRouter(){
    return(
    <Routes>
        <Route path="/" element={<CriarPalestra />} />
    </Routes>
    )
}