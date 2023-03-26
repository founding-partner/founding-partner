import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import styles from "./Title.module.css";

const Title: Component<{ scrollPosition: number }> = ({ scrollPosition }) => {
  const [isCentered, setIsCentered] = createSignal(true);

  const onScroll = () => {
    if (scrollPosition > 0) {
      setIsCentered(false);
    } else {
      setIsCentered(true);
    }
  };

  return (
    <div
      class={`absolute top-1/2 left-1/2 transform ${
        isCentered()
          ? "-translate-x-1/2 -translate-y-1/2"
          : "-translate-x-2/3 -translate-y-1/2"
      } transition-all duration-300 ease-in-out`}
      onScroll={onScroll}
    >
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
      <p
        class={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl ${
          isCentered() ? "opacity-0" : "opacity-100"
        }`}
      >
        Find your perfect business partner
      </p>
    </div>
  );
};

export default Title;
