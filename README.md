![image](https://github.com/Gabriel-Almeida-Ajax/react-query/assets/58678638/25dd9a0e-7a0e-4f06-b905-cdc6042de3de)

## Combo perfeito 😍
- Vite
- React
- Axios
- React-Query

## Inicializando o projeto:

- `$ yarn create vite http-request --template react`
- `$ cd http-request`
- `$ yarn add axios react-query`
- `$ yarn dev`

## Implementação do motor do React Query

```js
// main.jsx
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

Com isso podemos utilizar os hooks do React Query no restante do projeto, como o useQuery.

## Criando o serviço da chamada http

```js
// services/post.service.js
import axios from "axios";

// nome da query
const QUERY_POSTS = "QUERY_POSTS";

// função que realiza a operação, nesse caso eu aguardo a resolução da promise e devolvo o data,
// que é onde o axios guarda a resposta.
const getPosts = async () => {
  return (await axios.get(
    "https://my-json-server.typicode.com/typicode/demo/posts"
  )).data;
};
```

Agora podemos inicializar nosso componente para renderizar nossos posts.

## Componente dos Posts

```js
// components/Posts.jsx
import { QUERY_POSTS, getPosts } from 'services/post.service'

function Posts (){
  // aqui utilizando o hook useQuery, tenho um motor que gerenciará o estado, ou seja,
  // atualizará a tela quando resolver a requisição, e junto todas as mudanças, como error e loading. 
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
```

