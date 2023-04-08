import { Component, createSignal, onMount, onCleanup } from "solid-js";
import Background from "./components/Background";
import Description from "./components/Description";
import ScrollDown from "./components/ScrollDown";
import Hero from "./components/Hero";

const App: Component = () => {
  const [scrollPos, setScrollPos] = createSignal(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const totalScroll = scrollTop + windowHeight;
    // when there is a scroll, then lets consider that the page has been scrolled till its window height. otherwise, it will be zero.
    const scrollPercent = scrollTop > 0 ? totalScroll / documentHeight : 0;

    // console.log("scrollPercent", { scrollPercent });
    setScrollPos(scrollPercent);
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div class="text-white">
      <Background>
        <Hero scrollPosition={scrollPos()} />
        <Description />
        <ScrollDown scrollPosition={scrollPos()} />
      </Background>
    </div>
  );
};

export default App;
