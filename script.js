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

    statusMessage.textContent = "";
    profileCard.classList.remove("hidden");

  } catch {
    statusMessage.textContent = "User not found 👀";
  }
}

