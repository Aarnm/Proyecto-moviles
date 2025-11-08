import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from './views/Home';
import VerVentas, {loader as loaderVentas} from "./views/VerVentas";
import CrearVenta, {action as actionCrearVenta}  from "./views/CrearVenta";
import VerDetallesVenta, {loader as loaderDetallesVenta} from "./views/VerDetallesVenta";
import VerProductos,{loader as loaderProductos} from "./views/VerProductos";

export const router = createBrowserRouter([
    // {
    //     path: "/login",
    //     element: <Login/>,
    //     action: actionLogin,
    // },
    {
        path: "/",
        element: <Layout/>,
        children:
        [
            {        
                children: [
                {
                    index:true,
                    element:<Home />,                    
                },
                {
                    path: 'ventas/ver',
                    element: <VerVentas />,
                    loader: loaderVentas
                },
                {
                    path: 'ventas/añadir',
                    element: <CrearVenta />,
                    action: actionCrearVenta
                },  
                {
                    path: 'ventas/:id/editar',
                    element: <VerDetallesVenta />,
                    loader: loaderDetallesVenta
                },
                {
                    path: 'productos/ver',
                    element: <VerProductos />,
                    loader: loaderProductos
                }                       
                ]
            }
        ]
    }
])
