export default async function getPokedex() {
  const token = localStorage.getItem("Token");

  return (fetch("http://localhost:5000/pokedex", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))
  )
}
