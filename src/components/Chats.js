import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Chats = () => {
  // Get the navigate function from react-router-dom for navigation
  const navigate = useNavigate();
  // Get the user object from the AuthContext
  const { user } = useAuth();
  // State variable to track loading status
  const [loading, setLoading] = useState(true);

  // Function to handle user logout
  const handleLogout = async () => {
    // Call the signOut method from the Firebase auth module
    await auth.signOut();
    // Navigate to the root path ("/")
    navigate("/");
  };

  // Function to fetch a file from a given URL
  const getFile = async (url) => {
    // Fetch the file using the provided URL
    const response = await fetch(url);
    // Get the file data as a Blob
    const data = await response.blob();
    // Create a File object from the Blob
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    // Check if user is not logged in
    if (!user) {
      // Navigate to the root path ("/")
      navigate("/");
      return;
    }

    // Check if the user exists in ChatEngine
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          // Set the project ID header
          "project-ID": "2f0a68d1-aa62-4159-a52b-ebc2d5e5cdff",
          // Set the user's email as the user name header
          "user-Name": user.email,
          // Set the user's UID as the user secret header
          "user-Secret": user.uid,
        },
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
      });

    // Create user in ChatEngine
    let formdata = new FormData();
    // Append the user's email to the form data
    formdata.append("email", user.email);
    // Append the user's email as the username to the form data
    formdata.append("username", user.email);
    // Append the user's UID as the secret to the form data
    formdata.append("secret", user.uid);

    // Get the user's photoURL and convert it to a file
    getFile(user.photoURL).then((avatar) => {
      // Append the avatar file to the form data
      formdata.append("avatar", avatar, avatar.name);

      // Create the user in ChatEngine using the form data
      axios
        .post("https://api.chatengine.io/users/", formdata, {
          headers: {
            // Set the private key header using the environment variable
            "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
          },
        })
        .then(() => setLoading(false))
        .catch((error) => console.log(error));
    });
  }, [user, navigate]);

  // Render loading text if user is not logged in or loading state is true
  if (!user || loading) return "Loading...";

  // Render the chat component
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat Verse</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="2f0a68d1-aa62-4159-a52b-ebc2d5e5cdff"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
