"use strict";

const API_BASE = "https://my-everything-room.saer-zakkour.chatgpt.site";
const app = document.getElementById("app");
const privacyCover = document.getElementById("privacyCover");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const state = { session: null, tab: "chat", messages: [], stories: [], replyTo: null, timers: [], audio: null, audioUrl: null, mediaUrls: new Map() };

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const b64 = (bytes) => { let value = ""; const view = new Uint8Array(bytes); for (let i=0;i<view.length;i+=0x8000) value += String.fromCharCode(...view.subarray(i,i+0x8000)); return btoa(value); };
const unb64 = (value) => Uint8Array.from(atob(value.replaceAll("-","+").replaceAll("_","/")), c => c.charCodeAt(0));
const randomId = () => b64(crypto.getRandomValues(new Uint8Array(18))).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
const normalize = (answer,pin) => `${answer.trim().toLocaleLowerCase()}|${pin.replace(/\s/g,"")}`;

async function deriveKey(credential,salt,usage){
  const material = await crypto.subtle.importKey("raw",encoder.encode(`${usage}:${credential}`),"PBKDF2",false,["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:unb64(salt),iterations:310000},material,256);
  return new Uint8Array(bits);
}
async function aesKey(bytes,usages){ return crypto.subtle.importKey("raw",bytes,{name:"AES-GCM"},false,usages); }
async function encryptText(keyBytes,text){ const iv=crypto.getRandomValues(new Uint8Array(12)); const key=await aesKey(keyBytes,["encrypt"]); const data=await crypto.subtle.encrypt({name:"AES-GCM",iv},key,encoder.encode(text)); return {ciphertext:b64(data),iv:b64(iv)}; }
async function decryptText(keyBytes,ciphertext,iv){ const key=await aesKey(keyBytes,["decrypt"]); const data=await crypto.subtle.decrypt({name:"AES-GCM",iv:unb64(iv)},key,unb64(ciphertext)); return decoder.decode(data); }
async function decryptBytes(keyBytes,ciphertext,iv){ const key=await aesKey(keyBytes,["decrypt"]); return crypto.subtle.decrypt({name:"AES-GCM",iv:unb64(iv)},key,ciphertext); }
async function encryptBytes(keyBytes,bytes,iv){ const key=await aesKey(keyBytes,["encrypt"]); return crypto.subtle.encrypt({name:"AES-GCM",iv},key,bytes); }

async function api(path,init={},token){
  const response=await fetch(`${API_BASE}${path}`,{...init,cache:"no-store",headers:{...(init.headers||{}),...(token?{Authorization:`Bearer ${token}`}:{})}});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||"Something went wrong.");
  return data;
}
function clearTimers(){ state.timers.forEach(clearInterval); state.timers=[]; }
function stopAudio(){
  if(state.audio){state.audio.onpause=null;state.audio.onended=null;state.audio.pause();state.audio.removeAttribute("src");state.audio.load()}
  if(state.audioUrl) URL.revokeObjectURL(state.audioUrl); state.audio=null;state.audioUrl=null;
  if("mediaSession" in navigator){navigator.mediaSession.metadata=null;navigator.mediaSession.playbackState="none"}
}
function lock(){
  if(!state.session) return;
  state.mediaUrls.forEach(url=>URL.revokeObjectURL(url)); state.mediaUrls.clear();
  clearTimers(); state.session.roomKey.fill(0); state.session=null; state.messages=[];state.stories=[];state.replyTo=null;
  privacyCover.classList.add("show"); setTimeout(()=>{privacyCover.classList.remove("show");renderLogin()},0);
}
function strictPrivacy(){
  document.addEventListener("visibilitychange",()=>{if(state.session&&document.visibilityState!=="visible") lock()},true);
  window.addEventListener("pagehide",()=>{if(state.session) lock()},true);
  document.addEventListener("freeze",()=>{if(state.session) lock()},true);
}
function setError(message){ const box=document.getElementById("errorBox"); if(box){box.textContent=message;box.classList.remove("hidden")} }

async function boot(){
  strictPrivacy();
  try{const result=await api("/api/room/setup/status"); if(!result.configured) throw new Error("Our Room still needs its one-time setup on the private site."); renderLogin();}
  catch(error){app.innerHTML=`<section class="gate-card"><div class="lock-orbit">♡</div><h1>Our Room</h1><p class="gate-copy">${escapeHtml(error.message)}</p><a class="back-link" href="../">← back</a></section>`}
}
function renderLogin(){
  app.className="room-gate"; app.innerHTML=`<a class="back-link" href="../">← back to our little world</a><section class="gate-card"><div class="lock-orbit">♡</div><p class="eyebrow">private • encrypted • only ours</p><h1>Our Room</h1><p class="gate-copy">Who’s opening the door?</p><div class="identity-grid"><button data-id="ash"><span>🌸</span>Ash</button><button data-id="rex"><span>🖤</span>Rex</button></div><p id="errorBox" class="error-note hidden"></p><p class="privacy-note">Our Room locks the instant this page loses focus.</p></section>`;
  app.querySelectorAll("[data-id]").forEach(button=>button.addEventListener("click",()=>selectIdentity(button.dataset.id)));
}
async function selectIdentity(identity){
  try{
    const challenge=await api(`/api/room/challenge?identity=${identity}`);
    app.querySelector(".gate-card").innerHTML=`<div class="lock-orbit">♡</div><p class="eyebrow">private • encrypted • only ours</p><h1>Our Room</h1><form id="loginForm" class="login-form"><button type="button" id="chooseAgain" class="text-button">← choose again</button><p class="question">${escapeHtml(challenge.question)}</p><label>Your answer<input id="answer" type="password" autocomplete="off" required autofocus></label><label>Your private PIN<input id="pin" type="password" inputmode="numeric" autocomplete="off" minlength="6" required></label><p id="errorBox" class="error-note hidden"></p><button class="primary-button">Let me in ♡</button></form><p class="privacy-note">Our Room locks the instant this page loses focus.</p>`;
    document.getElementById("chooseAgain").onclick=renderLogin;
    document.getElementById("pin").oninput=(e)=>e.target.value=e.target.value.replace(/\D/g,"").slice(0,12);
    document.getElementById("loginForm").onsubmit=(event)=>login(event,identity,challenge);
  }catch(error){setError(error.message)}
}
async function login(event,identity,challenge){
  event.preventDefault(); const submit=event.currentTarget.querySelector("button[type=submit],button.primary-button"); submit.disabled=true;submit.textContent="Unlocking…";
  try{
    const credential=normalize(document.getElementById("answer").value,document.getElementById("pin").value);
    const verifier=b64(await deriveKey(credential,challenge.authSalt,"auth"));
    const result=await api("/api/room/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identity,verifier})});
    const wrapKey=await deriveKey(credential,challenge.wrapSalt,"wrap");
    const roomKey=new Uint8Array(await decryptBytes(wrapKey,unb64(result.wrappedRoomKey),result.wrapIv));
    document.getElementById("answer").value="";document.getElementById("pin").value="";
    state.session={token:result.token,identity:result.identity,displayName:result.displayName,roomKey}; renderRoom(); startPolling();
  }catch(error){setError(error.message);submit.disabled=false;submit.textContent="Let me in ♡"}
}
function renderRoom(){
  app.className="private-room"; app.innerHTML=`<header class="room-header"><div><p class="eyebrow">encrypted end-to-end</p><h1>Our Room <span>♡</span></h1></div><button id="lockNow" class="lock-button">Lock now 🔒</button></header><nav class="room-tabs"><button data-tab="chat" class="${state.tab==="chat"?"active":""}">Messages</button><button data-tab="stories" class="${state.tab==="stories"?"active":""}">Goodnight stories</button></nav><div id="roomBody"></div>`;
  document.getElementById("lockNow").onclick=lock; app.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;renderRoomBody();app.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x.dataset.tab===state.tab))}); renderRoomBody();
}
function renderRoomBody(){ state.tab==="chat"?renderChat():renderStories(); }
function renderChat(){
  const body=document.getElementById("roomBody"); body.className="chat-shell";
  body.innerHTML=`<div id="messageList" class="message-list"></div><form id="composer" class="composer"><p id="typing" class="typing hidden">the other heart is typing…</p><div id="replyPreview"></div><div class="composer-row"><label class="attach-button" title="Send a photo or video">＋<input id="attachmentInput" type="file" accept="image/*,video/*" data-safe-picker="true" hidden></label><textarea id="draft" placeholder="write something only they can read…" rows="1" maxlength="4000"></textarea><button class="send-button" aria-label="Send">➤</button></div><p id="uploadStatus" class="upload-status hidden"></p><p id="errorBox" class="error-note hidden"></p></form>`;
  document.getElementById("composer").onsubmit=sendMessage; document.getElementById("draft").oninput=typingPing; document.getElementById("attachmentInput").onchange=sendAttachment; paintMessages();
}
function paintMessages(){
  const list=document.getElementById("messageList");if(!list)return;
  if(!state.messages.length){list.innerHTML='<div class="empty-room"><span>♡</span><h2>Your first message can live here forever.</h2><p>Only the two keys to this room can read it.</p></div>';return}
  list.innerHTML=state.messages.map(m=>{const media=m.attachment;const loaded=media&&state.mediaUrls.get(media.attachmentId);const mediaHtml=media?`<div class="encrypted-media">${loaded?(media.mimeType.startsWith("image/")?`<img src="${loaded}" alt="${escapeHtml(media.name)}">`:`<video src="${loaded}" controls playsinline></video>`):`<button data-open-media="${media.attachmentId}">${media.mimeType.startsWith("image/")?"🖼️ Open photo":"🎬 Open video"}</button>`}<small>${escapeHtml(media.name)} • ${Math.max(1,Math.round(media.size/1024/1024))} MB • encrypted</small></div>`:"";return `<article class="message ${m.senderId===state.session.identity?"mine":"theirs"}" data-message="${m.id}">${m.replyTo?'<p class="reply-label">↩ replied to a message</p>':""}${mediaHtml}${m.text?`<p>${escapeHtml(m.text)}</p>`:""}<time>${new Date(m.createdAt).toLocaleString([],{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"short"})}</time><div class="message-actions"><button data-reply="${m.id}">Reply</button>${["❤️","🥺","😘","😂","🫶"].map(e=>`<button data-react="${m.id}" data-emoji="${e}">${e}</button>`).join("")}<button data-hide="${m.id}">Delete for me</button></div>${m.reactions?.length?`<div class="reaction-row">${m.reactions.map(r=>r.emoji).join(" ")}</div>`:""}</article>`}).join("");
  list.querySelectorAll("[data-reply]").forEach(b=>b.onclick=()=>{state.replyTo=state.messages.find(m=>m.id===b.dataset.reply);paintReply()});
  list.querySelectorAll("[data-react]").forEach(b=>b.onclick=()=>react(b.dataset.react,b.dataset.emoji));
  list.querySelectorAll("[data-open-media]").forEach(b=>b.onclick=()=>openAttachment(b.dataset.openMedia));
  list.querySelectorAll("[data-hide]").forEach(b=>b.onclick=()=>hideMessage(b.dataset.hide)); list.scrollTop=list.scrollHeight;
}
function paintReply(){const box=document.getElementById("replyPreview");if(!box)return;const label=state.replyTo?.text||state.replyTo?.attachment?.name||"attachment";box.innerHTML=state.replyTo?`<div class="reply-preview"><span>Replying: ${escapeHtml(label.slice(0,80))}</span><button type="button">×</button></div>`:"";if(box.querySelector("button"))box.querySelector("button").onclick=()=>{state.replyTo=null;paintReply()}}
async function loadMessages(){
  try{
    const result=await api("/api/room/messages",{},state.session.token);
    const opened=await Promise.all(result.messages.map(async m=>{
      const clear=await decryptText(state.session.roomKey,m.ciphertext,m.iv);
      if(m.kind==="attachment"){
        try{return {...m,text:"",attachment:JSON.parse(clear)}}
        catch{return {...m,text:"Attachment could not be opened."}}
      }
      return {...m,text:clear};
    }));
    const signature=items=>items.map(m=>`${m.id}:${m.ciphertext}:${JSON.stringify(m.reactions||[])}`).join("|");
    const changed=signature(opened)!==signature(state.messages);
    state.messages=opened;
    if(changed)paintMessages();
  }catch(error){if(error.message==="locked")lock()}
}
async function sendMessage(event){event.preventDefault();const input=document.getElementById("draft"),text=input.value.trim();if(!text)return;input.value="";try{const encrypted=await encryptText(state.session.roomKey,text);await api("/api/room/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:randomId(),kind:"text",...encrypted,replyTo:state.replyTo?.id||null})},state.session.token);state.replyTo=null;paintReply();await loadMessages()}catch(error){setError(error.message)}}
async function sendAttachment(event){const input=event.currentTarget,file=input.files[0],status=document.getElementById("uploadStatus");input.value="";if(!file)return;if(!/^(image|video)\//.test(file.type)){setError("Choose a photo or video.");return}if(file.size>50*1024*1024){setError("Photos and videos must be smaller than 50 MB.");return}status.textContent="Encrypting and sending…";status.classList.remove("hidden");try{const attachmentId=randomId(),fileIv=crypto.getRandomValues(new Uint8Array(12));const encryptedFile=await encryptBytes(state.session.roomKey,await file.arrayBuffer(),fileIv);await api(`/api/room/attachments?${new URLSearchParams({id:attachmentId,fileIv:b64(fileIv)})}`,{method:"POST",headers:{"Content-Type":"application/octet-stream"},body:encryptedFile},state.session.token);const payload={attachmentId,name:file.name,mimeType:file.type,size:file.size,fileIv:b64(fileIv)};const encrypted=await encryptText(state.session.roomKey,JSON.stringify(payload));await api("/api/room/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:randomId(),kind:"attachment",...encrypted,replyTo:state.replyTo?.id||null})},state.session.token);state.replyTo=null;paintReply();await loadMessages()}catch(error){setError(error.message)}finally{status.classList.add("hidden")}}
async function openAttachment(id){const message=state.messages.find(m=>m.attachment?.attachmentId===id);if(!message)return;try{const response=await fetch(`${API_BASE}/api/room/attachments/${encodeURIComponent(id)}`,{headers:{Authorization:`Bearer ${state.session.token}`},cache:"no-store"});if(!response.ok)throw new Error("This attachment could not be opened.");const clear=await decryptBytes(state.session.roomKey,await response.arrayBuffer(),message.attachment.fileIv);const url=URL.createObjectURL(new Blob([clear],{type:message.attachment.mimeType}));state.mediaUrls.set(id,url);paintMessages()}catch(error){setError(error.message)}}
let lastTyping=0;function typingPing(){if(Date.now()-lastTyping>1800){lastTyping=Date.now();api("/api/room/typing",{method:"POST"},state.session.token).catch(()=>{})}}
async function react(id,emoji){await api(`/api/room/messages/${encodeURIComponent(id)}/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({emoji})},state.session.token);await loadMessages()}
async function hideMessage(id){await api(`/api/room/messages/${encodeURIComponent(id)}/hide`,{method:"POST"},state.session.token);state.messages=state.messages.filter(m=>m.id!==id);paintMessages()}

function renderStories(){
  const body=document.getElementById("roomBody");body.className="stories-shell";body.innerHTML=`<div class="stories-intro"><div><p class="eyebrow">for the nights that feel too quiet</p><h2>Goodnight Library</h2><p>Choose a voice, close your eyes, and let it keep playing. The room itself locks when the phone sleeps.</p></div><span class="moon">☾</span></div>${state.session.identity==="rex"?'<form id="storyUpload" class="story-upload"><label>Story title<input id="storyTitle" placeholder="The little star that found home" maxlength="120" required></label><label>Audio file<input id="storyFile" type="file" accept="audio/*" data-safe-picker="true" required></label><button class="primary-button">Add a story</button></form>':""}<div id="storyGrid" class="story-grid"></div><p id="errorBox" class="error-note hidden"></p>`;
  if(document.getElementById("storyUpload"))document.getElementById("storyUpload").onsubmit=uploadStory;paintStories();
}
function paintStories(){const grid=document.getElementById("storyGrid");if(!grid)return;grid.innerHTML=state.stories.length?state.stories.map(s=>`<article><div class="story-art">☾</div><div><h3>${escapeHtml(s.title)}</h3><p>${Math.max(1,Math.round(s.sizeBytes/1024/1024))} MB • encrypted</p></div><button data-play="${s.id}">Play softly</button></article>`).join(""):'<div class="empty-story"><span>🎙️</span><p>Your first bedtime story will appear here.</p></div>';grid.querySelectorAll("[data-play]").forEach(b=>b.onclick=()=>playStory(state.stories.find(s=>s.id===b.dataset.play)))}
async function loadStories(){try{const result=await api("/api/room/stories",{},state.session.token);state.stories=await Promise.all(result.stories.map(async s=>({...s,title:await decryptText(state.session.roomKey,s.titleCiphertext,s.titleIv)})));paintStories()}catch{}}
async function uploadStory(event){event.preventDefault();const file=document.getElementById("storyFile").files[0],title=document.getElementById("storyTitle").value.trim(),button=event.currentTarget.querySelector("button");if(!file||!title)return;button.disabled=true;button.textContent="Encrypting & adding…";try{const audioIv=crypto.getRandomValues(new Uint8Array(12));const encryptedAudio=await encryptBytes(state.session.roomKey,await file.arrayBuffer(),audioIv);const encryptedTitle=await encryptText(state.session.roomKey,title);const params=new URLSearchParams({id:randomId(),titleCiphertext:encryptedTitle.ciphertext,titleIv:encryptedTitle.iv,audioIv:b64(audioIv)});await api(`/api/room/stories?${params}`,{method:"POST",headers:{"Content-Type":file.type||"audio/webm"},body:encryptedAudio},state.session.token);event.currentTarget.reset();await loadStories()}catch(error){setError(error.message)}finally{button.disabled=false;button.textContent="Add a story"}}
async function playStory(story){stopAudio();try{const response=await fetch(`${API_BASE}/api/room/stories/${encodeURIComponent(story.id)}/audio`,{headers:{Authorization:`Bearer ${state.session.token}`},cache:"no-store"});if(!response.ok)throw new Error("This story could not be opened.");const clear=await decryptBytes(state.session.roomKey,await response.arrayBuffer(),story.audioIv);state.audioUrl=URL.createObjectURL(new Blob([clear],{type:story.mimeType}));state.audio=new Audio(state.audioUrl);state.audio.onended=stopAudio;state.audio.onpause=()=>{if(!state.audio?.ended)stopAudio()};if("mediaSession" in navigator){navigator.mediaSession.metadata=new MediaMetadata({title:"Quiet audio",artist:"",album:""});navigator.mediaSession.setActionHandler("pause",stopAudio);navigator.mediaSession.setActionHandler("stop",stopAudio);navigator.mediaSession.playbackState="playing"}await state.audio.play()}catch(error){stopAudio();setError(error.message)}}
function startPolling(){clearTimers();loadMessages();loadStories();state.timers.push(setInterval(loadMessages,1400));state.timers.push(setInterval(async()=>{try{const result=await api("/api/room/typing",{},state.session.token);document.getElementById("typing")?.classList.toggle("hidden",!result.typing)}catch{}},1600))}

boot();
