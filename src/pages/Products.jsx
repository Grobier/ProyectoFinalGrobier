import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Nuestros Servicios</h1>
      <div className="row">
        {/* Card para Rehabilitación */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Rehabilitación</h5>
              <p className="card-text">
                Proceso personalizado enfocado en la recuperación de lesiones y disfunciones musculoesqueléticas.
              </p>
              <Link to="/services/rehabilitation" className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </div>

        {/* Card para Rendimiento Deportivo */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Rendimiento Deportivo</h5>
              <p className="card-text">
                Optimiza tu desempeño físico y técnico mediante análisis biomecánico y estrategias avanzadas.
              </p>
              <Link to="/services/performance" className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </div>

        {/* Card para Entrenamiento */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Entrenamiento</h5>
              <p className="card-text">
                Opciones de entrenamiento personalizado en formato 1:1, 1:2 o 1:3, adaptadas a tus objetivos.
              </p>
              <Link to="/services/training" className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Services;
