import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";


export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(signInFailure(errorData.message));
        throw new Error(errorData.message || "Sign-in failed!");
      }

      const data = await response.json(); // Expecting user data in response
      dispatch(signInSuccess(data));

      // Optional: Persist user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(data));

      // Navigate to the homepage or dashboard
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
       
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
