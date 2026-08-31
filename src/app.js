const saitokurosaki = "862974778226638858";
const discord = document.querySelector(".discord");
const name = document.querySelector("#name");
const username = document.querySelector("#username");
const status = document.querySelector(".status");
const discordpicture = document.querySelector(".discordpicture");
const decoration = document.querySelector(".decoration");
const onlinestatus = document.querySelector(".onlinestatus");
const activitylogo = document.querySelector(".activitylogo");
const activitystatus = document.querySelector(".activitystatus");
const elapseTime = document.querySelector("#elapseTime");
const onlineSince = Date.now();
const menuBtn = document.querySelector("#menuBtn");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector("#closeBtn");
const darkoverlay = document.querySelector("#darkoverlay");
const navbar = document.querySelector(".navbar");
const mobileNav = document.querySelectorAll(".mobilenav");
const previusbtn = document.querySelector("#previusbtn");
const playandpausebtn = document.querySelector("#playandpausebtn");
const nextbtn = document.querySelector("#nextbtn");
const video = document.querySelector("#video");
const midbtn = document.querySelector("#midbtn");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const loadingScreen = document.getElementById("loadingScreen");
const loadingBar = document.getElementById("loadingBar");
const loadingPercent = document.getElementById("loadingPercent");
const loadingStatus = document.getElementById("loadingStatus");
const enterText = document.getElementById("enterText");
const progressbar = document.querySelector(".progressbar");
const videocurrentime = document.querySelector(".videocurrentime");
const videodurationtime = document.querySelector(".videodurationtime");
const skills = document.querySelectorAll(".skills");
const skillssection = document.querySelector(".skillssection");
const githubActivity = document.querySelector("#githubActivity");
const githubAPI = "https://api.github.com/users/saitokurosaki/events/public";
const githubRepos = document.querySelector("#githubRepos");
const githubStars = document.querySelector("#githubStars");
const githubFollowers = document.querySelector("#githubFollowers");
const githubContributions = document.querySelector("#githubContributions");
const year = document.querySelector("#year");
const githubUsername = "saitokurosaki";
let loadingProgress = 0;
let pageReady = false;
let entered = false;
let elapsed;
let start;
let end;
let curentvideo = 0;
year.textContent = new Date().getFullYear();
skills.forEach((skillsnav) => {
  skillsnav.addEventListener("click", () => {
    const skillPosition =
      skillssection.getBoundingClientRect().bottom +
      window.scrollY -
      window.innerHeight;

    window.scrollTo({
      top: skillPosition,
    });
  });
});

video.addEventListener("loadedmetadata", () => {
  const minute = Math.floor(video.duration / 60);
  const second = Math.floor(video.duration % 60);

  videodurationtime.textContent = `${minute}:${second.toString().padStart(2, "0")}`;
});

video.addEventListener("timeupdate", () => {
  if (!video.duration) return;

  const percent = (video.currentTime / video.duration) * 100;
  progressbar.style.width = `${percent}%`;
  const minute = Math.floor(video.currentTime / 60);
  const second = Math.floor(video.currentTime % 60);
  videocurrentime.textContent = `${minute}:${second.toString().padStart(2, "0")}`;
  if (video.currentTime === video.duration) {
    autonext();
  }
});

function autonext() {
  curentvideo++;
  loadedvideo(curentvideo);
  playvideo();
}
const videos = [
  {
    title: "Juice WRLD - Dusk To Dawn (Unreleased)",
    artist: "Prathxm",
    src: "../Video/1.mp4",
  },
  {
    title: "Juice WRLD - Better Than Us ft. Lil Uzi Vert (Unreleased)",
    artist: "LikeYa999",
    src: "../Video/2.mp4",
  },
  {
    title: "Juice WRLD - Platinum Pills (Unreleased)",
    artist: "LikeYa999",
    src: "../Video/3.mp4",
  },
  {
    title: "Juice WRLD - Fix My Flaws (Unreleased)",
    artist: "LikeYa999",
    src: "../Video/4.mp4",
  },
  {
    title: "Juice WRLD - Good Morning (Unreleased)",
    artist: "LikeYa999",
    src: "../Video/5.mp4",
  },
  {
    title: "Juice WRLD - Take My Soul [Prod.Tsuki x Aster]",
    artist: "KurøTsuki",
    src: "../Video/6.mp4",
  },
];

previusbtn.addEventListener("click", () => {
  if (curentvideo >= 0) {
    curentvideo--;
    loadedvideo(curentvideo);
    playvideo();
  }
});

nextbtn.addEventListener("click", () => {
  if (curentvideo <= videos.length - 2) {
    curentvideo++;
    loadedvideo(curentvideo);
    playvideo();
  }
});

function loadedvideo(index) {
  video.src = videos[index].src;
  title.textContent = videos[index].title;
  artist.textContent = videos[index].artist;
}

playandpausebtn.addEventListener("click", () => {
  if (video.paused) {
    playvideo();
  } else {
    pausevideo();
  }
});

setInterval(discordinfo, 1000);
setInterval(Time, 1000);
decor();

async function decor() {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${saitokurosaki}`,
  );

  const data = await response.json();
  const deco = data.data.discord_user.avatar_decoration_data?.asset;
  if (deco)
    decoration.src = `https://cdn.discordapp.com/avatar-decoration-presets/${deco}.png`;
}

async function discordinfo() {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${saitokurosaki}`,
  );

  let data = await response.json();
  let avatar = data.data.discord_user.avatar;
  let namedc = data.data.discord_user.display_name;
  let usernamedc = data.data.discord_user.username;
  let statusdc = data.data.discord_status;

  let iconimage;
  let icon;
  let applicationid;
  const activities = data.data.activities;

  const gameActivity = activities.find((activities) => activities.type === 0);
  const spotifyActivity = activities.find(
    (activities) => activities.type === 2,
  );
  const watchingActivity = activities.find(
    (activities) => activities.type === 3,
  );

  name.innerText = namedc;
  username.innerText = usernamedc;
  discordpicture.src = `https://cdn.discordapp.com/avatars/${saitokurosaki}/${avatar}.png?size=512`;

  if (gameActivity) {
    discordapp = gameActivity.application_id;
    discordappid = await fetch(
      `https://discord.com/api/v9/oauth2/applications/${discordapp}/rpc`,
    );

    applicationid = await discordappid.json();

    iconimage = applicationid.icon;
    discordappname = gameActivity.name;
    icon = `https://cdn.discordapp.com/app-icons/${discordapp}/${iconimage}.png`;
  }
  if (statusdc === "online") {
    onlinestatus.src = "https://assumi.ng/assets/discord/online.png";
    status.innerHTML = `
    
    <p
                    class="bg-[#23a5595d] rounded-full h-fit w-fit text-[#23a55a] max-sm:px-2 pr-4 pl-4 pt-0.5 pb-0.5 text-[clamp(0.8rem,0.83vw,1rem)] " 
  >ONLINE</p>
    `;
  } else if (statusdc === "dnd") {
    onlinestatus.src = "https://assumi.ng/assets/discord/dnd.png";
    status.innerHTML = `
    
    <p
                    class="bg-[#f23f4260] rounded-full h-fit w-fit text-[#f23f43] max-sm:px-2 pr-4 pl-4 pt-0.5 pb-0.5 text-[clamp(0.8rem,0.83vw,1rem)] " 
  >DND </p>
    `;
  } else if (statusdc === "idle") {
    onlinestatus.src = "https://assumi.ng/assets/discord/idle.png";
    status.innerHTML = `
    
    <p
                    class="bg-[#ffab0463] rounded-full h-fit w-fit text-[#ffab04] max-sm:px-2  pr-4 pl-4 pt-0.5 pb-0.5 text-[clamp(0.8rem,0.83vw,1rem)] " 
  >IDLE</p>
    `;
  } else {
    onlinestatus.src = "https://assumi.ng/assets/discord/offline.png";
    status.innerHTML = `
    
    <p
                    class="bg-[#80848e62] rounded-full h-fit w-fit text-[#3a3938] max-sm:px-2 pr-4 pl-4 pt-0.5 pb-0.5 text-[clamp(0.8rem,0.83vw,1rem)]"
  >OFFLINE</p>
  `;
  }

  if (gameActivity) {
    elapsed = Date.now() - start;
    start = gameActivity.timestamps.start;
    time = formatTime(elapsed);
    let name = gameActivity.name;
    let details = gameActivity.details || "";
    activitystatus.innerHTML = `
    <img
     src="${icon}"
     class="activitylogo max-sm:w-8 max-sm:h-8 w-10 h-10 rounded-md gap-3 object-cover"
     />
     <div class=" flex flex-col gap-3">
     <p class="text-lg max-sm:text-base

 text-gray-500 

">Playing ${name}</p>
     <p class=" max-sm:text-sm
">${name}</p>
${
  details
    ? `<p class=" max-sm:text-sm
 
 ">${details}</p>`
    : ""
}
      <p class=" max-sm:text-sm
 
 ">${time}</p>
                </div>
    `;
  } else if (spotifyActivity) {
    start = spotifyActivity.timestamps.start;
    end = spotifyActivity.timestamps.end;
    elapsed = Date.now() - start;

    const duration = end - start;
    const progress = Math.min((elapsed / duration) * 100, 100);

    let details = spotifyActivity.details;
    let state = spotifyActivity.state;

    activitystatus.innerHTML = `
  <img
    src="../Pictures/spotify.png"
    class=" max-sm:w-8 max-sm:h-8 w-10 h-10 rounded-md object-cover"
  />

  <div class="flex flex-col gap-3 w-full">

    <p class="text-lg max-sm:text-base

 text-gray-500 

">Listening to Spotify</p>

    <p class=" max-sm:text-sm
 
 ">${state}</p>

    <p class=" max-sm:text-sm
 
 ">${details}</p>

    <div class="flex items-center gap-2 w-full">
      <span class=" max-sm:text-sm
">${formatTime(elapsed)}</span>

      <div class="relative h-1 bg-gray-300 rounded-full flex-1">
        <div
          class="absolute left-0 top-0 h-1 bg-black rounded-full"
          style="width: ${progress}%"
        ></div>
      </div>

      <span class=" max-sm:text-sm
">${formatTime(duration)}</span>
    </div>

  </div>
`;
  } else if (watchingActivity) {
    elapsed = Date.now() - start;
    start = watchingActivity.timestamps.start;
    time = formatTime(elapsed);
    let details = watchingActivity.details;
    let state = watchingActivity.state;
    let episode = watchingActivity.assets.large_text;
    activitystatus.innerHTML = `
    <img
     src="../Pictures/crunchyroll.png"
     class="activitylogo max-sm:w-8 max-sm:h-8 w-10 h-10 rounded-md gap-3 object-cover"
     />
     <div class=" flex flex-col gap-3 ">
     <p class="text-lg max-sm:text-base 

 text-gray-500 

">Watching Crunchyroll</p>
     <p class=" max-sm:text-sm
 
 ">${details}</p>
     <p class=" max-sm:text-sm

">${state}</p>
     <p class=" max-sm:text-sm

">${episode}</p>
      <p class=" max-sm:text-sm 

">${time}</p>
                </div>
    `;
  } else {
    activitystatus.innerHTML = `
    <div class="flex flex-col items-center text-center w-full">
    <img src="../Pictures/nostatus.png" class=" w-30 object-cover"/>
    <p class="text-lg max-sm:text-base


 font-bold

">No Activity</p>
    <p class="text-xs
 max-w-50

">Saito Kurosaki is not displaying any activities on Discord right now.</p>
    <div>
    `;
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function Time() {
  const elapsed = Date.now() - onlineSince;

  const totalSeconds = Math.floor(elapsed / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const time =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  elapseTime.textContent = `${time} Elapsed`;
}

menuBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-full");
  darkoverlay.classList.remove("opacity-0", "pointer-events-none");
  document.body.classList.add("overflow-hidden");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.add("translate-x-full");
  darkoverlay.classList.add("opacity-0", "pointer-events-none");
  document.body.classList.remove("overflow-hidden");
});

mobileNav.forEach((nav) => {
  nav.addEventListener("click", () => {
    sidebar.classList.add("translate-x-full");
    darkoverlay.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
  });
});

function playvideo() {
  video.play();
  midbtn.src = "../svg/control-buttons-pause.svg";
}

function pausevideo() {
  video.pause();
  midbtn.src = "../svg/button-play.svg";
}

const loadingInterval = setInterval(() => {
  if (loadingProgress < 90) {
    loadingProgress += Math.floor(Math.random() * 5) + 1;

    if (loadingProgress > 90) {
      loadingProgress = 90;
    }

    loadingBar.style.width = loadingProgress + "%";
    loadingPercent.textContent = loadingProgress + "%";
  }
}, 180);

window.addEventListener("load", () => {
  pageReady = true;

  clearInterval(loadingInterval);

  loadingProgress = 100;
  loadingBar.style.width = "100%";
  loadingPercent.textContent = "100%";
  loadingStatus.textContent = "READY";

  setTimeout(() => {
    enterText.classList.remove("opacity-0");
  }, 400);
});

loadingScreen.addEventListener("click", async () => {
  if (!pageReady || entered) return;

  entered = true;

  loadingStatus.textContent = "WELCOME";
  enterText.textContent = "ENTERING...";

  video.play();

  loadingScreen.classList.add("opacity-0", "pointer-events-none");

  setTimeout(() => {
    loadingScreen.remove();
  }, 700);
});

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const months = Math.floor(days / 30);

  return `${months} ${months === 1 ? "month" : "months"} ago`;
}

function getActivity(event) {
  const repoName = event.repo.name.split("/")[1];

  switch (event.type) {
    case "PushEvent":
      return {
        title: `Pushed to ${repoName}`,
        description: "Updated repository",
      };

    case "CreateEvent":
      if (event.payload.ref_type === "repository") {
        return {
          title: "Created repository",
          description: repoName,
        };
      }

      return {
        title: "Created branch",
        description: `${event.payload.ref} in ${repoName}`,
      };

    case "DeleteEvent":
      return {
        title: "Deleted branch",
        description: `${event.payload.ref} from ${repoName}`,
      };

    case "ForkEvent":
      return {
        title: "Forked repository",
        description: repoName,
      };

    case "WatchEvent":
      return {
        title: "Starred repository",
        description: repoName,
      };

    case "IssuesEvent":
      return {
        title: `${event.payload.action} issue`,
        description: repoName,
      };

    case "PullRequestEvent":
      return {
        title: `${event.payload.action} pull request`,
        description: repoName,
      };

    case "ReleaseEvent":
      return {
        title: "Published release",
        description: repoName,
      };

    default:
      return {
        title: event.type.replace("Event", ""),
        description: repoName,
      };
  }
}

const githubActivityCacheTime = 30 * 1000;
const githubStatsCacheTime = 10 * 60 * 1000;

function getGithubCache(key, cacheTime) {
  try {
    const cached = localStorage.getItem(key);

    if (!cached) {
      return null;
    }

    const data = JSON.parse(cached);

    if (Date.now() - data.time > cacheTime) {
      localStorage.removeItem(key);
      return null;
    }

    return data.data;
  } catch {
    return null;
  }
}

function setGithubCache(key, data) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        time: Date.now(),
        data: data,
      }),
    );
  } catch {}
}

async function getCommitMessage(event) {
  if (event.type !== "PushEvent") {
    return null;
  }

  const commitSHA = event.payload.head;

  if (!commitSHA) {
    return "Updated repository";
  }

  const cacheKey = `github-commit-${commitSHA}`;

  const cached = getGithubCache(cacheKey, githubActivityCacheTime);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${event.repo.name}/commits/${commitSHA}`,
    );

    if (!response.ok) {
      return "Updated repository";
    }

    const commit = await response.json();

    const message =
      commit.commit?.message?.split("\n")[0]?.trim() || "Updated repository";

    setGithubCache(cacheKey, message);

    return message;
  } catch {
    return "Updated repository";
  }
}

async function loadGithubActivity() {
  try {
    let events = getGithubCache("github-events", githubActivityCacheTime);

    if (!events) {
      const response = await fetch(githubAPI);

      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`);
      }

      events = await response.json();

      setGithubCache("github-events", events);
    }

    if (!Array.isArray(events)) {
      throw new Error("GitHub response is not an array");
    }

    const latestEvents = events.slice(0, 3);

    githubActivity.innerHTML = "";

    if (latestEvents.length === 0) {
      githubActivity.innerHTML = `
        <p class="text-sm text-gray-400">
          No recent activity.
        </p>
      `;

      return;
    }

    for (let i = 0; i < latestEvents.length; i++) {
      const event = latestEvents[i];

      const activity = getActivity(event);

      if (event.type === "PushEvent") {
        activity.description = await getCommitMessage(event);
      }

      const isLast = i === latestEvents.length - 1;

      const activityElement = document.createElement("a");

      activityElement.href = `https://github.com/${event.repo.name}`;

      activityElement.target = "_blank";

      activityElement.rel = "noopener noreferrer";

      activityElement.className = "relative flex gap-4 group";

      activityElement.innerHTML = `
        <div class="flex flex-col items-center">

          <div
            class="
              w-3
              h-3
              rounded-full
              bg-white
              border
              border-gray-300
              shrink-0
              group-hover:scale-125
              transition-transform
            "
          ></div>

          ${
            !isLast
              ? `
                <div
                  class="
                    w-px
                    flex-1
                    bg-gray-300
                  "
                ></div>
              `
              : ""
          }

        </div>

        <div
          class="
            pb-5
            min-w-0
            flex-1
          "
        >

          <p
            class="
              text-sm
              font-semibold
              text-black
            "
          >
            ${activity.title}
          </p>

          <p
            class="
              text-xs
              text-gray-500
              mt-1
              break-words
            "
          >
            ${activity.description}
          </p>

          <p
            class="
              text-[11px]
              text-gray-400
              mt-1
            "
          >
            ${timeAgo(event.created_at)}
          </p>

        </div>
      `;

      githubActivity.appendChild(activityElement);
    }
  } catch (error) {
    console.error("GitHub activity error:", error);

    githubActivity.innerHTML = `
      <p class="text-sm text-gray-400">
        Unable to load GitHub activity.
      </p>
    `;
  }
}

loadGithubActivity();

async function loadGithubStats() {
  try {
    let user = getGithubCache("github-user", githubStatsCacheTime);

    if (!user) {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}`,
      );

      if (!response.ok) {
        throw new Error("GitHub user request failed");
      }

      user = await response.json();

      setGithubCache("github-user", user);
    }

    githubRepos.textContent = user.public_repos;

    githubFollowers.textContent = user.followers;

    let repos = getGithubCache("github-repositories", githubStatsCacheTime);

    if (!repos) {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
      );

      if (!response.ok) {
        throw new Error("GitHub repositories request failed");
      }

      repos = await response.json();

      setGithubCache("github-repositories", repos);
    }

    const totalStars = repos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0,
    );

    githubStars.textContent = totalStars;

    let contributionData = getGithubCache(
      "github-contributions",
      githubStatsCacheTime,
    );

    if (!contributionData) {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
      );

      if (!response.ok) {
        throw new Error("Contribution request failed");
      }

      contributionData = await response.json();

      setGithubCache("github-contributions", contributionData);
    }

    createContributionGraph(contributionData.contributions);
  } catch (error) {
    console.error("GitHub stats error:", error);
  }
}

function createContributionGraph(contributions) {
  githubContributions.innerHTML = "";

  const days = contributions.slice(-140);

  const graph = document.createElement("div");

  graph.style.display = "grid";
  graph.style.gridTemplateRows = "repeat(7, 8px)";
  graph.style.gridAutoFlow = "column";
  graph.style.gridAutoColumns = "minmax(0, 1fr)";
  graph.style.gap = "3px";
  graph.style.width = "100%";

  days.forEach((day) => {
    const square = document.createElement("div");

    square.className = "w-full h-[8px] rounded-[2px]";

    if (day.level === 0) {
      square.classList.add("bg-gray-100");
    } else if (day.level === 1) {
      square.classList.add("bg-gray-200");
    } else if (day.level === 2) {
      square.classList.add("bg-gray-300");
    } else if (day.level === 3) {
      square.classList.add("bg-gray-400");
    } else if (day.level === 4) {
      square.classList.add("bg-gray-600");
    } else {
      square.classList.add("bg-gray-100");
    }

    square.title = `${day.count} contributions on ${day.date}`;

    graph.appendChild(square);
  });

  githubContributions.appendChild(graph);
}

loadGithubStats();
