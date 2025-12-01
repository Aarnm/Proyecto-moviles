import { Router } from "express";
import { borrarVenta, crearVenta, editarVenta, getVentas } from "./handlers/ventas";
import { borrarDetalleVenta, crearDetalleVenta, getDetalleVenta, getDetalleVentaById } from "./handlers/detalleventas";
import { borrarProducto, getProducto, getProductoById } from "./handlers/productos";
import { getProveedor,crearProveedor,borrarProveedor } from "./handlers/proveedor";
import { getCompra,crearCompra,borrarCompra } from "./handlers/compras";

const router = Router()
//VENTAS

router.get('/ventas',getVentas)
router.post('/ventas',crearVenta)
router.put('/ventas/:id',editarVenta)
router.delete('/ventas/:id',borrarVenta)

//DETALLE VENTAS
router.get('/detalleVentas',getDetalleVenta)
router.get('/detalleVenta/:id', getDetalleVentaById)
router.post('/detalleVenta',crearDetalleVenta)
router.delete('/detalleVenta/:id',borrarDetalleVenta)

//PRODUCTO


router.get('/productos',getProducto)
router.get('/productos/:id',getProductoById)
router.delete('/productos/:id',borrarProducto)

//PROVEEDOR


router.get('/proveedor',getProveedor)
router.post('/proveedor',crearProveedor)
router.delete('/proveedor/:id',borrarProveedor)



//COMPRA
router.get('/compra',getCompra)
router.post('/compra',crearCompra)
router.delete('/compra/:id',borrarCompra)

export default router