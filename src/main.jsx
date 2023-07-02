import ReactDOM from "react-dom/client";
import axios from "axios";
import { Attribution } from "./components/Attribution";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./index.css";

// services/post.service.js
const QUERY_POSTS = "QUERY_POSTS";
const getPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (await axios.get(
    "https://my-json-server.typicode.com/typicode/demo/posts"
  )).data;
};

// components/Posts.jsx
function Posts (){
  const { data, isLoading, isError } = useQuery(QUERY_POSTS, getPosts);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      {
        data.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))
      }
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
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
