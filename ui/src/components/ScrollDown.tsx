import type { Component } from "solid-js";
import { createSignal, onMount, onCleanup } from "solid-js";

const ScrollDown: Component = () => {
  const [scrollPos, setScrollPos] = createSignal(0);
  const [showArrow, setShowArrow] = createSignal(true);

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const totalScroll = scrollTop + windowHeight;

    const scrollPercent = totalScroll / documentHeight;

    setScrollPos(scrollPercent);

    if (scrollPercent > 0.9) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  };

  return (
    <div
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
      style={{ opacity: showArrow() ? 1 : 0 }}
    >
      <div class="mb-2 text-white font-bold text-xl text-center">
        <div>Scroll</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <div
        class={`h-1 w-24 rounded-full overflow-hidden relative bg-gray-500 ${
          scrollPos() > 0 ? "bg-white" : ""
        }`}
      >
        <div
          class={`h-full w-full absolute top-0 left-0 bg-blue-500 transition-all duration-500 ease-in-out ${
            scrollPos() > 0 ? "w-3/4" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ScrollDown;
