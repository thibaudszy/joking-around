import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import "./Joke.css";
import twitterLogo from "../images/twitter-logo-2429.svg";

export default function Joke() {
  const [joke, setJoke] = useState();
  const [progress, setProgress] = useState(0);
  const [reload, setReload] = useState(false);
  const delay = 10000;

  const getJokeAndStartTimer = async () => {
    const newJokeRequest = await axios.get(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );
    console.log("api res", newJokeRequest.data[0]);
    setJoke({
      setup: newJokeRequest.data[0].setup,
      punchline: newJokeRequest.data[0].punchline,
    });

    incrementProgress();
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const incrementProgress = async () => {
    let waitTime = delay;
    while (waitTime >= 0) {
      const increment = 500;
      await timeout(increment);
      setProgress(((delay - waitTime) * 100) / delay);
      waitTime -= increment;
    }
  };

  useEffect(() => {
    setJoke("");
    setProgress(0);
    getJokeAndStartTimer();
  }, [reload]);

  if (!joke) {
    return (
      <div>
        <div className={{ alignSelf: "center" }}>
          {" "}
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <div className="joke">
      <h2>{joke.setup}</h2>

      {progress === 100 ? (
        <h2>{joke.punchline}</h2>
      ) : (
        <div className="progressBar">
          <ProgressBar now={progress} />
        </div>
      )}
      <div className="joke-button">
        <Button variant="warning" onClick={() => setReload(!reload)}>
          Get me a new joke
        </Button>
      </div>
      <a
        href={`https://twitter.com/intent/tweet?text=${joke.setup}%20${joke.punchline}`}
      >
        {" "}
        <img src={twitterLogo} alt="share to twitter" width="30em" />
      </a>
    </div>
  );
}
