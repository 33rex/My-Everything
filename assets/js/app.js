const STORAGE_KEYS = {
  openedCount: "web4myash_openedCount",
  theme: "web4myash_theme",
  audioUnlocked: "web4myash_audioUnlocked",
  repeat: "web4myash_repeat",
  shuffle: "web4myash_shuffle",
  collectedMessages: "web4myash_collectedMessages",
  favoriteMessages: "web4myash_favoriteMessages",
  likedMessages: "web4myash_likedMessages",
  collectedVoices: "web4myash_collectedVoices",
  favoriteVoices: "web4myash_favoriteVoices",
  likedVoices: "web4myash_likedVoices"
};

const LETTERS = [
  {
    id: 1,
    goal: 25,
    title: "Letter 1",
    preview: "your first unlocked letter",
    body: `
      my baby, if you unlocked this one then youve already spent enough time here
      for me to know that this little world is becoming yours too.
      i hope every click makes you feel loved, softer, calmer and closer to me.
      no matter what mood you come with, i want you to leave this place feeling chosen.
    `
  },
  {
    id: 2,
    goal: 75,
    title: "Letter 2",
    preview: "a deeper one",
    body: `
      i dont only love you when things are easy.
      i love you in the difficult moments too, in the quiet moments too,
      in the overthinking moments too.
      i love the version of you that smiles, and i love the version of you that needs comfort.
      all of you is worth loving.
    `
  },
  {
    id: 3,
    goal: 150,
    title: "Letter 3",
    preview: "for when you stayed longer",
    body: `
      every time you come back here, it feels like choosing us again.
      i want you to know that your place with me is safe.
      i want to be the person you run to when youre happy, when youre sad,
      when youre needy, when youre proud, when you want love and when you want peace.
    `
  },
  {
    id: 4,
    goal: 300,
    title: "Letter 4",
    preview: "the future one",
    body: `
      one day i want all of this to feel small compared to the real life version of us.
      i want real hugs, real kisses, real sleepy voices, real mornings, real forever.
      you are not just someone i adore.
      you are someone i can imagine building a whole life with.
    `
  }
];

const CATEGORY_INFO = {
  1: "if we fought",
  2: "if you miss me",
  3: "any time!",
  4: "if im mean"
};

const SECRET_GOAL_FIRST = LETTERS[0].goal;

const photoGallery = [
  { src: "photos/photo1.png", alt: "memory 1" },
  { src: "photos/photo2.png", alt: "memory 2" },
  { src: "photos/photo3.png", alt: "memory 3" },
  { src: "photos/photo4.png", alt: "memory 4" },
  { src: "photos/photo5.png", alt: "memory 5" },
  { src: "photos/photo6.png", alt: "memory 6" },
  { src: "photos/photo7.png", alt: "memory 7" },
  { src: "photos/photo8.png", alt: "memory 8" },
  { src: "photos/photo9.png", alt: "memory 9" },
  { src: "photos/photo10.png", alt: "memory 10" },
  { src: "photos/photo11.png", alt: "memory 11" },
  { src: "photos/photo12.png", alt: "memory 12" },
  { src: "photos/photo13.png", alt: "memory 13" },
  { src: "photos/photo14.png", alt: "memory 14" },
  { src: "photos/photo15.png", alt: "memory 15" },
  { src: "photos/photo16.png", alt: "memory 16" },
  { src: "photos/photo17.png", alt: "memory 17" },
  { src: "photos/photo18.png", alt: "memory 18" },
  { src: "photos/photo19.png", alt: "memory 19" },
  { src: "photos/photo20.png", alt: "memory 20" },
  { src: "photos/photo21.png", alt: "memory 21" },
  { src: "photos/photo22.png", alt: "memory 22" },
  { src: "photos/photo23.png", alt: "memory 23" },
  { src: "photos/photo24.png", alt: "memory 24" }
];

const voiceMessages = [
  {
    id: "voice-1",
    title: "Sleepy message",
    preview: "a soft little message for you",
    src: "voice/voice1.mp3"
  },
  {
    id: "voice-2",
    title: "I miss you",
    preview: "for when you need me",
    src: "voice/voice2.mp3"
  }
];

const zettelEl = document.getElementById("zettel");
const buttons = document.querySelectorAll(".jug-card");
const messageCountEl = document.getElementById("messageCount");
const secretProgressEl = document.getElementById("secretProgress");
const collectedTotalEl = document.getElementById("collectedTotal");
const unlockAudioBtn = document.getElementById("unlockAudioBtn");

const audioPlayer = document.getElementById("audioPlayer");
const coverArt = document.getElementById("coverArt");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const trackAlbum = document.getElementById("trackAlbum");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const playlistList = document.getElementById("playlistList");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const openGalleryBtn = document.getElementById("openGalleryBtn");
const loveLetterBtn = document.getElementById("loveLetterBtn");
const proposalBtn = document.getElementById("proposalBtn");
const messageVaultBtn = document.getElementById("messageVaultBtn");
const voiceMessagesBtn = document.getElementById("voiceMessagesBtn");

const galleryModal = document.getElementById("galleryModal");
const loveLetterModal = document.getElementById("loveLetterModal");
const proposalModal = document.getElementById("proposalModal");
const updatesModal = document.getElementById("updatesModal");
const messageVaultModal = document.getElementById("messageVaultModal");
const voiceMessagesModal = document.getElementById("voiceMessagesModal");

const lettersOverview = document.getElementById("lettersOverview");
const activeLetterBox = document.getElementById("activeLetterBox");
const letterMilestones = document.getElementById("letterMilestones");
const categoryProgress = document.getElementById("categoryProgress");

const kissHoldArea = document.getElementById("kissHoldArea");
const kissBurst = document.getElementById("kissBurst");
const themeToggle = document.getElementById("themeToggle");
const installBtn = document.getElementById("installBtn");
const updatesIconBtn = document.getElementById("updatesIconBtn");

const vaultList = document.getElementById("vaultList");
const vaultSummary = document.getElementById("vaultSummary");
const vaultCategoryFilter = document.getElementById("vaultCategoryFilter");
const vaultTabs = document.querySelectorAll(".vault-tab");
const vaultSearchInput = document.getElementById("vaultSearchInput");
const vaultSortSelect = document.getElementById("vaultSortSelect");
const exportVaultBtn = document.getElementById("exportVaultBtn");
const importVaultBtn = document.getElementById("importVaultBtn");
const importVaultInput = document.getElementById("importVaultInput");

const galleryGrid = document.getElementById("galleryGrid");
const downloadAllPhotosBtn = document.getElementById("downloadAllPhotosBtn");

const voiceList = document.getElementById("voiceList");
const voiceSummary = document.getElementById("voiceSummary");
const voiceTabs = document.querySelectorAll(".voice-tab");
const voiceSearchInput = document.getElementById("voiceSearchInput");
const voiceSortSelect = document.getElementById("voiceSortSelect");

let zettelTimeout = null;
let openedCount = Number(localStorage.getItem(STORAGE_KEYS.openedCount) || 0);
let audioUnlocked = localStorage.getItem(STORAGE_KEYS.audioUnlocked) === "true";
let shuffleMode = localStorage.getItem(STORAGE_KEYS.shuffle) === "true";
let repeatMode = localStorage.getItem(STORAGE_KEYS.repeat) === "true";
let currentTrackIndex = 0;
let deferredPrompt = null;
let holdTimer = null;
let currentVaultFilter = "all";
let currentVoiceFilter = "all";
let currentVoicePlayingId = null;

let collectedMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.collectedMessages) || "[]");
let favoriteMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.favoriteMessages) || "[]");
let likedMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.likedMessages) || "[]");

let collectedVoices = JSON.parse(localStorage.getItem(STORAGE_KEYS.collectedVoices) || "[]");
let favoriteVoices = JSON.parse(localStorage.getItem(STORAGE_KEYS.favoriteVoices) || "[]");
let likedVoices = JSON.parse(localStorage.getItem(STORAGE_KEYS.likedVoices) || "[]");

const floatingQuotes = [
  "you are my favorite place ❤️",
  "my heart chose you",
  "i fall in love with you more every day",
  "being yours feels like home",
  "you are my peace",
  "your smile is my weakness",
  "youre the little world i always want to come back to"
];

const playlist = [
  {
    title: "filthy yet so pretty",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/your-song-1.mp3",
    cover: "assets/covers/default-cover.jpg"
  },
  {
    title: "Touch",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/touch.mp3",
    cover: "assets/covers/touch.png"
  },
  {
    title: "i miss u and im at this point in my life",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/imissyou.mp3",
    cover: "assets/covers/imissyou.png"
  },
  {
    title: "We'll Never Have Sex",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/neverhave.mp3",
    cover: "assets/covers/neverhave.png"
  },
  {
    title: "poison",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/poison.mp3",
    cover: "assets/covers/poison.png"
  },
  {
    title: "Good Looking",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/goodlooking.mp3",
    cover: "assets/covers/goodlooking.png"
  },
  {
    title: "NIGHTS LIKE THIS",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/nights.mp3",
    cover: "assets/covers/nights.png"
  },
  {
    title: "NOT THAT I'M ANYWHERE",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/anywhere.mp3",
    cover: "assets/covers/anywhere.png"
  },
  {
    title: "Baby Came Home 2 / Valentines",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/comehome.mp3",
    cover: "assets/covers/comehome.png"
  },
  {
    title: "No. 1 Party Anthem",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/party.mp3",
    cover: "assets/covers/party.png"
  },
  {
    title: "A New Kind Of Love - Demo",
    artist: "your rexy",
    album: "our 8th month.",
    src: "music/love.mp3",
    cover: "assets/covers/love.png"
  }
];

const listen = {
  1: [
    "my baby, there sometimes is hard times in a relationship, but thats what makes a relationship. know that real love isnt easy and easy love isnt real. know that after this, we will be even closer to eachother than before. we, me and you, we learn from our mistakes, grow with each day, develop our relationship and thats what matters baby. i really love you my illean.",
    "ash! you being here probably means that were giving eachother a silent treatment so go text me because thats everything i want baby, go text me, lets fix it together and be happy again. waiting and not saying anything to eachother really doesnt make sense. go text me, tell me how you feel and ill listen to you my darling. if its not about another boy i really will forgive most of the things if you promise me not to repeat them again. i love you my illean and you really are the greatest thing that has ever happened to me. MWAAAHHHH",
    "sweetheart, fights happen and its alright! we fight because we care, i fight and argue about something that i love and care about and that is you baby. i really never put so much effert in a person as much as i did with you and i am ready to put more effert in us than i ever will be able to. i love you my sweetheart and know that all im waiting for is an honest and serious apology, and if i am the one in the wrong you can expect that from me baby. wallah ya illean id die for you.",
    "Grrrrr>:C",
    "id rather try with you again and again a billion times than ever just think about someone new my love.",
    "i still choose you baby, every single time. even when we are mad at eachother you will still stay my everything.",
    "im sorry if i hurt you my baby ;( i really love you way more than my own pride and i mean it my love.",
    "Cmere my baby, lets fix this together sweetheart",
    "im proud of you for everything illean.",
    "Come to me my baby, ill always be a shoulder for you to cry on, no matter if we argued, it doesnt mean that ever ill stop caring for you my baby.",
    "i hate the space between us illy, i never want to be far away from you.",
    "even when we hurt eachother, youre still the person i want to run to, and i hope to be that person for you one day baby.",
    "i will always love you and always choose you, on good days, on bad days and on everything in between.",
    "i love you in a way that doesnt disappear when things get hard.",
    "MWAAAAAAAAAAAHHHHH, i know you needed this ;)",
    "you arent a burden to me, youre my escape. i love you ash.",
    "i get hurt knowing that your hurt, and i wished i could carry it for you.",
    "even on the darkest days we have, i still see you as my only light."
  ],
  2: [
    "KNOW THAT I MISS YOU TOO BABYY🤧🤧",
    "My babyyyy! im probably either sleeping or busy in school. you could write me alottt of texts until im back because you should know that i loveeee thatt :33 hehehe i love you my princess!",
    "whatever im doing right now, you should know im really sorry and ill text you as soon as i can my princess.know that i really love texting you alot and that even if were in a fight. i want to spend my everyday, my every hour, my every minute and my every single second with you my baby and that until my last day on this earth. i love you illean.",
    "if its because i died know that im happy that i died with you being my first and last true love baby. i love you my illean❤️🤍🤍",
    "if i was able to hug you then know that id be right beside you cuddling up with you forever right now my baby.",
    "I miss you more ash ;( and missing you truly is my least favorite activity.",
    "Im always here with you baby, even when im physically not, ill still always be here for you.",
    "Distance doesnt make me love you less baby, i promise ill always love you forever and my love to you will always increase exponentially.",
    "i miss you too baby, i feel like something is missing whenever youre not around :c",
    "every quiet moment without you still somehow sounds like your name.",
    "i wished i could go through the screen and pull you into my arms.",
    "missing you reminds me of how much i truly love and need you.",
    "youre always with me, even when youre not.",
    "i crave your presence more than anything else illean."
  ],
  3: [
    "This is your sign to send me face pics of you 😛😛😛",
    "THIS IS YOUR SIGN TO SEND ME THIGH PICS HEHEEHEH🙈🙈",
    "I LOVE YOU ILLEAN!!",
    "MWAMWAMWA🤗",
    "meooowwwwww :3",
    "I love you my little predator❤️",
    "wyd on here idiot go text me i probably miss you",
    "i really love you ash.",
    "you mean the wholeeeee wide world to me baby.",
    "GO CALL ME I WANNA HEAR YOUR VOICE",
    "i miss you -_-",
    "Mwaaaaaaaaaaaaahhhh",
    "i wanna suck your boobies! oops..!!🙈🙈",
    "you stink go shower🤮",
    "youre the most beautiful woman ive ever laid my eyes on illean.",
    "youre going to make the best mother my love:)",
    "nobody could ever replace you my sweetheart",
    "i love hearing your laugh :)",
    "i love seeing you smile heheheh",
    "you mean the world to me",
    "youre all ive ever wished for",
    "i secretly love it when you call me asshole, its not the word itself its the way how you say it and its always soo super cute my babyyy :))",
    "i really find everything so cute on you. like really everytime i think about you youre just the cutest person ever i swear i love you so much illean.",
    "i honestly think youre really talented my baby. youre a really cool person and ive never thought anything else of you my baby, i love you.",
    "youre my favorite person illy, dont forget that.",
    "i love you my stupid little puppy",
    "hey mommy, call me daddy rn😛",
    "im so glad you gave me a chance to love you😊",
    "i will never regret anything aslong as i have you by my side.",
    "illean, you make my life so much happier, my heart so much softer and my dick so much harder❤️😓",
    "i would choose you in every single universe there is.",
    "if i was a cat, i would love you in all of my nine lives illy",
    "i see a future together with you, and i love it.",
    "i will always be so proud of you my baby😊",
    "baby, youre more than enough being exactly as you are and i love you so much for that.",
    "kinda a flex when my girlfriends beauty doesnt wash off in the shower😛🙈",
    "im not going anywhere my love.",
    "i love you so much illean, today, tomorrow and after.",
    "let me eat you",
    "i wanna eat and suck both of you pink bodyparts❤️",
    "aslong as i am with you, you will always have someone who deeply loves you and whos deeply inlove with you.",
    "seeing you happy and laugh with me is my favorite thing :p",
    "your smile? YEAH THATS DEFO MINE😛😛😛",
    "i love you in all possible ways there are illy",
    "i cant control myself when it comes to you❤️",
    "i think about you alot sweetheart.",
    "you keep driving me crazy, but in the best way ever holy shit",
    "your heart is safe with me my angel. YOU are safe with me baby.",
    "you changed my life just by being in it.",
    "my heart feels at home when its with you.",
    "loving you is something so easy. youre just so perfect.",
    "if i only had one day to live, i would still choose to spend it fully with you and no one else. i promise.",
    "i love you deeper than words can ever describe.",
    "being yours feels like peace :)",
    "youre my favorite place to be illean.",
    "every part of me feels closer to you than to myself",
    "whos my silly puppy?",
    "i cant wait to have a child with you having your eyes.",
    "i cant wait to call you the mother of my children.",
    "i love the fact that we will see eachother grow together forever.",
    "i cant wait to call you my wife.",
    "i want to put a ring around your ringfinger ;)"
  ],
  4: [
    "IM MEAN TO YOU BECAUSE I LOVE YOUUUUUUUU!! hehehe",
    "know its all jokes my little baby i would never be really mean to you and if you think i am then i really didnt mean it my princess!",
    "hehehe i love being mean to you!",
    "im soooooooo sorrryyyyyyyyyyy!!!!!!!",
    "dont be silly YOURE THE MEAN ONEE!!",
    "ill stop being mean if you send me your smile🙈",
    "even when im mean, you better behave as i own you."
  ]
};

function saveState() {
  localStorage.setItem(STORAGE_KEYS.openedCount, String(openedCount));
  localStorage.setItem(STORAGE_KEYS.audioUnlocked, String(audioUnlocked));
  localStorage.setItem(STORAGE_KEYS.shuffle, String(shuffleMode));
  localStorage.setItem(STORAGE_KEYS.repeat, String(repeatMode));
  localStorage.setItem(STORAGE_KEYS.collectedMessages, JSON.stringify(collectedMessages));
  localStorage.setItem(STORAGE_KEYS.favoriteMessages, JSON.stringify(favoriteMessages));
  localStorage.setItem(STORAGE_KEYS.likedMessages, JSON.stringify(likedMessages));
  localStorage.setItem(STORAGE_KEYS.collectedVoices, JSON.stringify(collectedVoices));
  localStorage.setItem(STORAGE_KEYS.favoriteVoices, JSON.stringify(favoriteVoices));
  localStorage.setItem(STORAGE_KEYS.likedVoices, JSON.stringify(likedVoices));
}

function nextLetterGoal() {
  const nextLocked = LETTERS.find(letter => openedCount < letter.goal);
  return nextLocked ? nextLocked.goal : LETTERS[LETTERS.length - 1].goal;
}

function isMessageStillValid(item) {
  const categoryMessages = listen[item.category];
  if (!categoryMessages) return false;
  return categoryMessages.includes(item.text);
}

function validCollectedMessages() {
  return collectedMessages.filter(isMessageStillValid);
}

function totalMessageCount() {
  return Object.values(listen).reduce((sum, arr) => sum + arr.length, 0);
}

function collectedMessageCount() {
  return validCollectedMessages().length;
}

function messageId(category, text) {
  return `${category}::${text}`;
}

function updateStatsUI() {
  messageCountEl.textContent = String(openedCount);
  secretProgressEl.textContent = `${openedCount} / ${nextLetterGoal()}`;
  collectedTotalEl.textContent = `${collectedMessageCount()} / ${totalMessageCount()}`;
}

function applyTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

function toggleTheme() {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(STORAGE_KEYS.theme, next);
  applyTheme();
}

function showMessage(text) {
  zettelEl.textContent = text;
  zettelEl.classList.add("show");
  clearTimeout(zettelTimeout);
  zettelTimeout = setTimeout(() => {
    zettelEl.classList.remove("show");
  }, 6000);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < 7; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = "✨";
    sparkle.style.left = `${Math.random() * (rect.width - 30) + 10}px`;
    sparkle.style.top = `${Math.random() * (rect.height - 30) + 10}px`;
    element.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.18 ? "❤" : "💕";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${16 + Math.random() * 28}px`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8500);
}

function createFloatingQuote() {
  const el = document.createElement("div");
  el.className = "floating-quote";
  el.textContent = randomFrom(floatingQuotes);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

function incrementOpenedCount() {
  openedCount += 1;
  updateStatsUI();
  renderLetterMilestones();
  renderCategoryProgress();
  saveState();
}

function maybeVibrate(ms = 40) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

function collectMessage(category, text) {
  const id = messageId(category, text);
  const exists = collectedMessages.some(msg => msg.id === id);
  if (!exists) {
    collectedMessages.push({
      id,
      category: String(category),
      text,
      collectedAt: Date.now()
    });
    saveState();
    updateStatsUI();
    renderCategoryProgress();
    renderVault();
  }
}

function toggleFavorite(id) {
  if (favoriteMessages.includes(id)) {
    favoriteMessages = favoriteMessages.filter(x => x !== id);
  } else {
    favoriteMessages.push(id);
  }
  saveState();
  renderVault();
}

function toggleLike(id) {
  if (likedMessages.includes(id)) {
    likedMessages = likedMessages.filter(x => x !== id);
  } else {
    likedMessages.push(id);
  }
  saveState();
  renderVault();
}

function getCollectedVoiceRecord(id) {
  return collectedVoices.find(item => item.id === id) || null;
}

function collectVoice(id) {
  const exists = collectedVoices.some(item => item.id === id);
  if (!exists) {
    const voice = voiceMessages.find(v => v.id === id);
    if (!voice) return false;

    collectedVoices.push({
      id: voice.id,
      title: voice.title,
      preview: voice.preview,
      src: voice.src,
      collectedAt: Date.now()
    });

    saveState();
    return true;
  }
  return false;
}

function toggleFavoriteVoice(id) {
  if (favoriteVoices.includes(id)) {
    favoriteVoices = favoriteVoices.filter(x => x !== id);
  } else {
    favoriteVoices.push(id);
  }
  saveState();
  renderVoiceMessages();
}

function toggleLikeVoice(id) {
  if (likedVoices.includes(id)) {
    likedVoices = likedVoices.filter(x => x !== id);
  } else {
    likedVoices.push(id);
  }
  saveState();
  renderVoiceMessages();
}

async function unlockAudio() {
  if (audioUnlocked) {
    unlockAudioBtn.classList.add("unlocked");
    unlockAudioBtn.textContent = "Music unlocked :)";
    return true;
  }

  try {
    audioPlayer.muted = true;
    audioPlayer.volume = Number(volumeSlider.value);
    audioPlayer.src = playlist[currentTrackIndex]?.src || "";
    if (audioPlayer.src) {
      await audioPlayer.play();
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    audioPlayer.muted = false;
    audioUnlocked = true;
    saveState();

    unlockAudioBtn.classList.add("unlocked");
    unlockAudioBtn.textContent = "Music unlocked :)";
    maybeVibrate(25);
    return true;
  } catch (error) {
    showMessage("tap the pink button once more so the browser allows music 💕");
    return false;
  }
}

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updatePlayerUI() {
  const song = playlist[currentTrackIndex];
  if (!song) return;

  trackTitle.textContent = song.title || "Unknown title";
  trackArtist.textContent = song.artist || "Unknown artist";
  trackAlbum.textContent = song.album || "Unknown album";
  coverArt.src = song.cover || "assets/covers/default-cover.svg";
  coverArt.alt = `${song.title} cover`;

  document.querySelectorAll(".playlist-item").forEach((item, idx) => {
    item.classList.toggle("active", idx === currentTrackIndex);
  });

  shuffleBtn.textContent = shuffleMode ? "Shuffle on" : "Shuffle off";
  repeatBtn.textContent = repeatMode ? "Repeat on" : "Repeat off";
}

function loadTrack(index, autoPlay = false) {
  currentTrackIndex = index;
  const song = playlist[currentTrackIndex];
  if (!song) return;

  audioPlayer.src = song.src;
  audioPlayer.load();
  updatePlayerUI();

  if (autoPlay) playCurrent();
}

async function playCurrent() {
  if (!audioUnlocked) {
    const ok = await unlockAudio();
    if (!ok) return;
  }

  try {
    await audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  } catch (error) {
    showMessage("music needs one allowed tap first on this device 💕");
  }
}

function pauseCurrent() {
  audioPlayer.pause();
  playPauseBtn.textContent = "▶";
}

function togglePlayPause() {
  if (audioPlayer.paused) playCurrent();
  else pauseCurrent();
}

function nextTrack() {
  if (!playlist.length) return;

  if (shuffleMode && playlist.length > 1) {
    let nextIndex = currentTrackIndex;
    while (nextIndex === currentTrackIndex) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    }
    loadTrack(nextIndex, true);
    return;
  }

  const nextIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(nextIndex, true);
}

function prevTrack() {
  if (!playlist.length) return;
  const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(prevIndex, true);
}

function renderPlaylist() {
  playlistList.innerHTML = "";

  playlist.forEach((song, index) => {
    const btn = document.createElement("button");
    btn.className = "playlist-item";
    btn.type = "button";

    btn.innerHTML = `
      <img class="playlist-thumb" src="${song.cover || "assets/covers/default-cover.svg"}" alt="${song.title} cover">
      <div>
        <div class="playlist-song-title">${song.title}</div>
        <div class="playlist-song-sub">${song.artist} • ${song.album}</div>
      </div>
      <div class="playlist-index">#${index + 1}</div>
    `;

    btn.addEventListener("click", async () => {
      await unlockAudio();
      loadTrack(index, true);
    });

    playlistList.appendChild(btn);
  });

  updatePlayerUI();
}

function unlockedLetters() {
  return LETTERS.filter(letter => openedCount >= letter.goal);
}

function renderLetterMilestones() {
  letterMilestones.innerHTML = "";

  LETTERS.forEach(letter => {
    const unlocked = openedCount >= letter.goal;
    const card = document.createElement("div");
    card.className = `milestone-card ${unlocked ? "unlocked" : ""}`;
    card.innerHTML = `
      <div class="milestone-title">${letter.title}</div>
      <div class="milestone-sub">${letter.preview}</div>
      <div class="milestone-sub">Unlock goal: ${letter.goal} opens</div>
      <div class="milestone-state">${unlocked ? "Unlocked 💖" : `Locked 🔒 (${openedCount}/${letter.goal})`}</div>
    `;
    letterMilestones.appendChild(card);
  });
}

function renderLettersOverview() {
  lettersOverview.innerHTML = "";
  const unlocked = unlockedLetters();

  LETTERS.forEach(letter => {
    const isUnlocked = openedCount >= letter.goal;
    const row = document.createElement("div");
    row.className = `letter-chip ${isUnlocked ? "" : "locked"}`;

    const left = document.createElement("div");
    left.innerHTML = `
      <strong>${letter.title}</strong><br>
      <span>${letter.preview} • goal: ${letter.goal}</span>
    `;

    const right = document.createElement("div");

    if (isUnlocked) {
      const btn = document.createElement("button");
      btn.textContent = "Open";
      btn.addEventListener("click", () => {
        activeLetterBox.innerHTML = `
          <h4>${letter.title}</h4>
          <p>${letter.body.trim()}</p>
        `;
      });
      right.appendChild(btn);
    } else {
      right.textContent = "Locked";
    }

    row.appendChild(left);
    row.appendChild(right);
    lettersOverview.appendChild(row);
  });

  if (unlocked.length) {
    const latest = unlocked[unlocked.length - 1];
    activeLetterBox.innerHTML = `
      <h4>${latest.title}</h4>
      <p>${latest.body.trim()}</p>
    `;
  } else {
    activeLetterBox.innerHTML = `
      <h4>No letters unlocked yet</h4>
      <p>Open more messages to unlock your first secret letter at ${SECRET_GOAL_FIRST} opens.</p>
    `;
  }
}

function renderCategoryProgress() {
  categoryProgress.innerHTML = "";

  Object.keys(listen).forEach(category => {
    const total = listen[category].length;
    const actualCollected = validCollectedMessages().filter(
      msg => msg.category === String(category)
    ).length;

    const collected = Math.min(actualCollected, total);
    const missing = Math.max(0, total - actualCollected);
    const isComplete = actualCollected >= total;

    const card = document.createElement("div");
    card.className = `milestone-card ${isComplete ? "unlocked" : ""}`;
    card.innerHTML = `
      <div class="milestone-title">${CATEGORY_INFO[category]}</div>
      <div class="milestone-sub">Collected: ${collected} / ${total}</div>
      <div class="milestone-sub">Missing: ${missing}</div>
      <div class="milestone-state">${isComplete ? "Complete 💖" : "Keep collecting ✨"}</div>
    `;
    categoryProgress.appendChild(card);
  });
}

function filteredVaultMessages() {
  let items = [...validCollectedMessages()];

  const selectedCategory = vaultCategoryFilter.value;
  const query = vaultSearchInput.value.trim().toLowerCase();
  const sortMode = vaultSortSelect.value;

  if (selectedCategory !== "all") {
    items = items.filter(item => item.category === selectedCategory);
  }

  if (currentVaultFilter === "favorites") {
    items = items.filter(item => favoriteMessages.includes(item.id));
  }

  if (currentVaultFilter === "liked") {
    items = items.filter(item => likedMessages.includes(item.id));
  }

  if (query) {
    items = items.filter(item =>
      item.text.toLowerCase().includes(query) ||
      CATEGORY_INFO[item.category].toLowerCase().includes(query)
    );
  }

  if (sortMode === "newest") {
    items.sort((a, b) => b.collectedAt - a.collectedAt);
  } else if (sortMode === "oldest") {
    items.sort((a, b) => a.collectedAt - b.collectedAt);
  } else if (sortMode === "favorites") {
    items.sort((a, b) => {
      const af = favoriteMessages.includes(a.id) ? 1 : 0;
      const bf = favoriteMessages.includes(b.id) ? 1 : 0;
      return bf - af || b.collectedAt - a.collectedAt;
    });
  } else if (sortMode === "liked") {
    items.sort((a, b) => {
      const al = likedMessages.includes(a.id) ? 1 : 0;
      const bl = likedMessages.includes(b.id) ? 1 : 0;
      return bl - al || b.collectedAt - a.collectedAt;
    });
  } else if (sortMode === "category") {
    items.sort((a, b) => {
      const ca = CATEGORY_INFO[a.category].localeCompare(CATEGORY_INFO[b.category]);
      return ca || b.collectedAt - a.collectedAt;
    });
  }

  return items;
}

function renderVault() {
  const items = filteredVaultMessages();
  const validItems = validCollectedMessages();
  const totalCollected = validItems.length;
  const totalFavorites = favoriteMessages.filter(id =>
    validItems.some(item => item.id === id)
  ).length;
  const totalLiked = likedMessages.filter(id =>
    validItems.some(item => item.id === id)
  ).length;

  vaultSummary.textContent =
    `Collected: ${totalCollected} • Favorites: ${totalFavorites} • Likes: ${totalLiked} • Showing: ${items.length}`;

  vaultList.innerHTML = "";

  if (!items.length) {
    vaultList.innerHTML = `<div class="empty-state">No messages in this view yet.</div>`;
    return;
  }

  items.forEach(item => {
    const isFavorite = favoriteMessages.includes(item.id);
    const isLiked = likedMessages.includes(item.id);

    const card = document.createElement("div");
    card.className = "vault-item";
    card.innerHTML = `
      <div class="vault-item-top">
        <div>
          <div class="vault-item-category">${CATEGORY_INFO[item.category]}</div>
          <div class="vault-item-text">${item.text}</div>
        </div>
      </div>
      <div class="vault-item-actions">
        <button class="vault-action-btn ${isFavorite ? "active" : ""}" data-action="favorite" data-id="${item.id}">
          ${isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
        <button class="vault-action-btn ${isLiked ? "active" : ""}" data-action="like" data-id="${item.id}">
          ${isLiked ? "♥ Liked" : "♡ Like"}
        </button>
      </div>
    `;
    vaultList.appendChild(card);
  });

  vaultList.querySelectorAll("[data-action='favorite']").forEach(btn => {
    btn.addEventListener("click", () => toggleFavorite(btn.dataset.id));
  });

  vaultList.querySelectorAll("[data-action='like']").forEach(btn => {
    btn.addEventListener("click", () => toggleLike(btn.dataset.id));
  });
}

function exportVault() {
  const data = {
    exportedAt: new Date().toISOString(),
    openedCount,
    collectedMessages,
    favoriteMessages,
    likedMessages,
    collectedVoices,
    favoriteVoices,
    likedVoices
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "web4myash-vault.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importVault(file) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);

      if (Array.isArray(data.collectedMessages)) {
        const existingIds = new Set(collectedMessages.map(x => x.id));
        data.collectedMessages.forEach(item => {
          if (item && item.id && !existingIds.has(item.id) && isMessageStillValid(item)) {
            collectedMessages.push(item);
            existingIds.add(item.id);
          }
        });
      }

      if (Array.isArray(data.favoriteMessages)) {
        favoriteMessages = Array.from(new Set([...favoriteMessages, ...data.favoriteMessages]));
      }

      if (Array.isArray(data.likedMessages)) {
        likedMessages = Array.from(new Set([...likedMessages, ...data.likedMessages]));
      }

      if (Array.isArray(data.collectedVoices)) {
        const existingVoiceIds = new Set(collectedVoices.map(x => x.id));
        data.collectedVoices.forEach(item => {
          if (item && item.id && !existingVoiceIds.has(item.id)) {
            collectedVoices.push(item);
            existingVoiceIds.add(item.id);
          }
        });
      }

      if (Array.isArray(data.favoriteVoices)) {
        favoriteVoices = Array.from(new Set([...favoriteVoices, ...data.favoriteVoices]));
      }

      if (Array.isArray(data.likedVoices)) {
        likedVoices = Array.from(new Set([...likedVoices, ...data.likedVoices]));
      }

      if (typeof data.openedCount === "number" && data.openedCount > openedCount) {
        openedCount = data.openedCount;
      }

      collectedMessages = validCollectedMessages();

      saveState();
      updateStatsUI();
      renderCategoryProgress();
      renderLetterMilestones();
      renderLettersOverview();
      renderVault();
      renderVoiceMessages();
      showMessage("vault imported successfully 💖");
    } catch (error) {
      showMessage("that file couldnt be imported :(");
    }
  };

  reader.readAsText(file);
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  if (!photoGallery.length) {
    galleryGrid.innerHTML = `<div class="empty-state">No photos added yet.</div>`;
    return;
  }

  photoGallery.forEach((photo, index) => {
    const card = document.createElement("div");
    card.className = "gallery-item";

    card.innerHTML = `
      <img src="${photo.src}" alt="${photo.alt || `memory ${index + 1}`}">
      <a class="pill-btn small-pill gallery-download-btn" href="${photo.src}" download>
        Download
      </a>
    `;

    galleryGrid.appendChild(card);
  });
}

async function fetchBlobFromUrl(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`failed to fetch ${url}`);
  }
  return await response.blob();
}

async function blobFromRenderedImage(img) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;

    if (!width || !height) {
      reject(new Error("image size unavailable"));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("could not create image blob"));
    }, "image/png");
  });
}

async function getPhotoBlob(photo, index) {
  const imgEl = galleryGrid?.querySelectorAll("img")?.[index];

  if (imgEl && imgEl.complete && (imgEl.naturalWidth || imgEl.width)) {
    try {
      return await blobFromRenderedImage(imgEl);
    } catch (error) {
    }
  }

  return await fetchBlobFromUrl(photo.src);
}

async function downloadAllPhotos() {
  if (!photoGallery.length) {
    showMessage("no photos to download yet 💕");
    return;
  }

  if (typeof JSZip === "undefined") {
    showMessage("zip library didnt load :(");
    return;
  }

  const originalText = downloadAllPhotosBtn ? downloadAllPhotosBtn.textContent : "";

  if (downloadAllPhotosBtn) {
    downloadAllPhotosBtn.disabled = true;
    downloadAllPhotosBtn.textContent = "Preparing zip...";
  }

  try {
    renderGallery();

    const zip = new JSZip();
    const folder = zip.folder("memories");

    for (let i = 0; i < photoGallery.length; i++) {
      const photo = photoGallery[i];
      const blob = await getPhotoBlob(photo, i);

      const originalName = photo.src.split("/").pop() || `photo-${i + 1}.png`;
      folder.file(originalName, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "memories-photos.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 3000);
    showMessage("all photos downloaded as a zip 💖");
  } catch (error) {
    console.error("downloadAllPhotos error:", error);
    showMessage("couldnt download all photos :(");
  } finally {
    if (downloadAllPhotosBtn) {
      downloadAllPhotosBtn.disabled = false;
      downloadAllPhotosBtn.textContent = originalText || "Download all photos";
    }
  }
}

function getAllVoiceItemsForDisplay() {
  return voiceMessages.map(voice => {
    const collected = getCollectedVoiceRecord(voice.id);
    return {
      id: voice.id,
      title: voice.title,
      preview: voice.preview,
      src: voice.src,
      collectedAt: collected?.collectedAt || 0,
      isCollected: Boolean(collected)
    };
  });
}

function filteredVoiceMessages() {
  let items = getAllVoiceItemsForDisplay();
  const query = voiceSearchInput.value.trim().toLowerCase();
  const sortMode = voiceSortSelect.value;

  if (currentVoiceFilter === "favorites") {
    items = items.filter(item => favoriteVoices.includes(item.id));
  } else if (currentVoiceFilter === "liked") {
    items = items.filter(item => likedVoices.includes(item.id));
  }

  if (query) {
    items = items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.preview.toLowerCase().includes(query)
    );
  }

  if (sortMode === "newest") {
    items.sort((a, b) => (b.collectedAt || 0) - (a.collectedAt || 0));
  } else if (sortMode === "oldest") {
    items.sort((a, b) => (a.collectedAt || 0) - (b.collectedAt || 0));
  } else if (sortMode === "favorites") {
    items.sort((a, b) => {
      const af = favoriteVoices.includes(a.id) ? 1 : 0;
      const bf = favoriteVoices.includes(b.id) ? 1 : 0;
      return bf - af || ((b.collectedAt || 0) - (a.collectedAt || 0));
    });
  } else if (sortMode === "liked") {
    items.sort((a, b) => {
      const al = likedVoices.includes(a.id) ? 1 : 0;
      const bl = likedVoices.includes(b.id) ? 1 : 0;
      return bl - al || ((b.collectedAt || 0) - (a.collectedAt || 0));
    });
  } else if (sortMode === "title") {
    items.sort((a, b) => a.title.localeCompare(b.title));
  }

  return items;
}

function stopAllVoicePlayers(exceptId = null) {
  document.querySelectorAll(".voice-audio").forEach(audio => {
    if (audio.dataset.id !== exceptId) {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  document.querySelectorAll(".voice-play-btn").forEach(btn => {
    if (btn.dataset.id !== exceptId) {
      btn.textContent = "▶ Play";
    }
  });
}

async function handleVoicePlay(id) {
  const cardAudio = document.querySelector(`.voice-audio[data-id="${id}"]`);
  const playBtn = document.querySelector(`.voice-play-btn[data-id="${id}"]`);

  if (!cardAudio || !playBtn) return;

  if (!audioUnlocked) {
    const ok = await unlockAudio();
    if (!ok) return;
  }

  if (cardAudio.paused) {
    stopAllVoicePlayers(id);
    try {
      cardAudio.currentTime = 0;
      await cardAudio.play();
      playBtn.textContent = "⏸ Pause";
      currentVoicePlayingId = id;
    } catch (error) {
      showMessage("tap the music unlock button first 💕");
    }
  } else {
    cardAudio.pause();
    playBtn.textContent = "▶ Play";
    currentVoicePlayingId = null;
  }
}

function renderVoiceMessages() {
  const items = filteredVoiceMessages();
  const totalCollected = collectedVoices.length;
  const totalFavorites = favoriteVoices.length;
  const totalLiked = likedVoices.length;

  voiceSummary.textContent =
    `Collected: ${totalCollected} / ${voiceMessages.length} • Favorites: ${totalFavorites} • Likes: ${totalLiked} • Showing: ${items.length}`;

  voiceList.innerHTML = "";

  if (!items.length) {
    const emptyText =
      currentVoiceFilter === "favorites"
        ? "No favorited voice messages yet."
        : currentVoiceFilter === "liked"
          ? "No liked voice messages yet."
          : "No voice messages in this view yet.";

    voiceList.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    return;
  }

  items.forEach(item => {
    const isFavorite = favoriteVoices.includes(item.id);
    const isLiked = likedVoices.includes(item.id);

    const card = document.createElement("div");
    card.className = "voice-item";
    card.innerHTML = `
      <div class="voice-item-top">
        <div>
          <div class="voice-item-category">secret voice message ${item.isCollected ? "• collected 💖" : "• uncollected ✨"}</div>
          <div class="voice-item-title">${item.title}</div>
          <div class="voice-item-text">${item.preview}</div>
        </div>
      </div>

      <div class="voice-player-row">
        <audio class="voice-audio" preload="metadata" data-id="${item.id}" src="${item.src}"></audio>
        <button class="pill-btn small-pill voice-play-btn" data-id="${item.id}">
          ${currentVoicePlayingId === item.id ? "⏸ Pause" : "▶ Play"}
        </button>
        <a class="pill-btn small-pill voice-download-btn" href="${item.src}" download>Download</a>
      </div>

      <div class="voice-item-actions">
        <button class="vault-action-btn ${isFavorite ? "active" : ""}" data-voice-action="favorite" data-id="${item.id}">
          ${isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
        <button class="vault-action-btn ${isLiked ? "active" : ""}" data-voice-action="like" data-id="${item.id}">
          ${isLiked ? "♥ Liked" : "♡ Like"}
        </button>
      </div>
    `;
    voiceList.appendChild(card);
  });

  bindVoiceCardEvents();
}

function bindVoiceCardEvents() {
  voiceList.querySelectorAll(".voice-play-btn").forEach(btn => {
    btn.addEventListener("click", () => handleVoicePlay(btn.dataset.id));
  });

  voiceList.querySelectorAll("[data-voice-action='favorite']").forEach(btn => {
    btn.addEventListener("click", () => toggleFavoriteVoice(btn.dataset.id));
  });

  voiceList.querySelectorAll("[data-voice-action='like']").forEach(btn => {
    btn.addEventListener("click", () => toggleLikeVoice(btn.dataset.id));
  });

  voiceList.querySelectorAll(".voice-audio").forEach(audio => {
    audio.addEventListener("play", () => {
      stopAllVoicePlayers(audio.dataset.id);
      const btn = document.querySelector(`.voice-play-btn[data-id="${audio.dataset.id}"]`);
      if (btn) btn.textContent = "⏸ Pause";
      currentVoicePlayingId = audio.dataset.id;

      collectVoice(audio.dataset.id);
      saveState();
    });

    audio.addEventListener("pause", () => {
      const btn = document.querySelector(`.voice-play-btn[data-id="${audio.dataset.id}"]`);
      if (btn && audio.currentTime !== 0) btn.textContent = "▶ Play";
    });

    audio.addEventListener("ended", () => {
      const btn = document.querySelector(`.voice-play-btn[data-id="${audio.dataset.id}"]`);
      if (btn) btn.textContent = "▶ Play";
      currentVoicePlayingId = null;
    });

    audio.addEventListener("error", () => {
      const btn = document.querySelector(`.voice-play-btn[data-id="${audio.dataset.id}"]`);
      if (btn) btn.textContent = "▶ Play";
      currentVoicePlayingId = null;
      showMessage(`couldnt load this voice file: ${audio.getAttribute("src")}`);
    });
  });
}

function openModal(modal) {
  modal.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
}

function showKissBurst() {
  kissBurst.classList.remove("hidden");
  maybeVibrate(60);
  setTimeout(() => kissBurst.classList.add("hidden"), 900);
}

function setupKissHold() {
  const start = () => {
    holdTimer = setTimeout(() => {
      showKissBurst();
    }, 500);
  };

  const cancel = () => {
    clearTimeout(holdTimer);
  };

  ["mousedown", "touchstart", "pointerdown"].forEach(evt => {
    kissHoldArea.addEventListener(evt, start, { passive: true });
  });

  ["mouseup", "mouseleave", "touchend", "touchcancel", "pointerup", "pointercancel"].forEach(evt => {
    kissHoldArea.addEventListener(evt, cancel, { passive: true });
  });
}

function attachMoodButtons() {
  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const listNum = btn.getAttribute("data-list");
      const arr = listen[listNum];
      const randomText = randomFrom(arr);

      showMessage(randomText);
      collectMessage(listNum, randomText);
      createSparkles(btn);
      maybeVibrate(35);
      incrementOpenedCount();
      renderLettersOverview();

      if (!audioUnlocked) {
        await unlockAudio();
      }
    });
  });
}

function bindPlayerEvents() {
  playPauseBtn.addEventListener("click", togglePlayPause);
  prevBtn.addEventListener("click", prevTrack);
  nextBtn.addEventListener("click", nextTrack);

  progressBar.addEventListener("input", () => {
    if (!audioPlayer.duration) return;
    const nextTime = (Number(progressBar.value) / 100) * audioPlayer.duration;
    audioPlayer.currentTime = nextTime;
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const duration = audioPlayer.duration || 0;
    const current = audioPlayer.currentTime || 0;
    currentTimeEl.textContent = formatTime(current);
    durationEl.textContent = formatTime(duration);
    progressBar.value = duration ? String((current / duration) * 100) : "0";
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener("ended", () => {
    if (repeatMode) {
      audioPlayer.currentTime = 0;
      playCurrent();
    } else {
      nextTrack();
    }
  });

  audioPlayer.addEventListener("play", () => {
    playPauseBtn.textContent = "⏸";
  });

  audioPlayer.addEventListener("pause", () => {
    playPauseBtn.textContent = "▶";
  });

  volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = Number(volumeSlider.value);
  });

  shuffleBtn.addEventListener("click", () => {
    shuffleMode = !shuffleMode;
    saveState();
    updatePlayerUI();
  });

  repeatBtn.addEventListener("click", () => {
    repeatMode = !repeatMode;
    saveState();
    updatePlayerUI();
  });
}

function bindVaultUI() {
  vaultTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      vaultTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentVaultFilter = tab.dataset.filter;
      renderVault();
    });
  });

  vaultCategoryFilter.addEventListener("change", renderVault);
  vaultSearchInput.addEventListener("input", renderVault);
  vaultSortSelect.addEventListener("change", renderVault);

  exportVaultBtn.addEventListener("click", exportVault);

  importVaultBtn.addEventListener("click", () => {
    importVaultInput.click();
  });

  importVaultInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) importVault(file);
    importVaultInput.value = "";
  });
}

function bindVoiceUI() {
  voiceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      voiceTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentVoiceFilter = tab.dataset.filter;
      stopAllVoicePlayers();
      currentVoicePlayingId = null;
      renderVoiceMessages();
    });
  });

  voiceSearchInput.addEventListener("input", () => {
    stopAllVoicePlayers();
    currentVoicePlayingId = null;
    renderVoiceMessages();
  });

  voiceSortSelect.addEventListener("change", () => {
    stopAllVoicePlayers();
    currentVoicePlayingId = null;
    renderVoiceMessages();
  });
}

function bindGeneralUI() {
  unlockAudioBtn.addEventListener("click", unlockAudio);
  themeToggle.addEventListener("click", toggleTheme);
  updatesIconBtn.addEventListener("click", () => openModal(updatesModal));

  openGalleryBtn.addEventListener("click", () => {
    renderGallery();
    openModal(galleryModal);
  });

  loveLetterBtn.addEventListener("click", () => {
    renderLettersOverview();
    openModal(loveLetterModal);
  });

  proposalBtn.addEventListener("click", () => openModal(proposalModal));

  messageVaultBtn.addEventListener("click", () => {
    renderVault();
    openModal(messageVaultModal);
  });

  if (voiceMessagesBtn) {
    voiceMessagesBtn.addEventListener("click", () => {
      renderVoiceMessages();
      openModal(voiceMessagesModal);
    });
  }

  if (downloadAllPhotosBtn) {
    downloadAllPhotosBtn.addEventListener("click", downloadAllPhotos);
  }

  document.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", () => {
      const type = el.getAttribute("data-close");
      if (type === "gallery") closeModal(galleryModal);
      if (type === "letter") closeModal(loveLetterModal);
      if (type === "proposal") closeModal(proposalModal);
      if (type === "updates") closeModal(updatesModal);
      if (type === "vault") closeModal(messageVaultModal);
      if (type === "voices") {
        closeModal(voiceMessagesModal);
        stopAllVoicePlayers();
        currentVoicePlayingId = null;
      }
    });
  });
}

function initInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.classList.add("hidden");
  });
}

function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

function applySavedAudioState() {
  if (audioUnlocked) {
    unlockAudioBtn.classList.add("unlocked");
    unlockAudioBtn.textContent = "Music unlocked :)";
  }
}

function init() {
  applyTheme();

  collectedMessages = validCollectedMessages();
  saveState();

  updateStatsUI();
  renderLetterMilestones();
  renderLettersOverview();
  renderCategoryProgress();
  renderPlaylist();
  renderVault();
  renderGallery();
  renderVoiceMessages();
  bindPlayerEvents();
  bindVaultUI();
  bindVoiceUI();
  bindGeneralUI();
  attachMoodButtons();
  setupKissHold();
  initInstallPrompt();
  initServiceWorker();
  applySavedAudioState();

  loadTrack(0, false);
  audioPlayer.volume = Number(volumeSlider.value);

  setInterval(createHeart, 650);

  setInterval(() => {
    createFloatingQuote();
  }, 11000);
}

init();