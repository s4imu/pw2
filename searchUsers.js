async function searchUsers(username) {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();
    if (!data.items) {
      return Promise.reject("Erro: items não encontrado na resposta da API");
    }
    const user = data.items.find(user => user.login === username);
    return user ? true : false;
  }
  
  searchUsers("<username>")
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });