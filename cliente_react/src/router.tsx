import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from './views/Home';
import InicioSesion from './views/InicioSesion';
import VerVentas, {loader, loader as loaderVentas} from "./views/VerVentas";
import CrearVenta, {action as actionCrearVenta}  from "./views/CrearVenta";
import VerDetallesVenta, {loader as loaderDetallesVenta} from "./views/VerDetallesVenta";
import VerProductos,{loader as loaderProductos} from "./views/VerProductos";
import VerProveedores, {loader as loaderProveedores} from "./views/VerProveedores";
import AñadirProveedor, {action as actionAñadirProveedor} from "./views/AñadirProveedor";
import VerCompras, {loader as loaderCompras} from "./views/VerCompras";
import VerDetallesCompra, {loader as loaderDetallesCompra} from "./views/VerDetallesCompra";
import AñadirProducto, {action as actionAñadirProducto} from "./views/AñadirProducto";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <InicioSesion />,
    },
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
                },
                {
                    path: 'productos/crear',
                    element: <AñadirProducto />,
                    action: actionAñadirProducto
                },
                {
                    path: 'proveedores/ver',
                    element: <VerProveedores />,
                    loader: loaderProveedores
                },
                {
                    path: 'proveedores/añadir',
                    element: <AñadirProveedor />,
                    action: actionAñadirProveedor
                },
                {
                    path: 'compras/ver',
                    element: <VerCompras />,
                    loader: loaderCompras
                },
                {
                    path: 'compras/:id/editar',
                    element: <VerDetallesCompra />,
                    loader: loaderDetallesCompra
                },                                              
                ]
            }
        ]
    }
])
