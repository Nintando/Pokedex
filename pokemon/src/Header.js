import { Link } from "react-router-dom";
export default function Header() {
  const token = localStorage.getItem("Token");

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

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
      <Link className="nav-link " to="/pokeFight">
        PokeFight
      </Link>

      {token ? <button onClick={handleClick}>Logout</button> : null}
    </div>
  );
}
