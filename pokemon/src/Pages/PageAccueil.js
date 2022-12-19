import Header from "../Header";
import image from "../img/pk.jpg"; 

export default function PageAccueil() {
  return (
    <div class="Accueil" style={{ backgroundImage:`url(${image})`, backgroundRepeat: 'repeat', }}>
      <br/> <br/> 
    <div>
      <Header></Header>
    </div>
    </div >
    
    
    
  );
}

