export{}

let apiKey: string = '47b314686d712612bab3d040f5abedb3';
let requestToken: String;
let username: String;
let password: String;
let sessionId: String;    
let listId: number;


let loginButton = document.getElementById('login-button')!;
let searchButton = document.getElementById('search-button')!;
let searchContainer = document.getElementById('search-container')!;

interface ResultadoDaBusca {
  page: number,
  results: Array<Filme>,
  totalPages: number,
  totalResults: number
}

interface Filme {
  adult: boolean,
  genre_ids: Array<Number>,
  id: number,
  original_language: string,
  original_title: string,
}

interface Token {
  expires_at: String,
  request_token: String,
  success: boolean
}

interface Sessao {
  session_id: String,
  success: boolean
}

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})
searchButton.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = document.getElementById('search') as HTMLInputElement;
  let listaDeFilmes: ResultadoDaBusca = await procurarFilme(query.value) as ResultadoDaBusca;
  let ul = document.createElement('ul');
  ul.id = "lista"
   
  if(listaDeFilmes){
  for (const item of listaDeFilmes.results) {

    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }

  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
}
});

function preencherSenha() {
  let getPassword =  document.getElementById('senha') as HTMLInputElement;
  password = getPassword.value
  validateLoginButton();
}

function preencherLogin() {
  let getUsername =  document.getElementById('login') as HTMLInputElement;
  username = getUsername.value 
  validateLoginButton();
}

function preencherApi() {
  let getApiKey = document.getElementById('api-key') as HTMLInputElement;
  apiKey = getApiKey.value
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.removeAttribute();
  }
}

class HttpClient {
  static async get({url = ' ', method = ' ', body = null || JSON.parse('{ }')}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}


async function procurarFilme(query: string) {
  query = encodeURI(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  }) 
  return result 
}

async function adicionarFilme(filmeId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })

  let token = result as Token
  requestToken = token.request_token
}

async function logar() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })

  let resultLogin = result as Token
  if(resultLogin.success){
    return true
  }
  return false

}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  }) 
  let sessao = result as Sessao
  sessionId = sessao.session_id
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: number, listaId: number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}