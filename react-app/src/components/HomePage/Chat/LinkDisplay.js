import { useState, useEffect } from "react";
import "./LinkDisplay.css";

const LinkDisplay = ({ message }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const text = message?.content;
  const [loading, setLoading] = useState(true);

  // Finds the url in the message.content and displays it as an anchor tag around the rest of the message content.

  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const matches = text.match(urlRegex);

  const begOfString = (text) => {
    if (text.indexOf(matches[0]) === 0) return;
    return text.slice(0, text.indexOf(matches[0])).trim();
  };

  const match = matches[0];

  const endOfString = (text) => {
    console.log(match);
    if (text.indexOf(match) + matches.length === text.length) return;
    return text.slice(text.indexOf(match) + match.length, text.length);
  };

  const isYouTubeUrl = (url) => {
    return url.includes("www.youtube.com");
  };

  const sliceUrlSearch = (url) => {
    const firstEqual = url.indexOf("=");
    const firstAnd = url.indexOf("&");
    return url.slice(firstEqual + 1, firstAnd);
  };

  // adds https:// to url

  const urlWithProtocol = (url) => {
    if (!url.includes("https://")) return `https://${url}`;
    return url;
  };

  // checks to see if valid url
  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  // console.log(sliceUrlSearch(new URL(matches[0]).search))
  //   console.log(new URL(matches[0]));

  return (
    <div className="url-div">
      <div className="url-message-content">
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
              : `https://${match}`
          }
        >
          {matches[0]}
        </a>
        <p style={{ display: "inline" }}>{endOfString(message?.content)}</p>
      </div>
      {loading &&
        isValidUrl(urlWithProtocol(match)) &&
        new URL(urlWithProtocol(match)).search && (
          <div className="loading-gif-div">
            <img src="https://i.gifer.com/VAyR.gif"></img>
          </div>
        )}
      {isYouTubeUrl(match) &&
        isValidUrl(urlWithProtocol(match)) &&
        new URL(urlWithProtocol(match)).search && (
          <div className="iframe-div">

            <iframe
              className="url-iframe"
              width="400"
              height="200"
              src={`https://www.youtube.com/embed/${sliceUrlSearch(
                new URL(urlWithProtocol(match)).search
              )}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullscreen
              onLoad={() => setLoading(false)}
              fadeIn={true}
            />
            </div>
        )}
    </div>
  );
};

export default LinkDisplay;
