const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const statusMessage = document.getElementById("statusMessage");
const profileCard = document.getElementById("profileCard");

const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const usernameEl = document.getElementById("username");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const locationEl = document.getElementById("location");
const profileLink = document.getElementById("profileLink");
const repoList = document.getElementById("repoList");



searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startSearch();
});

searchBtn.addEventListener("click", startSearch);

function startSearch() {
  const username = searchInput.value.trim();
  if (username) fetchUser(username);
}

async function fetchUser(username) {
  profileCard.classList.add("hidden");
  statusMessage.textContent = "Loading...";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error();

    const data = await res.json();

    avatar.src = data.avatar_url;
    nameEl.textContent = data.name || "No name";
    usernameEl.textContent = `@${data.login}`;
    bio.textContent = data.bio || "No bio available";

    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;

    locationEl.textContent = data.location || "Location not available";
    profileLink.href = data.html_url;
    fetchRepos(data.repos_url);

    statusMessage.textContent = "";
    profileCard.classList.remove("hidden");

  } catch {
    statusMessage.textContent = "User not found 👀";
  }
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
async function fetchRepos(reposUrl) {
  repoList.innerHTML = "";

  const res = await fetch(reposUrl);
  const repos = await res.json();

  const latestRepos = repos
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  latestRepos.forEach((repo) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="${repo.html_url}" target="_blank">
        ${repo.name}
      </a>
      <span class="repo-date">
        ${formatDate(repo.created_at)}
      </span>
    `;

    repoList.appendChild(li);
  });
}


