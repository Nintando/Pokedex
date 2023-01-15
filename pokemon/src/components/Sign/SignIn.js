import { useState } from "react";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log(username, password);
// Envoie les données de username et de password au serveur
    fetch("http://localhost:5000/user/login", {
      method: "POST",
       // Envoie les données en format json
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === undefined) {
          alert(data.error);
          setUsername("");
          setPassword("");
        }
        if (data.msg !== undefined) {
          alert(data.msg);
          setUsername("");
          setPassword("");
          window.location.reload();
          localStorage.setItem("Token", data.token);
        }
      })
      .catch((err) => console.log(err));
  };

  return (

    <div>
      Username
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        type="text"
      />
      <br />
      <br />
      Password
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
      />
      <br />
      <br />
      <button onClick={handleSubmit}> SUBMIT </button>
    </div>
  );
}

export default Signin;
