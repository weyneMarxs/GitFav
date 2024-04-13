import { GithubUsers } from "./GitUsers.js"

export class Favorites {
  constructor(root) {
    this.root= document.querySelector(root)
    this.load()
  }
  load() {
    this.users = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    this.ifTableEmpty()
  }
  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.users))
  }
  async add(username) {
    try {
      const userExists = this.users.find(entry => entry.login === username)
      if(userExists) {
        throw new Error('Usuário já cadastrado !')
      }
      const user = await GithubUsers.search(username)
      if(user.login === undefined){
        throw new Error('Usuário não encontrado !')
      }
      this.ifTableEmpty()
      this.users = [user, ...this.users]
      this.update()
      this.save()
    } catch(error){
      alert(error.message)
    }
  }
  delete(user) {
    const filteredUsers = this.users.filter(entry => entry.login !== user.login)
    this.users = filteredUsers
    this.update()
    this.ifTableEmpty()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }
  onadd() {
    const addBtn = this.root.querySelector('.btnAdd')
    addBtn.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  }
  update() {
    this.removeAlltr()
    this.users.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user span').textContent = `/${user.login}`
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      row.querySelector('.btn-remove').onclick = () => {
        const isConfirm = confirm('Tem certeza que deseja deletar esse usúario ?')

        if(isConfirm) {
          this.delete(user)
        } else {
          console.log('cancelando...')
        }
      }
      this.root.querySelector('.search input').value = ''
      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/weyneMarxs.png">
        <a href="https://github.com/weyneMarxs" target="_blank">
          <p>Weyne Marques</p>
          <span>/weyneMarxs</span>
        </a>
      </td>
      <td class="repositories">10</td>
      <td class="followers">1</td>
      <td>
        <button class="btn-remove">Remover</button>
      </td>
    `
    return tr
  }

  removeAlltr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {tr.remove()})
  }

  ifTableEmpty() {
    if(this.users.length < 1) {
      this.root.querySelector('#tableEmpty').classList.toggle('hidden')
    }
  }
}