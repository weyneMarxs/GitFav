# GitFav


![alt text](https://i.imgur.com/73Cpuq8.png)

![alt text](https://i.imgur.com/q0BS30I.png)

## Observações

  - O layout não ficou exatamente igual ao sugerido !
  - no processo acabei descobrindo um bug, ao inserir o mesmo nome de usuário porém com letras maisculas ou somente algumas das letras maiuscula ele dublicava o usuário, pra corrigir adcionei um toLowerCase() no valor passado na paramentro pra função 'add()'

    `this.add(value.toLowerCase())` 

  - outra alteração, após adicionar um usuario o campo input e limpo e já volta selecinado com uma autofoco !