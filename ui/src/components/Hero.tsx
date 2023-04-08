import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { createSignal } from "solid-js";
import RubikClass from "../lib/Rubik";

import styles from "./Hero.module.css";
import LoginButton from "./LoginButton";

type Props = {
  scrollPosition: number;
};

const Hero: Component<Props> = (props) => {
  let rubikInstance: RubikClass;
  let titleHolder: HTMLDivElement;
  let canvasHolder: HTMLDivElement;
  let rubikCubeCanvas: HTMLCanvasElement;
  let cssCanvas: HTMLDivElement;

  const [isCentered, setIsCentered] = createSignal(true);
  const [called, setCalled] = createSignal(false);

  createEffect(() => {
    if (!called() && props.scrollPosition > 0) {
      setIsCentered(false);
      rubikInstance?.updateScrollDown();
      setCalled(true);
    } else if (props.scrollPosition === 0) {
      setIsCentered(true);
      rubikInstance?.updateScrollUp();
      setCalled(false)
    } else {
      setIsCentered(true);
    }
  });

  onMount(() => {
    rubikInstance = new RubikClass(rubikCubeCanvas, cssCanvas, titleHolder, canvasHolder);
    props.scrollPosition > 0 ? rubikInstance?.updateScrollDown() : rubikInstance?.updateScrollUp();
    window.addEventListener(
      "resize",
      () => rubikInstance.onWindowResize(),
      false
    );
  });

  onCleanup(() => {
    rubikInstance = null!;
  });

  return (
    <div class="min-h-screen w-auto">
      <div class={`sm:fixed w-full min-h-screen text-center`}>
        <div ref={titleHolder!}>
          <h1 class={`text-center font-bold text-6xl`}>
            <div
              class={`animate bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text font-playfair-display leading-tight ${styles["animate-gradient"]}`}
            >
              Founding{" "}
            </div>
            <div
              class={`animate bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text font-cinzel leading-0 ${styles["animate-gradient"]}`}
            >
              Partner
            </div>
          </h1>
          <h2 class="text-xl text-center font-bold font-poppins leading-0">
            The Social Network for Startups
          </h2>
          <div class="w-full flex mt-4">
            <LoginButton />
          </div>
        </div>
        <div ref={canvasHolder!}>
          <canvas
            ref={rubikCubeCanvas!}
            // class="sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-0 border-0"
            // style={{ width: "100vw", height: "100vh" }}
          />
        </div>
        <div
          ref={cssCanvas!}
          // class="sm:absolute sm:top-0 sm:left-0 z-10"
          // style={{ width: "22.5rem", height: "22.5rem" }}
        />
        {/* <div class="absolute top-0 left-0 flex gap-2 align-middle text-center text-4xl w-full mx-auto items-center border-double border-2 z-[100]">
          <button class="" onclick={() => rubikInstance.moveCameraFront()}>
            +
          </button>
          <button class="" onclick={() => rubikInstance.moveCameraBack()}>
            -
          </button>
          <button class="" onclick={() => rubikInstance.updateTitlePosition()}>
            update
          </button>
        </div> */}
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

export default Hero;
