import type { Component } from "solid-js";
import styles from "./Title.module.css";

const Title: Component = () => {
  return (
    <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-bold">
      <span
        class={`bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text ${styles["animate-gradient"]}`}
      >
        Founding{" "}
      </span>
      <span
        class={`bg-gradient-to-r from-yellow-400 to-orange-500 to-red-500 text-transparent bg-clip-text ${styles["animate-gradient"]}`}
      >
        Partner
      </span>
    </h1>
  );
};

export default Title;
