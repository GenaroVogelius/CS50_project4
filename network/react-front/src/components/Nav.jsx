
import { Link } from "react-router-dom";



function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Network
      </a>
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <strong>genaro</strong>
            </a>
          </li>
          <li className="nav-item">
            <Link to={`/`} className="nav-link">
              All Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/following`} className="nav-link">
              Following
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="{% url 'logout' %}">
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;