import "../../styles/pokeTypes.css";

export default function Pokedex({ data }) {
  const delOnePokemon = (i) => {
    fetch(`http://localhost:5000/myPokedex/${i}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(alert("Vous avez libérer un pokémon"))
      .then(window.location.reload(true));
  };

  console.log(`http://localhost:5000/myPokedex/${data._id}`);

  return (
    <div className="Card_Container">
      <div>
        <div className="Card" key={data._id}>
          <div className="Card_img">
            <img src={data.pokeImg} alt="" /> <br />
          </div>
          <div className="Card_name">{data.pokeName}</div>
          {data.pokeTypes.map((type, i) => {
            return (
              <span className={`type ${type.type.name}`} key={i}>
                {type.type.name}
              </span>
            );
          })}
          <button className="btn-free" onClick={() => delOnePokemon(data._id)}>
            Libérer
          </button>
        </div>
      </div>
    </div>
  );
}
