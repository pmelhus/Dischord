import { useState, useEffect } from "react";
import "./LinkDisplay.css";

const LinkDisplay = ({ message }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const text = message?.content;

  // Finds the url in the message.content and displays it as an anchor tag around the rest of the message content.

  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const matches = text.match(urlRegex);

  const begOfString = (text) => {
    if (text.indexOf(matches[0]) === 0) return;
    return text.slice(0, text.indexOf(matches[0])).trim();
  };

  const endOfString = (text) => {
    console.log(matches[0]);
    if (text.indexOf(matches[0]) + matches.length === text.length) return;
    return text.slice(
      text.indexOf(matches[0]) + matches[0].length,
      text.length
    );
  };

  const isYouTubeUrl = (url) => {
    return url.includes("www.youtube.com");
  };

  const sliceUrlSearch = (url) => {
    const firstEqual = url.indexOf('=')
    const firstAnd = url.indexOf('&')
    return url.slice(firstEqual + 1, firstAnd)
  }

console.log(sliceUrlSearch(new URL(matches[0]).search))
  console.log(new URL(matches[0]));

  return (
    <div className="url-div">
      <div className='url-message-content'>

      <p style={{ display: "inline", padding: 0 }}>
        {begOfString(message?.content)}
      </p>
      <a
        style={{ display: "inline" }}
        target="_blank"
        // if link doesn't include protocol, add it to the link
        href={
          matches[0].includes("https://" || "http://")
            ? matches[0]
            : `https://${matches[0]}`
        }
      >
        {matches[0]}
      </a>
      <p style={{ display: "inline" }}>{endOfString(message?.content)}</p>
      </div>
      {isYouTubeUrl(matches[0]) && (

        <iframe
        className='url-iframe'
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${sliceUrlSearch(new URL(matches[0]).search)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullscreen
  />
      )}


    </div>
  );
};

export default LinkDisplay;
