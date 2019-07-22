import React from "react";
import "./Loading.css";
import { Spinner } from "evergreen-ui";

export default function Loading() {
  return (
    <div className="LoadingScreen">
      <Spinner />
    </div>
  );
}
