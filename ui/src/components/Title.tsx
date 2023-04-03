import { Component, createEffect } from "solid-js";
import { createSignal } from "solid-js";
import Rubik from "./Rubik";

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
    <div class="min-h-screen w-full snap-start font-mono">
      <div
        class={`fixed top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2 ${
          !isCentered()
            ? "-translate-x-[120%] -translate-y-1/2"
            : ""
        } transform flex ${
          props.scrollPosition > 0 ? " text-left flex-col" : "flex-row"
        }`}
      >
        <Rubik />
        <div class="m-auto">
          <h1 class={`text-center font-bold transform transition-all duration-1000 leading-snug ${
          props.scrollPosition > 0 ? "text-6xl" : "text-8xl"
        }`}>
            <div
              class={`bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text font-playfair-display ${styles["animate-gradient"]}`}
            >
              Founding{" "}
            </div>
            <div
              class={`bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text font-cinzel ${styles["animate-gradient"]}`}
            >
              Partner
            </div>
          </h1>
          <h2 class="text-xl text-center font-bold font-poppins">
            The Social Network for Startups
          </h2>
        </div>
        {/* <h2 class="text-white text-xl font-extrabold wei mt-4">
          The Social Network for Startups
        </h2>
        <h2 class="text-xl text-center font-bold font-roboto">
          The Social Network for Startups - Roboto
        </h2>
        <h2 class="text-xl text-center font-bold font-montserrat">
          The Social Network for Startups - Montserrat
        </h2>
        <h2 class="text-xl text-center font-bold font-playfair-display">
          The Social Network for Startups - Playfair Display
        </h2>
        <h2 class="text-xl text-center font-bold font-raleway">
          The Social Network for Startups - Raleway
        </h2>
        <h2 class="text-xl text-center font-bold font-lato">
          The Social Network for Startups - Lato
        </h2>
        <h2 class="text-xl text-center font-bold font-oswald">
          The Social Network for Startups - Oswald
        </h2>
        <h2 class="text-xl text-center font-bold font-open-sans">
          The Social Network for Startups - Open Sans
        </h2>
        <h2 class="text-xl text-center font-bold font-merriweather">
          The Social Network for Startups - Merriweather
        </h2>
        
        <h2 class="text-xl text-center font-bold font-noto-serif">
          The Social Network for Startups - Noto Serif
        </h2> */}
      </div>
    </div>
  );
};

export default Title;
