const image = document.querySelector(".picture");
const decoration = document.querySelector(".decoration");
const saitokurosaki = "862974778226638858";
const mind = document.querySelector(".mind");
const statuscolor = document.querySelector(".statuscolor");
const usernametxt = document.querySelector(".username");
const nametxt = document.querySelector(".name");
const statusicon = document.querySelector(".statusicon");
const activity = document.querySelector(".activity");
const activitystatus = document.querySelector(".activitystatus");
const statusactivity = document.querySelector(".statusactivity");
decor();
dcProfile();
setInterval(dcProfile, 1000);

let discordapp;
async function decor() {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${saitokurosaki}`,
  );

  const data = await response.json();
  const deco = data.data.discord_user.avatar_decoration_data.asset;
  decoration.src = `https://cdn.discordapp.com/avatar-decoration-presets/${deco}.png`;
}

async function dcProfile() {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${saitokurosaki}`,
  );

  const data = await response.json();

  discordapp = data.data.activities[1]?.application_id || null;
  let discordappid;

  let applicationid;
  let discordappname;
  let discordimage;
  if (data.data.activities[1]?.type === 0) {
    discordappid = await fetch(
      `https://discord.com/api/v9/oauth2/applications/${discordapp}/rpc`,
    );

    applicationid = await discordappid.json();
    imageid = applicationid.icon;
    discordappname = data.data.activities[1].name;
    discordimage = `https://cdn.discordapp.com/app-icons/${discordapp}/${imageid}.png`;
  }

  const name = data.data.discord_user.display_name;
  const username = data.data.discord_user.username;
  const avatar = data.data.discord_user.avatar;

  const status = data.data.discord_status;
  const playingActivity = data.data.activities.find(
    (activity) => activity.type === 0,
  );

  const spotifyActivity = data.data.activities.find(
    (activity) => activity.type === 2,
  );

  const watchingActivity = data.data.activities.find(
    (activity) => activity.type === 3,
  );

  const customStatus = data.data.activities.find(
    (activity) => activity.type === 4,
  );

  let currentActivity = null;
  let activityType = "";
  let imagealbum;
  let album;
  if (spotifyActivity) {
    currentActivity = spotifyActivity;
    activityType = "Listening to";
    album = data.data.spotify.album_art_url;
  } else if (watchingActivity) {
    currentActivity = watchingActivity;
    activityType = "Watching";

    imagealbum =
      "https://media.discordapp.net/external/" +
      currentActivity.assets.large_image.replace("mp:external/", "");
  } else if (playingActivity) {
    currentActivity = playingActivity;
    activityType = "Playing";
  }

  image.src = `https://cdn.discordapp.com/avatars/${saitokurosaki}/${avatar}.png?size=512`;

  nametxt.textContent = name;
  usernametxt.textContent = `@${username}`;

  if (customStatus) {
    mind.textContent = customStatus.state;
  } else {
    mind.textContent = "";
  }

  let time = "";

  if (currentActivity) {
    if (currentActivity.timestamps) {
      if (currentActivity.timestamps.start) {
        const elapsed = Date.now() - currentActivity.timestamps.start;

        if (currentActivity.timestamps.end) {
          const duration =
            currentActivity.timestamps.end - currentActivity.timestamps.start;

          time = formatTime(elapsed) + " / " + formatTime(duration);
        } else {
          time = formatTime(elapsed);
        }
      }
    }

    if (currentActivity.type === 3) {
      activitystatus.innerHTML = `
     <div class="flex items-center w-auto text-nowrap flex-col relative ml-5">
     <div class="flex gap-2">
     <img class="w-5 h-5" src=../Pictures/electric.png alt="image">
      <p class="text-white text-sm mb-2 font-bold">
    ${activityType} <span class="text-[#ff5e00]">${currentActivity.name}</span>
</p>

</div >
  <img
    class="logo w-full h-25 rounded-md object-cover shrink-0 "
    src="${imagealbum}"
    alt="Album Cover"
  />
  <img class="w-8 h-8  absolute bottom-1 left-1" src=../Pictures/crunchyroll.png alt="image">
  </div>


  
  <div class="flex w-auto flex-col  items-center mr-5 ">



  <p class="text-white font-bold text-xs leading-5 ">
    ${currentActivity.details}
</p>
<p class="text-gray-300 text-sm text-wrap max-w-50 truncate ">
    ${currentActivity.state} 
</p>
<div>

<p class="text-gray-200 text-sm">${currentActivity.assets.large_text}</p>
</div>
<p class="text-green-500 text-sm ">
    ${time}
</p>
</div>
`;
    } else if (currentActivity.type === 2) {
      activitystatus.innerHTML = `
     <div class="flex items-center w-auto text-nowrap flex-col relative ml-5">
     <div class="flex gap-2">
     <img class="w-5 h-5" src=../Pictures/electric.png alt="image">
      <p class="text-white text-sm mb-2 font-bold">
    ${activityType} <span class="text-green-400">${currentActivity.name}</span>
</p>

</div >
  <img
    class="logo w-full h-25 rounded-md object-cover shrink-0 "
    src="${album}"
    alt="Album Cover"
  />
  <img class="w-8 h-8  absolute bottom-1 left-1" src=../Pictures/spotify.png alt="image">
  </div>


  
  <div class="flex w-auto flex-col  items-center mr-5 ">

<p class="text-gray-300 text-sm text-wrap max-w-50 truncate ">
    ${currentActivity.state}
</p>

  <p class="text-white font-bold text-xs leading-5 ">
    ${currentActivity.details}
</p>


<p class="text-green-500 text-sm ">
    ${time}
</p>
</div>
`;
    } else {
      activitystatus.innerHTML = `
     <div class="flex items-center w-auto text-nowrap flex-col relative ml-5">
     <div class="flex gap-2">
     <img class="w-5 h-5" src=../Pictures/electric.png alt="image">
      <p class="text-white text-sm mb-2 font-bold">
    ${activityType} <span class="text-white">${currentActivity.name}</span>
</p>

</div >
  <img
    class="logo w-full h-25 rounded-md object-cover shrink-0 "
    src="${discordimage}"
    alt="Album Cover"
  />
  </div>


  
  <div class="flex w-auto flex-col  items-center mr-5 ">

<p class="text-gray-300 text-sm text-wrap max-w-50 truncate ">
    ${discordappname}
</p>

<p class="text-green-500 text-sm ">
    ${time}
</p>
</div>
`;
    }
  }

  if (status === "offline") {
    statuscolor.style.backgroundImage =
      "url('https://assumi.ng/assets/discord/offline.png')";
    statusicon.style.color = "gray";
  } else {
    statuscolor.style.backgroundImage =
      "url('https://assumi.ng/assets/discord/idle.png')";
    statusicon.style.color = "green";
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
