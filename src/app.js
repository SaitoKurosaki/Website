const image = document.querySelector(".picture");
const decoration = document.querySelector(".decoration");
const saitokurosaki = "862974778226638858";
const mind = document.querySelector(".mind");
const statuscolor = document.querySelector(".statuscolor");
const usernametxt = document.querySelector(".username");
const nametxt = document.querySelector(".name");
const statusicon = document.querySelector(".statusicon");
const activity = document.querySelector(".activity");
const cover = document.querySelector(".logo");
const statusactivity = document.querySelector(".statusactivity");
decor();
dcProfile();
setInterval(dcProfile, 500);

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

  if (playingActivity) {
    currentActivity = playingActivity;
    activityType = "Playing";
    cover.style.display = "none";
  } else if (watchingActivity) {
    currentActivity = watchingActivity;
    activityType = "Watching";

    cover.style.display = "block";

    const imageUrl =
      "https://media.discordapp.net/external/" +
      currentActivity.assets.large_image.replace("mp:external/", "");

    cover.src = imageUrl;
  } else if (spotifyActivity) {
    currentActivity = spotifyActivity;
    activityType = "Listening to";

    cover.style.display = "block";
    cover.src = data.data.spotify.album_art_url;
  } else {
    cover.style.display = "none";
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
      activity.innerHTML = `
<p class="text-white text-sm mb-5 font-bold">
    ${activityType} ${currentActivity.name}
</p>



<p class="text-white font-bold text-xs leading-5">
    ${currentActivity.details}
</p>

<p class="text-gray-300 text-sm truncate">
    ${currentActivity.state}
</p>

<p class="text-green-500 text-sm mt-1">
    ${time}
    <span class="text-gray-300">• ${currentActivity.assets.large_text}</span>
</p>
`;
    } else if (currentActivity.type === 2) {
      activity.innerHTML = `
<p class="text-white text-sm mb-5 font-bold">
    ${activityType} ${currentActivity.name}
</p>

<p class="text-white font-bold text-xs leading-5">
    ${currentActivity.details}
</p>

<p class="text-gray-300 text-sm truncate">
    ${currentActivity.state}
</p>

<p class="text-green-500 text-sm mt-1">
    ${time}
    <span class="text-gray-300">• ${currentActivity.assets.large_text}</span>
</p>
`;
    } else {
      statusactivity.style.right = "15px";
      statusactivity.style.bottom = "15px";
      activity.innerHTML = `
      
      
<p class="text-white text-sm mb-5 font-bold">
    ${activityType} ${currentActivity.name}
</p>


<p class="text-gray-300 text-sm truncate ">
    ${currentActivity.state}
</p>

<p class="text-green-500 text-sm mt-1">
    ${time}
    <span class="text-gray-300">• ${currentActivity.assets.large_text}</span>
</p>
`;
    }
  } else {
    activity.innerHTML = "";
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
