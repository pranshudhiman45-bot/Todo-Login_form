import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ login }) => {
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
if(Username ==="a" && password ==="a"){
 login();
    navigate("/todo"); 
  }else{
    alert("Please enter vaild details")
    navigate("/login")
  }
}
  return (
    <div className="main">
      <h3>Login Form:</h3>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="wrap">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;