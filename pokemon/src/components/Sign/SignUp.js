import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log(username, password);

    if (username === "" || password === "") {
      alert("Need Username/Password");
      setUsername("");
      setPassword("");
      return;
    } else {
      fetch("http://localhost:5000/user/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 400) {
            alert("Username already taken");
            setUsername("");
            setPassword("");
          }
          if (res.status === 200) {
            alert("Registered with Success, You need to logging now !");
            setUsername("");
            setPassword("");
          }
        })
        .catch((err) => console.log(err));
    }
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

export default Signup;
