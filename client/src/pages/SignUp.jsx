import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message), setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      navigate("/signin");
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSumit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="focus:outline-none border-none bg-white p-3 rounded-lg placeholder-gray-400"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="focus:outline-none border-none bg-white p-3 rounded-lg placeholder-gray-400"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="focus:outline-none border-none bg-white p-3 rounded-lg placeholder-gray-400"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignUp;
