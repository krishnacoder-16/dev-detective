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
const battleToggle = document.getElementById("battleToggle");

const normalSearch = document.getElementById("normalSearch");
const battleSearch = document.getElementById("battleSearch");
const battleArea = document.getElementById("battleArea");
const battleBtn = document.getElementById("battleBtn");

const userAInput = document.getElementById("userA");
const userBInput = document.getElementById("userB");

const cardA = document.getElementById("cardA");
const cardB = document.getElementById("cardB");

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
let currentMode = "normal";

battleToggle.addEventListener("change", () => {
  if (battleToggle.checked) {
    switchToBattleMode();
  } else {
    switchToNormalMode();
  }
});

function switchToBattleMode() {
  currentMode = "battle";

  normalSearch.classList.add("hidden");
  profileCard.classList.add("hidden");

  battleSearch.classList.remove("hidden");
  battleArea.classList.remove("hidden");

  statusMessage.textContent = "";
}

function switchToNormalMode() {
  currentMode = "normal";

  battleSearch.classList.add("hidden");
  battleArea.classList.add("hidden");

  normalSearch.classList.remove("hidden");
  profileCard.classList.add("hidden");

  statusMessage.textContent = "";
}

async function startBattle() {
      const userA = userAInput.value.trim();
      const userB = userBInput.value.trim();
  if (!userA || !userB) {
    statusMessage.textContent = "Please enter both usernames.";
    return;
  }
  statusMessage.textContent = "Battling...";
    console.log("Battle started");
      try {
    const [dataA, dataB] = await Promise.all([
      fetchUserForBattle(userA),
      fetchUserForBattle(userB),
    ]);
    updateBattleCard(cardA, dataA);
    updateBattleCard(cardB, dataB);
    clearBattleResult();

    if (dataA.followers > dataB.followers) {
      markWinner(cardA);
      markLoser(cardB);
    } else if (dataB.followers > dataA.followers) {
      markWinner(cardB);
      markLoser(cardA);
    } else {
      markDraw(cardA);
      markDraw(cardB);
    }

    statusMessage.textContent = "";

  } catch (error) {
    statusMessage.textContent = "One or both users not found.";
    clearBattleResult();
  }
}

function updateBattleCard(card, data) {
  const img = card.querySelector("img");
  const nameEl = card.querySelector("h3");
  const followersEl = card.querySelector(".followers");

  img.src = data.avatar;
  img.alt = data.username;

  nameEl.textContent = data.name;
  followersEl.textContent = `Followers: ${data.followers}`;
}

battleBtn.addEventListener("click", () => {
  if (currentMode === "battle") {
    startBattle();
  }
});
[userAInput, userBInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && currentMode === "battle") {
      startBattle();
    }
  });
});

async function fetchUserForBattle(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("User not found");

  const data = await res.json();

  return {
    name: data.name || data.login,
    username: data.login,
    avatar: data.avatar_url,
    followers: data.followers,
  };
}
function clearBattleResult() {
  [cardA, cardB].forEach((card) => {
    card.classList.remove("winner", "loser", "draw");
  });
}

function markWinner(card) {
  card.classList.add("winner");
}

function markLoser(card) {
  card.classList.add("loser");
}

function markDraw(card) {
  card.classList.add("draw");
}


