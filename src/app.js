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

let loadingProgress = 0;
let pageReady = false;
let entered = false;
let elapsed;
let start;
let end;

let curentvideo = 0;

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
  console.log(curentvideo);
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
  let discordappname;
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
  let discordstatus = statusdc.toUpperCase();
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
    const time = `${formatTime(elapsed)} / ${formatTime(duration)}`;

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
