import React from "react";
import ReactDOM from "react-dom";

import "./App.css";

function App() {
  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };
  return (
    <div className="App">
      <h1>React Web Share API</h1>
      <button
        onClick={handleShareButton}
        className="share-button"
        type="button"
        title="Share this article"
      >
        <svg>
          <use href="#share-icon" />
        </svg>
        <span>Share</span>
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
    </div>
  );
}

export default App
