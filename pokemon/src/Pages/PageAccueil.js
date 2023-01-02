import image from "../img/pk.jpg";
import { Link } from "react-router-dom";

export default function PageAccueil() {
  return (
    <div
      class="Accueil"
      style={{ backgroundImage: `url(${image})`, backgroundRepeat: "repeat" }}
    >
      <br /> <br />
      <div>
        <Link className="nav-link " to="/">
          Accueil
        </Link>
        <Link className="nav-link " to="/allPokemon">
          Pokemon
        </Link>
        <Link className="nav-link " to="/myPokedex">
          Pokedex
        </Link>
      </div>
    </div>
  );
}
