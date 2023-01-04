import { Link } from "react-router-dom";
export default function Header() {
  return (
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
  );
}
