

let modal = document.querySelector(".card-grid")
let info = document.querySelector('.md')
console.log(modal.href)
htmlStr = ''
modal.addEventListener('click', function(){
  let name = document.getElementsByName(name)
  console.log(name)
  htmlStr += `    <div class="modal-container" id="${modal.name}">
  <div class="modal">
    <h1 class="modal__title">Modal 1 Title</h1>
    <p class="modal__text"> Lime</p>
    <button class="modal__btn">Button &rarr;</button>
    <a href="#m1-" class="link-2"></a>
  </div>
</div>
</div>
  </div>`
  info.innerHTML += htmlStr
  console.log(info)
  
})


htmlStr = ''
