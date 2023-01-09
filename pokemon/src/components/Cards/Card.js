import "../../styles/pokeType.css";

export default function Card({ pokemon }) {
  return (
    <div className="Card" key={pokemon._id}>
      <div className="Card_Container">
        <div># {pokemon.id}</div>
        <div className="Card_name">{pokemon.name}</div>
        <div className="Card_img">
          <img src={pokemon.sprites.front_default} alt="" /> <br />
        </div>
        {pokemon.types.map((type, i) => {
          return (
            <div className={`type ${type.type.name} `} key={i}>
              {type.type.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
