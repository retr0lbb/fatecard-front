import { Route, Routes } from "react-router";
import Page from "../pages/main"
import CriarPalestra from "../cadastropalestra";

export function MyRouter(){
    return(
    <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/add" element={<CriarPalestra />} />
    </Routes>
    )
}