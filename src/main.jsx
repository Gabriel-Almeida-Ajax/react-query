import ReactDOM from "react-dom/client";
import axios from "axios";
import { Attribution } from "./components/Attribution";
import "./index.css";
import { useEffect, useState } from "react";

// services/post.service.js
const getPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    await axios.get("https://my-json-server.typicode.com/typicode/demo/posts")
  ).data;
};

// components/Posts.jsx
function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => { 
    getPosts()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </>
  );
}

// App.jsx
function App() {
  return (
    <>
      <Attribution />
      <Posts />
    </>
  );
}

// main.jsx
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
