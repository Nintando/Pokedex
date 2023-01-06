import Header from "../Header";
import image from "../img/pk.jpg";

export default function PageAccueil() {
  return (
    <div
      class="Accueil"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}
    >
      <div>
        <header>
          {" "}
          <h1 className="write">Poke API</h1>
          <br />
          <Header></Header>
        </header>
      </div>{" "}
      <div></div>
    </div>
  );
}
