import { GoogleOutlined } from "@ant-design/icons";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat-Verse!</h2>
        <div className="google login-button" onClick={handleGoogleSignIn}>
          <GoogleOutlined /> Sign In with Google
        </div>
      </div>
    </div>
  );
};
export default Login;
