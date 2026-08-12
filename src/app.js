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
let elapsed;
let start;
let end;
setInterval(discordinfo, 1000);
setInterval(Time, 1000);
decor();

async function decor() {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${saitokurosaki}`,
  );

  const data = await response.json();
  const deco = data.data.discord_user.avatar_decoration_data;
  if (deco?.assets)
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
  let activity = data.data.activities[1];

  name.innerText = namedc;
  let discordstatus = statusdc.toUpperCase();
  username.innerText = usernamedc;
  discordpicture.src = `https://cdn.discordapp.com/avatars/${saitokurosaki}/${avatar}.png?size=512`;

  if (activity?.type === 0) {
    discordapp = activity?.application_id || null;
    discordappid = await fetch(
      `https://discord.com/api/v9/oauth2/applications/${discordapp}/rpc`,
    );

    applicationid = await discordappid.json();

    iconimage = applicationid.icon;
    discordappname = data.data.activities[1].name;
    icon = `https://cdn.discordapp.com/app-icons/${discordapp}/${iconimage}.png`;
  }

  if (statusdc === "idle") {
    onlinestatus.src = "https://assumi.ng/assets/discord/idle.png";
    status.innerHTML = `
    
    <p
                    class="bg-[#f5daa586] rounded-full h-fit w-fit text-[#ffab04] pr-4 pl-4 pt-0.5 pb-0.5"
  >IDLE</p>
    `;
  } else {
    onlinestatus.src = "https://assumi.ng/assets/discord/offline.png";
    status.innerHTML = `
    
    <p
                    class="bg-[#80848e] rounded-full h-fit w-fit text-[#3a3938] pr-4 pl-4 pt-0.5 pb-0.5"
  >OFFLINE</p>
  `;
  }

  if (activity?.type === 0) {
    elapsed = Date.now() - start;
    start = activity.timestamps.start;
    time = formatTime(elapsed);
    let name = activity.name;
    let details = activity?.details || "";
    activitystatus.innerHTML = `
    <img
     src="${icon}"
     class="activitylogo w-10 h-10 rounded-md gap-3 object-cover"
     />
     <div class=" flex flex-col gap-3">
     <p>Playing ${name}</p>
     <p class=" text-gray-500">${name}</p>
${details ? `<p>${details}</p>` : ""}
      <p>${time}</p>
                </div>
    `;
  } else if (activity?.type === 2) {
    start = activity.timestamps.start;
    end = activity.timestamps.end;
    elapsed = Date.now() - start;

    const duration = end - start;
    const progress = Math.min((elapsed / duration) * 100, 100);
    const time = `${formatTime(elapsed)} / ${formatTime(duration)}`;

    let details = activity.details;
    let state = activity.state;

    activitystatus.innerHTML = `
  <img
    src="../Pictures/spotify.png"
    class=" w-10 h-10 rounded-md object-cover"
  />

  <div class="flex flex-col gap-3 w-full">

    <p>Listening to Spotify</p>

    <p class="text-gray-500">${state}</p>

    <p>${details}</p>

    <div class="flex items-center gap-2 w-full">
      <span class="text-xs">${formatTime(elapsed)}</span>

      <div class="relative h-1 bg-gray-300 rounded-full flex-1">
        <div
          class="absolute left-0 top-0 h-1 bg-black rounded-full"
          style="width: ${progress}%"
        ></div>
      </div>

      <span class="text-xs">${formatTime(duration)}</span>
    </div>

  </div>
`;
  } else if (activity?.type === 3) {
    elapsed = Date.now() - start;
    start = activity.timestamps.start;
    time = formatTime(elapsed);
    let details = activity.details;
    let state = activity.state;
    let episode = activity.assets.large_text;
    activitystatus.innerHTML = `
    <img
     src="../Pictures/crunchyroll.png"
     class="activitylogo w-10 h-10 rounded-md gap-3 object-cover"
     />
     <div class=" flex flex-col gap-3">
     <p>Watching Crunchyroll</p>
     <p class=" text-gray-500">${details}</p>
     <p id="">${state}</p>
     <p>${episode}</p>
      <p>${time}</p>
                </div>
    `;
  } else {
    activitystatus.innerHTML = `
    <div class="flex flex-col items-center text-center w-full">
    <img src="../Pictures/nostatus.png" class=" w-30 object-cover"/>
    <p class="text-lg
 font-semibold

">No Activity</p>
    <p class="text-xs max-w-50

">Saito Kurosaki is not displaying any activity on Discord right now.</p>
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
