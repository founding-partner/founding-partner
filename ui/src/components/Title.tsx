import { Component, createEffect } from "solid-js";
import { createSignal } from "solid-js";

import styles from "./Title.module.css";

type Props = {
  scrollPosition: number;
};

const Title: Component<Props> = (props) => {
  const [isCentered, setIsCentered] = createSignal(true);

  createEffect(() => {
    if (props.scrollPosition > 0) {
      setIsCentered(false);
    } else {
      setIsCentered(true);
    }
  });

  return (
    <div class="min-h-screen w-full snap-start">
      <div
        class={`fixed top-1/2 left-1/2 text-center ${
          isCentered()
            ? "-translate-x-1/2 -translate-y-1/2"
            : "-translate-x-[108%] -translate-y-1/2"
        } transform transition-all duration-1000 ease-in-out ${
          props.scrollPosition > 0 ? " text-left pl-10" : ""
        }`}
      >
        <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-bold">
          <span
            class={`bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text ${styles["animate-gradient"]}`}
          >
            Founding{" "}
          </span>
          <span
            class={`bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text ${styles["animate-gradient"]}`}
          >
            Partner
          </span>
        </h1>
        <h2 class="text-white text-xl font-extrabold wei mt-4">The Social Network for Startups</h2>
      </div>
    </div>
  );
};

export default Title;
