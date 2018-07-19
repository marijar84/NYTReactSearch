import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
  <span  topic={props.topic} url={props.url} onClick={() => props.clickImage(props.topic, props.url)}>
    Save
  </span>
);

export default SaveBtn;
