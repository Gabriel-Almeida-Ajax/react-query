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
  const { data, isLoading, isError } = useQuery([QUERY_POSTS], getPosts);
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

## E se eu quisesse passar um paramêtro?

```js
// services/post.service.js
import axios from "axios";

// note que aqui passo outro nome para essa query.
const QUERY_POST = "QUERY_POST";

// função que realiza a operação, identica a anterior, onde notamos que há um contrato aqui.
// é uma função, e não importa qual a forma que realizo a requisição, somente importa os paramêtros passados.
// poderia também realizar utilizando o fetch. 
const getPosts = async (postId) => {
  return (await axios.get(
    "https://my-json-server.typicode.com/typicode/demo/posts/" + postId
  )).data;
};
```

```js
// components/Post.jsx
import { QUERY_POST, getPost } from 'services/post.service'

function Posts ({ postId }){
  // Onde passamos o nome da query, podemos também passar mais um paramêtro de dependencia, 
  // onde fará a request toda vez que seja alterado. e realizando as mesmas tratativas,
  // sem depender de um useEffect e useStates para controlar as mudanças
  const { data: post, isLoading, isError } = useQuery([QUERY_POSTS, postId], async () => await getPost(postId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <div key={post.id}>
        <h2>{post.title}</h2>
      </div>
    </>
  );
}
```


Ele oferece várias vantagens que tornam o desenvolvimento de aplicativos mais eficiente e fácil. Aqui estão algumas das principais vantagens de usar o React Query:

1. Gerenciamento de estado simplificado: O React Query fornece um mecanismo simples e intuitivo para gerenciar o estado dos dados em seu aplicativo. Ele abstrai a complexidade do gerenciamento de estado, permitindo que você se concentre na lógica de negócios em vez de se preocupar com a busca, atualização e cache dos dados.

2. Caching automático: O React Query possui um sistema de cache integrado que armazena em cache automaticamente os resultados das consultas feitas ao servidor. Isso permite que você exiba os dados em cache imediatamente, sem precisar fazer uma nova solicitação ao servidor, caso os dados não tenham sido alterados. O cache também é inteligente o suficiente para atualizar automaticamente os dados quando necessário.

3. Reatividade e atualizações em tempo real: O React Query é reativo por natureza, o que significa que ele atualiza automaticamente a interface do usuário sempre que os dados subjacentes são alterados. Isso permite que você crie aplicativos em tempo real sem ter que se preocupar com a lógica de atualização manual da interface do usuário.

4. Gestão de requisições e falhas: O React Query gerencia automaticamente as requisições feitas ao servidor, fornecendo recursos avançados para lidar com falhas de rede, retentativas de solicitações e gestão de erros. Ele também oferece recursos para exibir indicadores de carregamento, atualizar os dados em intervalos regulares e lidar com a sincronização de dados em segundo plano.

5. Integração com outras bibliotecas: O React Query é altamente flexível e pode ser facilmente integrado com outras bibliotecas populares, como o React Router, Redux e Axios. Ele possui uma API extensível e permite que você personalize facilmente seu comportamento para atender às necessidades específicas do seu aplicativo.

6. Melhor experiência do desenvolvedor: O React Query é projetado para facilitar o desenvolvimento de aplicativos, reduzindo a quantidade de código boilerplate necessário e fornecendo uma sintaxe clara e concisa. Ele também possui uma documentação abrangente e uma comunidade ativa, o que facilita a aprendizagem e o suporte em caso de problemas.

Essas são apenas algumas das vantagens de usar o React Query. No entanto, é importante ressaltar que a escolha de uma biblioteca depende das necessidades do seu projeto e da sua familiaridade com ela. Recomenda-se explorar a documentação e exemplos do React Query para entender melhor como ele pode ajudar no seu caso específico.

