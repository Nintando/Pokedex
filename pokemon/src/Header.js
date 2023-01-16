import { Link } from "react-router-dom";
export default function Header() {
  const token = localStorage.getItem("Token");

  const readyFalse = async () => {
    await fetch(`http://localhost:5000/pokeFight/readyFalse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isReady: false,
      }),
    }).catch((err) => console.log(err));
  };

  const handleClick = () => {
    localStorage.clear();
    readyFalse();
    window.location.reload();
  };

  return (
    <div className="link">
      <div className="link-1">
        <Link className="nav-link" to="/">
          Accueil
        </Link>
      </div>
      <div className="link-2">
        <Link className="nav-link" to="/allPokemon">
          Pokemon
        </Link>
      </div>
      <div className="link-2">
        <Link className="nav-link" to="/myPokedex">
          Pokedex
        </Link>
      </div>
      <div className="link-3">
        <Link className="nav-link" to="/pokeFight">
          PokeFight
        </Link>
      </div>
      {token ? (
        <button className="Logout" onClick={handleClick}>
          Logout
        </button>
      ) : null}
    </div>
  );
}
