import React from "react";

export default function Index(props) {
  return (
    <>
      <h1>the jacoi project</h1>
      <form
        method="POST"
        encType="multipart/form-data"
        action="/api/upload/image"
      >
        <input type="file" name="image" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
