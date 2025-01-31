import { useState } from "react";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Welcome to App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer px-3 py-1.5 rounded-xl bg-[#17613b] border-[#298255] border-1 hocus:brightness-125 duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
