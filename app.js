var fileTag = document.getElementById("file"),
  preview = document.getElementById("preview");
var top = document.getElementById("toptxt");
var bottom = document.getElementById("bottomtxt");
var topLeft = document.getElementById("top-left");
var bottomRight = document.getElementById("bottom-right");

var container = document.getElementById("container");

topTxt = "";
bottomTxt = "";
memeImg;

function getValueMeme(input) {
  var reader;
  topTxt = input.value;
  console.log("toptxt", topTxt);
  topLeft.innerHTML = topTxt;
}

function getValueBottom(input) {
  var reader;
  bottomTxt = input.value;
  console.log("bottomtxt", bottomTxt);

  bottomRight.innerHTML = bottomTxt;
}
function loadFile(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output");
    console.log(reader.result);
    memeImg = reader.result;
    container.style.backgroundImage = "url('" + reader.result + "')";
  };
  reader.readAsDataURL(event.target.files[0]);
}

function convertToMeme() {
  fetch(`https://api.imgflip.com/caption_image`, {
    method: "POST",
    body: JSON.stringify({
      text: "Make custom memes on the web via imgflip API",
      x: 10,
      y: 225,
      width: 548,
      height: 100,
      color: "#ffffff",
      outline_color: "#000000",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

function downloadMeme() {
  domtoimage
    .toPng(container)
    .then(function (dataUrl) {
      var a = document.createElement("a");
      a.href = dataUrl;
      a.download = "meme.jpg";
      document.body.appendChild(a);
      a.click();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}
