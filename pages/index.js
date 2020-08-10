import styles from "../styles/Home.module.css";
import React, { useEffect } from "react";

export default function Index(props) {
  useEffect(() => {
    fetch({
      url: "http://localhost:3000/api/login",
      method: "POST",
    })
      // .then((res) => res.json())
      .then((res) => console.log("res of login : ", res))
      .catch((err) => console.log("err of login", err));
  }, []);
  return (
    <>
      <h1>the jacoi project</h1>
    </>
  );
}
