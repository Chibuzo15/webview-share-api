import React from "react";
// import ReactDOM from "react-dom";

import "./App.css";

function App() {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [file64, setFile64] = React.useState("");
  const [url, setUrl] = React.useState("");


  //
  const [imgPath, setImgPath] =  React.useState(undefined)

  const handleFileSelect = (event) => {
    // console.log("file select event is ", event);
    var file = event.target.files[0];

    let filePath = (window.URL || window.webkitURL).createObjectURL(file);
    console.log("path", filePath);
    setImgPath(filePath)

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile64(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleShareButton = async () => {
    const blob = await (await fetch(file64)).blob();
    const file = new File([blob], "fileName.png", { type: blob.type });

    let filePath;
    if (file64) {
      filePath = (window.URL || window.webkitURL).createObjectURL(file);
      console.log("path", filePath);
    }
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url,
          title,
          text,
          files: [file],
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else if (window.ReactNativeWebView) {
      const shareObject = {
        subject: title,
        message: text,
        url: imgPath,
        link: url,
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(shareObject));
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
      alert("Sorry! Your browser does not support Web Share API");
    }
  };

  return (
    <div className="App">
      <h1>React Web Share API</h1>

      <div>
        <div class="heading">Title</div>
        <input
          value={title}
          type="text"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <div class="heading">Text</div>
        <input
          value={text}
          type="text"
          name="title"
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div>
        <div class="heading">Url</div>
        <input
          value={url}
          type="text"
          name="url"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <div>
        <div class="heading">Select a file</div>
        <input
          // value={text}
          type="file"
          name="file"
          onChange={handleFileSelect}
        />
      </div>
      <button
        onClick={handleShareButton}
        className="share-button"
        type="button"
        title="Share this article"
      >
        <svg>
          <use href="#share-icon" />
        </svg>
        <span class="heading">Share</span>
      </button>
      <svg>
        <defs>
          <symbol
            id="share-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-share"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </symbol>
        </defs>
      </svg>

      {imgPath && <img
      style={{
        height: 300,
        width: 300,
        objectFit:'contain'
      }}
      src={imgPath}
      />}
    </div>
  );
}

export default App;
