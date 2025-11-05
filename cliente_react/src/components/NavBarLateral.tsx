import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBarLateral() {
    const [collapsed, setCollapsed] = useState(false);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('emailLocal');
    // };

    const toggleMenu = () => setCollapsed(!collapsed);

    return (
        <aside
            id="layout-menu"
            className={`layout-menu menu-vertical menu bg-menu-theme${collapsed ? " collapsed" : ""}`}
            style={{ width: collapsed ? "60px" : "260px", transition: "width 0.3s" }}
        >
            <div className="app-brand demo">
                <NavLink to="/" className="app-brand-link">
                    <span className="app-brand-text demo menu-text fw-bold">
                        {collapsed ? "" : "Joyeria Orión"}
                    </span>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-label="Toggle sidebar"
                >
                    <span className={`icon-base bx ${collapsed ? "bx-menu" : "bx-chevron-left"} me-1`}></span>
                </button>
            </div>

            {!collapsed && (
                <ul className="menu-inner py-1">
                    {/* Productos */}
                    <li className="menu-item">
                        <div className="menu-link">
                            <div className="text-truncate">Productos</div>
                        </div>
                        <div className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Productos en stock</div>
                        </div>
                        <div className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Añadir productos</div>
                        </div>
                    </li>
                    {/* Proveedor */}
                    <li className="menu-item">
                        <div className="menu-link">
                            <div className="text-truncate">Proveedores</div>
                        </div>
                        <div className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Ver proveedores</div>
                        </div>
                        <div className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Añadir proveedores</div>
                        </div>
                    </li>
                    {/* Compras */}
                    <li className="menu-item">
                        <div className="menu-link">
                            <div className="text-truncate">Compras</div>
                        </div>
                        <div className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Ver compras</div>
                        </div>
                        <div className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Añadir compras</div>
                        </div>
                    </li>
                    {/* Ventas */}
                    <li className="menu-item">
                        <div className="menu-link">
                            <div className="text-truncate">Ventas</div>
                        </div>
                        <NavLink to="/ventas/ver" className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Ver ventas</div>
                        </NavLink>
                        <NavLink to="ventas/añadir" className="menu-link" style={{ marginLeft: 32 }}>
                            <div className="text-truncate">Añadir ventas</div>
                        </NavLink>
                    </li>
                    {/* Cerrar sesión */}
                    <li className="menu-item">
                        {/* <NavLink to="/login" className="menu-link" onClick={handleLogout}>
                            <div className="text-truncate text-danger">Cerrar sesión</div>
                        </NavLink> */}
                    </li>
                </ul>
            )}
        </aside>
    );
}

