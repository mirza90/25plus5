import * as React from "react";
import { useState, useEffect } from "react";

export const App = () => {
  const [currentMode, setCurrentMode] = useState("Session");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const timeOut = setTimeout(() => {
    if (isRunning && timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const toggleIsRunning = () => {
    if (isRunning) {
      clearTimeout(timeOut);
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const incrementBreakLength = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementBreakLength = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementSessionLength = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
    }
  };


  const resetAllValues = () => {
    clearTimeout(timeOut);
    setCurrentMode("Session");
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    const beep = document.getElementById("beep")
    beep.pause()
    beep.currentTime = 0
  };

  const playAlert = () => {
    const beep = document.getElementById("beep")
    beep.play()
  };

  const numberToStringWithLeadingZero = (inputValue) => {
    if (inputValue >= 10) {
      return inputValue.toString();
    }
    return "0" + inputValue.toString();
  };

  const formatTimeLeft = () => {
    let seconds = timeLeft % 60;
    let minutes = (timeLeft - seconds) / 60;
    return (
      numberToStringWithLeadingZero(minutes) +
      ":" +
      numberToStringWithLeadingZero(seconds)
    );
  };

  useEffect(() => {
    if (currentMode === "Session") {
      setTimeLeft(sessionLength * 60);
    } else {
      setTimeLeft(breakLength * 60);
    }
  }, [sessionLength, breakLength, currentMode]);

  useEffect(() => {
    const changeCurrentMode = () => {
      if (currentMode === "Session") {
        setCurrentMode("Break");
      } else if (currentMode === "Break") {
        setCurrentMode("Session");
      }
    };
  

    if (timeLeft === 0) {
      playAlert();
      changeCurrentMode();
    }
  }, [timeLeft, currentMode]);

  return (
    <div id="App" className="main-container">
      <div id="settings" className="row">
      <div id="break" className="col-5 settings-panel">
        <div id="break-label" className="settings-label" >Break Length</div>
        <div id="break-length"  className="settings-value">{breakLength}</div>
        <div id="break-decrement" className="settings-dec" onClick={decrementBreakLength}>
          <i className="fas fa-minus"></i>
        </div>
        <div id="break-increment" className="settings-inc" onClick={incrementBreakLength}>
          <i className="fas fa-plus"></i>
        </div>
      </div>

      <div id="session" className="col-5 settings-panel">
        <div id="session-label" className="settings-label">Session Length</div>
        <div id="session-length" className="settings-value">{sessionLength}</div>
        <div id="session-decrement" onClick={decrementSessionLength} className="settings-dec">
          <i className="fas fa-minus"></i>
        </div>
        <div id="session-increment" className="settings-inc" onClick={incrementSessionLength}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      </div>

      <div id="clock">
        <div id="timer-label"><div id="current-mode">{currentMode}</div>
          <div id="time-left">{formatTimeLeft()}</div></div>
        <div id="buttons">
        <div id="start_stop" onClick={toggleIsRunning}>
          {isRunning ? <i className="fas fa-pause fa-2x"></i> :  <i className="fas fa-play fa-2x"></i> }
        </div>
        <div id="reset" onClick={resetAllValues}><i className="fas fa-sync fa-2x"></i></div>
        </div></div>
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
};