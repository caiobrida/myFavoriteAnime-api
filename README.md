# myFavoriteAnimes (API)

Esta é uma API que consome uma api pública chamada "jikanapi" encontrada nas [APIs públicas](https://github.com/public-apis/public-apis?tab=readme-ov-file) onde se trata de uma API pública relacionada a animes.
A API criada tem como finalidade a possibilidade de um usuário se autenticar (criando uma conta e se logando), listar (com paginação) e filtrar os animes que a API pública e a base de dados dessa API retorna podendo pesquisar e também favoritar ou desfavoritar os animes que quiserem.
Esta api utiliza o MongoDB como principal banco de dados para que se possa registrar usuários, criar animes favoritos para cada usuário e listar esses animes favoritos, este MongoDB é um cluster criado no MongoDB Atlas.
MyFavoriteAnimes possue também uma aplicação frontend ([myFavoriteAnimes-front](https://github.com/caiobrida/myFavoriteAnime-front)), onde esse frontend consome e utiliza as rotas desta API

# Como executar localmente
- Clone o repositório para seu ambiente local.
- Configure um arquivo ".env" com as variáveis ambiente que estão no arquivo ".env.example".
- A API, por padrão, roda na porta "3333", caso precise alterar a porta, basta ir no arquivo ".env" e alterar a variável ambiente chamada "PORT" para a porta que desejar.
- No projeto da API, execute npm install
- Execute npm run test, certifique-se de que todos os testes passaram
- Execute npm run dev para iniciar a API localmente
