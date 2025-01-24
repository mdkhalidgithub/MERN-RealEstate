import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      // Extract user details
      const { displayName, email, photoURL } = result.user;

      // Send the user details to your backend
      const response = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
          email,
          photo: photoURL,
        }),
      });

      // Handle the backend response
      if (!response.ok) {
        const errorData = await response.json();
        dispatch(signInFailure(errorData.message));
        throw new Error(errorData.message || "Google sign-in failed!");
      }

      const data = await response.json();
      dispatch(signInSuccess(data)); // Store user data in Redux

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      dispatch(signInFailure(error.message || "Google sign-in failed!"));
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
