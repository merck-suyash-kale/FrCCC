import React, { FC, useCallback, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080"
);

initializeApp({
  apiKey: "AIzaSyASeILudRW0LxemyqrSQ7IC7OBKUXvXxXw",
  authDomain: "frccc-7595a.firebaseapp.com",
  databaseURL: "https://frccc-7595a-default-rtdb.firebaseio.com",
  projectId: "frccc-7595a",
  storageBucket: "frccc-7595a.appspot.com",
  messagingSenderId: "974174571107",
  appId: "1:974174571107:web:72fb948d4cc1db4ba1c656",
  measurementId: "G-0CFFBM3HTN",
});

const database = getDatabase();

const App: FC = () => {
  const [username, setUsername] = useState("SKALE");
  const [url, setUrl] = useState("https://google.in");

  const onFirebase = useCallback(() => {
    set(ref(database, `/${username.toUpperCase()}`), {
      url,
    });
  }, [username, url]);

  const onWebSocket = useCallback(() => {
    socket.emit("submit", { username: username, url });
  }, [username, url]);

  return (
    <>
      <input
        type="text"
        placeholder="User name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <input
        type="text"
        placeholder="Url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="button" onClick={onFirebase}>
        Firebase
      </button>
      <button type="button" onClick={onWebSocket}>
        Web socket
      </button>
    </>
  );
};

export default App;
