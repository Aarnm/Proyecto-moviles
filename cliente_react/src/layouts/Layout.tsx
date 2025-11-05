import { Outlet } from "react-router-dom";
import NavBarLateral from "../components/NavBarLateral";
//import PiePagina from "../components/PiePagina";

export default function Layout(){
    return(
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* HTML DE LA NAVBAR LATERAL */}
                    <NavBarLateral/>

                    {/* CONTENIDO PRINCIPAL */}
                    <main className="container-fluid">
                        {/* CONTENIDO DINAMICO */}
                        <Outlet/> 
                    </main>
                </div>
            </div>
        </>
    )
}