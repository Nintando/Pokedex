import "../../styles/pokeTypes.css";

export default function Pokedex({ data }) {
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
        </div>
      </div>
    </div>
  );
}
