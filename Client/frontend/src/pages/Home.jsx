import { Link } from "react-router-dom";
import "../styles/Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>User CRUD</h1>
        <p>Gestion de usuarios</p>
      </header>

      <main className="main-content">
        <div className="cta-buttons">
          <Link to="/login" className="button button-primary">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="button button-secondary">
            Registrarse
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;