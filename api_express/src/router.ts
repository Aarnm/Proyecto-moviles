import { Router } from "express";
import { borrarVenta, crearVenta, editarVenta, getVentas } from "./handlers/ventas";
import { borrarDetalleVenta, crearDetalleVenta, getDetalleVenta, getDetalleVentaById } from "./handlers/detalleventas";
import { borrarProducto, getProducto, getProductoById,crearProducto,editarProducto} from "./handlers/productos";
import { getProveedor,crearProveedor,borrarProveedor,editarProveedor} from "./handlers/proveedor";
import { getCompra,crearCompra,borrarCompra } from "./handlers/compras";
import { getDetalleCompra,crearDetalleCompra,editarDetalleCompra,getDetalleCompraById,borrarDetalleCompra} from "./handlers/detallecompra";
import { crearUsuario, login } from "./handlers/usuarios";
const router = Router()
//VENTAS

router.get('/ventas',getVentas)
router.post('/crear-venta',crearVenta)
router.put('/editar-venta/:id',editarVenta)
router.delete('/borrar-venta/:id',borrarVenta)

//DETALLE VENTAS
router.get('/detalleVentas',getDetalleVenta)
router.get('/detalleVenta/:id', getDetalleVentaById)
router.post('/crear-detalleVenta',crearDetalleVenta)
router.delete('/borrar-detalleVenta/:id',borrarDetalleVenta)

//PRODUCTO


router.get('/productos',getProducto)
router.get('/productos/:id',getProductoById)
router.post('/crear-producto',crearProducto)
router.delete('/borrar-producto/:id',borrarProducto)
router.put('/editar-producto/:id',editarProducto)

//PROVEEDOR


router.get('/proveedor',getProveedor)
router.post('/crear-proveedor',crearProveedor)
router.delete('/borrar-provedor/:id',borrarProveedor)
router.put('/editar-proveedor/:id',editarProveedor)


//COMPRA
router.get('/compras',getCompra)
router.post('/crear-compra',crearCompra)
router.delete('/borrar-compra/:id',borrarCompra)


//DETALLE COMPRA

router.get('/detalleCompras',getDetalleCompra)
router.get('/detalleCompras/:id', getDetalleCompraById)
router.post('/crear-detalleCompra',crearDetalleCompra)
router.put('/editar-detalleCompra/:id',editarDetalleCompra)
router.delete('/borrar-detalleCompra/:id',borrarDetalleCompra)


//LOGIN 
router.post('/login' ,login)
router.post('/crear-usuarios',crearUsuario)

export default router