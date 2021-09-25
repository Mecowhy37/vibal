document.ondomcontentloaded = function () {
  alert(
    "Due to google sheets migration, it is no longer possible to fetch json with songs titles and youtube IDs from my spreadsheet. For now its just a dummy interface waiting for a revive and becoming spotify extension. I'm sorry its no longer interactive"
  );
};

// moving things
const theme = document.querySelector(".themeToggler");
const body = document.querySelector("body");
theme.onclick = () => {
  body.classList.toggle("dark");
};

const container = document.querySelector(".BGcontainer");
const image = document.getElementById("BG");
const godness = document.querySelector(".godness");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

document.querySelector("body").addEventListener("mousemove", moveAround);

function moveAround(event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  let calcPosX = mouseX / windowWidth;
  let calcPosY = mouseY / windowHeight;

  let calcRotX = (mouseX - windowWidth / 2) / 90;
  let calcRotY = -(mouseY - windowHeight / 2) / 34;

  //podziel Y przez .4 nie przez 2

  image.style.transform = `translate(-${calcPosX.toString()}%, -${calcPosY.toString()}%)`;
  godness.style.transform = `translate(-50%, -50%) rotateX(${calcRotY.toString()}deg) rotateY(${calcRotX.toString()}deg)`;
}

// moving things

// selecting emotions

const checkboxes = document.querySelectorAll("label input");
const selected = [];

const ticks = document.querySelectorAll(".tick");
const tick1 = document.querySelector(".tick.one");
const tick2 = document.querySelector(".tick.two");

const index = selected.findIndex((el) => el.value === e.target.value);
const emptyInput = document.querySelector("input");

checkboxes.forEach((cb) => {
  cb.addEventListener("click", (e) => {
    const inArray = selected.includes(e.target);
    const arrow = document.querySelector(".arrow");
    const cfj = document.querySelector(".cfj");

    arrow.classList.remove("arrowdelay");
    tick1.classList.remove("delay");
    tick2.classList.remove("delay");

    if (cb.checked) {
      cb.parentElement.classList.add("picked");

      if (selected.includes("empty slot") && e.target != inArray) {
        selected.splice(0, 1, e.target);
        tick1.classList.add("flipped");
        arrow.classList.add("arrowdelay");
        arrow.classList.add("broad2");
        selected[0].parentElement.classList.add("first");
        readyToRoll();
      } else {
        selected.push(e.target);

        if (selected.length == 1) {
          tick1.classList.add("flipped");
          selected[0].parentElement.classList.add("first");
        } else if (selected.length == 2) {
          tick2.classList.add("flipped");
          tick2.addEventListener("transitionend", readyToRoll);
        }
      }

      if (selected.length === 3) {
        // const flipped = document.querySelector(".tick.two.flipped");
        selected[1].checked = false;
        selected[1].parentElement.classList.remove("picked");
        // selected.shift(); the same as below // splice (index, how many to remove, item to add, ...)
        selected.splice(1, 1);
      }
    } else {
      // const index = selected.findIndex(el => el.value === e.target.value);
      cb.parentElement.classList.remove("picked");
      arrow.removeEventListener("click", flipcard);

      if (selected[0] == e.target && selected.length == 2) {
        selected[0].parentElement.classList.remove("first");
        selected.splice(0, 1, "empty slot");
        arrow.classList.remove("broad2");
        arrow.classList.add("broad1");
        tick1.classList.add("delay");
        tick1.classList.remove("flipped");
      } else if (selected[1] == e.target && selected.includes("empty slot")) {
        //removes all
        selected.splice(0, 2);
        tick1.classList.remove("flipped");
        tick2.classList.add("delay");
        arrow.classList.remove("broad1", "broad2");
        tick2.classList.remove("flipped");
      } else if (selected[1] == e.target) {
        tick2.classList.add("delay");
        tick2.classList.remove("flipped");
        arrow.classList.remove("broad1", "broad2");
        selected.splice(1, 1);
      } else {
        selected[0].parentElement.classList.remove("first");
        selected.splice(0, 1);
        tick1.classList.remove("flipped");
        tick2.classList.remove("flipped");
        arrow.classList.remove("broad1", "broad2");
      }
    }

    // if (selected.length == 1) {
    //     console.log(`1st: ${selected[0].value}`);
    // } else if (selected.length == 2 && selected.includes("empty slot") != true) {
    //     console.log(`1st: ${selected[0].value}, 2nd: ${selected[1].value}`);
    // } else if (selected.length == 2 && selected.includes("empty slot")) {
    //     console.log(`1st: ${selected[0]}, 2nd: ${selected[1].value}`);
    // } else {
    //     console.log("no selected emotions");

    if (selected.length == 1) {
      console.log("%c%s", "color: white; font-weight: bold; border: 2px solid #00EE96;", ` 1st: ${selected[0].value} `);
    } else if (selected.length == 2 && selected.includes("empty slot") != true) {
      console.log("%c%s%c%s", "color: white; font-weight: bold; border: 2px solid #00EE96;", ` 1st: ${selected[0].value} `, "color: white", ` 2nd: ${selected[1].value}`);
    } else if (selected.length == 2 && selected.includes("empty slot")) {
      console.log("%c%s%c%s", "color: white; background-color: rgba(255, 255, 255, .5); font-weight: bold;", ` 1st: ${selected[0]} `, "color: white", ` 2nd: ${selected[1].value}`);
    } else {
      console.log("%c no selected emotions 🤔", "color: yellow; font-weight: bold");
    }

    function readyToRoll() {
      if (tick1.classList.contains("flipped") && tick2.classList.contains("flipped")) {
        tick2.removeEventListener("transitionend", readyToRoll);
        arrow.classList.add("broad1", "broad2");
        console.log("readyToRoll");
        arrow.addEventListener("click", flipcard);
      }
    }
  });
});

const download = new Promise(function (resolve, reject) {
  fetch("https://spreadsheets.google.com/feeds/list/14laJWNL5BWp1ZUZae8-uSRgV0UgrPqFAdkxd5a2bBf0/od6/public/values?alt=json")
    .then((e) => e.json())
    .then(buildIt)
    .then(() => {
      if (songs) {
        resolve("fine");
      } else {
        reject("error");
      }
    });
});

function buildIt(data) {
  console.log("building again");
  songs = Array.from(data.feed.entry);
}

function flipcard() {
  const arrow = document.querySelector(".arrow");
  const back = document.querySelector(".back");
  params = [];

  rotateOne.play(0);

  selected.forEach((param) => params.push(param.value));

  download
    .then(function whenOk(response) {
      sort();
      return response;
    })
    .catch(function notOk(err) {
      console.log(err);
    });
}
const cover = document.querySelector(".cover");

function sort() {
  let outKeys = ["category", "content", "gsx$_cu76f", "gsx$ruleofthumbdominująceemocjeod1do10", "id", "link", "title", "updated", "__proto__"];
  songsToPlay = [];
  songs.forEach((song) => {
    outKeys.forEach((outKey) => delete song[`${outKey}`]);
    const param1 = song[`gsx$${params[0]}`].$t;
    const param2 = song[`gsx$${params[1]}`].$t;

    // Object.keys(song).forEach(key =>{
    //     song[key.replace("gsx$", "")] = song[key];
    //     delete song[key];
    // }) that did not worked bc the next iteration of a download promise
    // resolved with empty objects ノಠ_ಠノ

    if (param1 && param2) {
      songsToPlay.push(song);
    }
  });
  songsToPlay.sort(compareSongs).reverse();

  console.log(params[0], params[1]);

  for (i = 0; i < songsToPlay.length; i++) {
    console.log(`${params[0]}:` + songsToPlay[i][`gsx$${params[0]}`].$t, `${params[1]}:` + songsToPlay[i][`gsx$${params[1]}`].$t, parseFloat(songsToPlay[i][`gsx$${params[0]}`].$t) + parseFloat(songsToPlay[i][`gsx$${params[1]}`].$t));
  }
  console.log(songsToPlay);
  setPlayer(songsToPlay, (x = 0));
  windowAction(songsToPlay[x]["gsx$youtubelink"].$t, 2300);
}
function compareSongs(a, b) {
  const sum1 = parseFloat(a[`gsx$${params[0]}`].$t) + parseFloat(a[`gsx$${params[1]}`].$t);
  const sum2 = parseFloat(b[`gsx$${params[0]}`].$t) + parseFloat(b[`gsx$${params[1]}`].$t);
  if (sum1 < sum2) {
    return -1;
  }
  if (sum1 - sum2) {
    return 1;
  }
  if (sum1 == sum2) {
    if (a[`gsx$${params[0]}`].$t < b[`gsx$${params[0]}`].$t) {
      return -1;
    } else {
      return 0;
    }
  }
}

function setPlayer() {
  const title = document.querySelector(".song");
  const artist = document.querySelector(".artist");
  const viewer = document.querySelector(".viewer");
  const emoji1 = document.querySelector(".action .no1");
  const emoji2 = document.querySelector(".action .no2");
  const lennyface1 = selected[0].parentElement;
  const lennyface2 = selected[1].parentElement;
  const next = document.querySelector(".skip.next");
  const prev = document.querySelector(".skip.prev");
  console.log(x);
  let currentIndex = songsToPlay[x];
  let link = currentIndex["gsx$youtubelink"].$t;

  next.addEventListener("click", nextSong);
  prev.addEventListener("click", prevSong);

  title.textContent = currentIndex["gsx$title"].$t;
  artist.textContent = currentIndex["gsx$artist"].$t;
  emoji1.textContent = lennyface1.querySelector("#emo").textContent;
  emoji2.textContent = lennyface2.querySelector("#emo").textContent;
  console.log(title.offsetWidth, viewer.offsetWidth);
  if (title.offsetWidth - viewer.offsetwidth > 0) {
    // console.log("dodano");
    viewer.classList.add("gradient");
  } else {
    // console.log("wyjabano");
    viewer.classList.remove("gradient");
  }

  next.anchor = link;
  prev.anchor = link;
  next.addEventListener("click", nextSong);
  prev.addEventListener("click", prevSong);

  console.log(x, link);
}

function nextSong(evt) {
  if (x < songsToPlay.length - 1) {
    x++;
    setPlayer(x);
    windowAction(evt.currentTarget.anchor);
  } else {
    console.log("queue ended :(");
  }
}
function prevSong(evt) {
  if (x > 0) {
    x--;
    setPlayer(x);
    windowAction(evt.currentTarget.anchor);
  } else {
    console.log("it is the first song");
  }
}
let myWindow = null;
function windowAction(link, delay) {
  if (myWindow == null || myWindow.closed) {
    setTimeout(function () {
      console.log(link);
      myWindow = window.open(`https://www.youtube.com/watch?v=${link}`, "targetWindow", "width=500,height=280");
    }, delay);
  } else {
    myWindow.focus();
    myWindow.location = `https://www.youtube.com/watch?v=${link}`;
  }
}

CustomEase.create("expose", ".5, -0.25, .5, 1.25");

let rotateOne = gsap.timeline();
rotateOne.paused(true);

rotateOne
  .to(".emotions", { duration: 2, rotationY: "+= 180", transform: "perspective(var(--persp))", ease: "expose" })
  .to(".player", { duration: 2, rotationY: "+= 180", transform: "perspective(var(--persp))", ease: "expose" }, "=-2")
  .to(".player > div", { duration: 1, opacity: "1", ease: "power1" }, "=-1.3")
  .to(".tick", { duration: 0, opacity: 0 }, "=-1.2")
  .to(".emotions > label", { duration: 0.7, opacity: "0", ease: "power1" }, "=-1");

let rotateTwo = gsap.timeline();
rotateTwo.paused(true);

rotateTwo
  .to(".emotions", { duration: 2, rotationY: "+= 180", transform: "perspective(var(--persp))", ease: "expose" })
  .to(".player", { duration: 2, rotationY: "+= 180", transform: "perspective(var(--persp))", ease: "expose" }, "=-2")
  .to(".emotions > label", { duration: 1, opacity: "1", ease: "power1" }, "=-1.3")
  .to(".tick", { duration: 0, opacity: 1 }, "=-1.2")
  .to(".player > div", { duration: 0.7, opacity: "0", ease: "power1" }, "=-1");
//this is second face

const slider = document.getElementById("slider");

sliderMove();
slider.onmousemove = slider.onclick = sliderMove;

function sliderMove() {
  let x = slider.value;
  let inputMax = slider.max;
  let offset = (x / inputMax) * 100;
  let color = `linear-gradient(90deg, var(--font-color) ${offset}%, var(--face-tiles) ${offset}%)`;
  slider.style.background = color;

  const currTime = document.getElementById("now");
  const yetToCome = document.getElementById("ytc");

  let minutes = Math.floor(x / 60);
  let seconds = x - minutes * 60;

  let ytcMinutes = Math.floor((inputMax - x) / 60);
  let ytcSeconds = inputMax - x - ytcMinutes * 60;

  if (seconds < 10) {
    currTime.textContent = `${minutes}:0${seconds}`;
  } else {
    currTime.textContent = `${minutes}:${seconds}`;
  }
  if (ytcSeconds < 10) {
    yetToCome.textContent = `${ytcMinutes}:0${ytcSeconds}`;
  } else {
    yetToCome.textContent = `${ytcMinutes}:${ytcSeconds}`;
  }
}

const replay = document.querySelector(".replay");
replay.addEventListener("click", countDown);

slider.onchange = () => {
  replay.addEventListener("click", countDown);
};

function countDown() {
  replay.removeEventListener("click", countDown);
  function f() {
    let x = slider.value;
    slider.stepDown(1);
    sliderMove();
    if (x > 0) {
      setTimeout(f, 1);
    }
  }
  f();
}

const toggler = document.querySelector(".toggler");
const action = document.querySelector(".action");
const togglerWrap = toggler.querySelector(".wrapper");

toggler.addEventListener("click", () => {
  toggler.querySelector(".wrapper").classList.toggle("emotions");
  action.querySelector(".wrapper").classList.toggle("emotions");
});

let hover = gsap.timeline();

hover.paused(true);
hover.to(".action .wrapper", 0.15, { ease: Power0.easeOut, opacity: 0 });
hover.to(".overlay", 0.15, { ease: Power0.easeOut, opacity: 1 }, "-=.1");

action.onmouseenter = action.onmouseleave = action.onclick = handler;

function handler(event) {
  if (togglerWrap.classList.contains("emotions") != true) {
    if (event.type == "mouseenter") {
      hover.play();
    }
    if (event.type == "mouseleave") {
      hover.reverse();
    }
    if (event.type == "click") {
      rotateTwo.play(0);
    }
  }
}

// console.log(song.offsetWidth)
// console.log(viewer.offsetWidth)

let titleMove = gsap.timeline();
titleMove.paused(true);
