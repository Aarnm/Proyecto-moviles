import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home, {loader as loaderHome} from './views/Home';
import VerVentas, {loader as loaderVentas} from "./views/VerVentas";
import CrearVenta, {action as actionCrearVenta}  from "./views/CrearVenta";
import VerDetallesVenta, {loader as loaderDetallesVenta} from "./views/VerDetallesVenta";
import VerProductos,{loader as loaderProductos} from "./views/VerProductos";
import VerProveedores, {loader as loaderProveedores} from "./views/VerProveedores";
import AñadirProveedor, {action as actionAñadirProveedor} from "./views/AñadirProveedor";
import VerCompras, {loader as loaderCompras} from "./views/VerCompras";
import VerDetallesCompra, {loader as loaderDetallesCompra} from "./views/VerDetallesCompra";
import AñadirProducto, {action as actionAñadirProducto} from "./views/AñadirProducto";
import EditarProducto, {action as actionEditarProducto, loader as loaderEditarProducto} from "./views/EditarProducto";
import EditarProveedor, {loader as loaderEditarProveedor, action as actionEditarProveedor}from "./views/EditarProveedor";
import CrearCompra, {action as actionCrearCompra, loader as loaderCrearCompra} from "./views/CrearCompra";
import { PrivateRoute } from "./components/PrivateRoute";
import Login, {action as actionLogin} from "./views/Login";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        action: actionLogin
    },
    {
        path: "/",
        element: <Layout/>,
        children:
        [
            {      
                element:<PrivateRoute />,  
                children: [
                {
                    index:true,
                    element:<Home />, 
                    loader: loaderHome                   
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
                    path: 'productos/:id/editar',
                    element: <EditarProducto />,
                    loader: loaderEditarProducto,
                    action: actionEditarProducto
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
                    path: 'proveedores/:id/editar',
                    element: <EditarProveedor />,
                    loader: loaderEditarProveedor,
                    action: actionEditarProveedor
                },
                {
                    path: 'compras/ver',
                    element: <VerCompras />,
                    loader: loaderCompras
                },
                {
                    path: 'compras/añadir',
                    element: <CrearCompra />,
                    action: actionCrearCompra,
                    loader: loaderCrearCompra
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
