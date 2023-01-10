import "../../styles/pokeType.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

export default function Pokedex({ pokemon }) {
  return (
    <div className="PokedexCard">
      <Card
        className="border-dark"
        style={{ width: "10rem", backgroundColor: "transparent" }}
      >
        <div className="rm">#{pokemon.id}</div>
        <Card.Title className="rm">{pokemon.name}</Card.Title>
        <Card.Img src={pokemon.sprites.front_default} />
        <Card.Body>
          <Card.Text className="rm">
            {pokemon.types.map((type, i) => {
              return (
                <span key={i} className={`type ${type.type.name}`}>
                  {type.type.name}
                </span>
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
