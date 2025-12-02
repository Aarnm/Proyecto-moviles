
import { Link } from 'react-router-dom';

export default function InicioSesion() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
            
          <div className="card">
            <h5 className="card-header">Iniciar sesión</h5>
            <div className="card-body">
           
              <form>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    name="usuario"
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    autoComplete="username"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    autoComplete="current-password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Ingresar
                    </button>
                  </div>
                  <div>
                    <Link to="/" className="btn btn-link">
                      Volver
                    </Link>
                  </div>
                </div>

                <div className="text-center">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
