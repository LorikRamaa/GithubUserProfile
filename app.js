const apiUrl = "https://api.github.com/users/";
let userContainer = document.getElementById("userContainer");
let form = document.querySelector("form");
let search = document.getElementById("search");

async function getUser(user) {
  const response = await fetch(apiUrl + user);
  let data = await response.json();
  card(data);
  getRepos(user);
}
async function getRepos(user) {
  const response = await fetch(apiUrl + user + "/repos");
  let data = await response.json();
  let repoUl = document.getElementById("repos");
  data.forEach((repo) => {
    let li = document.createElement("a");
    li.innerHTML = repo.name;
    li.href = repo.html_url;
    li.target = "_blank";
    li.classList.add("repo");
    repoUl.appendChild(li);
  });
}

function card(user) {
  let cardHtml = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}"> 
            </div>
            <div class="rightSide">
              <div class="cardText">
                  <h2>${user.name}</h2>
                  <p>${user.bio}</p>
                  <ul>    
                      <li><strong>Followers: </strong>${user.followers}</li>
                      <li><strong>Following:</strong> ${user.following}</li>
                      <li><strong>Repos: </strong>${user.public_repos}</li>
                  </ul>
              </div>
              <div class="reposDiv"> 
                  <h3>Repos:</h3>
                  <div class="repos" id="repos">
                    
                  </div>
              </div>
            </div>
        </div>
    `;
  userContainer.innerHTML = cardHtml;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
