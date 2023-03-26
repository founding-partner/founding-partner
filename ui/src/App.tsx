import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import Background from "./components/Background";
import Title from "./components/Title";
import ScrollDown from "./components/ScrollDown";

const App: Component = () => {
  const [scrollPosition, setScrollPosition] = createSignal(0);

  createEffect(() => {
    const onScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <div class="relative">
      <Background>
        <Title scrollPosition={scrollPosition()} />
      </Background>
      
      <ScrollDown />
    </div>
  );
};

export default App;
