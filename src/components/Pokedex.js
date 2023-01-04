export default async function getPokedex() {
  fetch("http://localhost:5000/pokedex", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetch("http://localhost:5000/pokedex");
  const data = await response.json();
  return data;
}
