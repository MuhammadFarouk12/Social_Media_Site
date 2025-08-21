const baseURL = `https://tarmeezacademy.com/api/v1`
// axios.get('https://tarmeezacademy.com/api/v1/posts?limit=50')
setUpNavbar()
axios.get('https://tarmeezacademy.com/api/v1/tags/1/posts')
.then(response=>{
    let posts = response.data.data
    let postId = 0
    let tags = ''
    for (const post of posts) {
      let content =
        `
          <div class="col-4">
            <div class="card shadow mb-3">
              <div class="card-header">
              <img src="${'https://placehold.co/40'}" class='img-thumbnail rounded-circle' alt="hello" style'width: 100px''>
              <h6 class='d-inline'>${post.author.username}</h4>
              </div>
              <div class="card-body">
               <img src="${post.image}" style="width: 100%" alt=""> 
              <h6 class='text-primary mt-3'>${post.created_at}<h6>
              <h5>${post.title || "Hello"}</h5>
              <p>${post.body}</p>
              <hr>
              <div class='tagsContainer'></div>
              <hr>
              <div>
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                    </svg>
                  </i>
                <span>${post.comments_count} Comments</span>
              </div>
            </div>
          </div>
          <!-- End The Post   -->
          </div>
                  `
        document.getElementById("posts").innerHTML += content
        for (const tag of post.tags) {
            document.querySelectorAll('.tagsContainer')[postId].innerHTML += `<span class='bg-secondary p-2 m-1 text-white rounded-1'>${tag.name}</span>`
        }
      postId++
    }
  })



function loginButtonClick() {
  const username = document.getElementById("username-input").value
  const password = document.getElementById("password-input").value
  const params = {
    "username": username,
    "password": password
  }
  axios.post(baseURL+"/login", params)
  .then(resp=>{
      // console.log(resp.data.token)
      window.localStorage.setItem("token", resp.data.token)
      window.localStorage.setItem("user", JSON.stringify(resp.data.user))
      document.querySelector(".btn-close").click()
      alert(`You logged in as ${resp.data.user.username}`)
      setUpNavbar()
    })
}
function setUpNavbar(){
  let token = localStorage.getItem("token")
  if(token){
    loginButton.style.display = 'none'
    registerButton.style.display = 'none'
    logoutButton.classList.toggle('d-none')
  } else {
    logoutButton.classList.toggle('d-none')
    loginButton.style.display = 'block'
    registerButton.style.display = 'block'
  }
}
function logoutButtonClick() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  alert('Logout Successfully')
  setUpNavbar()
}

function registerButtonClick(){
  axios.post('https://tarmeezacademy.com/api/v1/register', {
    "username": `${username.value}`,
    "password": `${password_input.value}`,
    "name": `${name_input.value}`
  }).then(resp=>{
      window.localStorage.setItem("token", resp.data.token)
      window.localStorage.setItem("user", JSON.stringify(resp.data.user))
      alert(`You Registered As ${resp.data.user.username}`)
  })
}
























