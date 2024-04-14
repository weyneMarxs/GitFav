# GitFav


![alt text](https://i.imgur.com/73Cpuq8.png)

![alt text](https://i.imgur.com/q0BS30I.png)

## Observações

  - O layout não ficou exatamente igual ao sugerido!
  - Descobri um bug ao inserir o mesmo nome de usuário, porém com letras maiúsculas ou somente algumas das letras maiúsculas, ele duplicava o usuário. Para corrigir, adicionei um toLowerCase() no valor passado no parâmetro para a função 'add()'

    `this.add(value.toLowerCase())` 

  - Outra alteração, após adicionar um usuário, o campo input é limpo e já volta selecionado com um autofoco!