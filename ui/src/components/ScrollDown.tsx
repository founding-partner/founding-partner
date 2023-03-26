import type { Component } from "solid-js";
import { createEffect } from "solid-js";

type Props = {
  scrollPosition: number;
};

const ScrollDown: Component<Props> = (props) => {

  return (
    <div
      class={`w-full fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center ${
        props.scrollPosition > 0.9 ? "ml-1/2 mt-10" : "mt-20"
      }`}
    >
      <div
        class="mb-2 text-white font-bold text-xl text-center flex flex-col justify-items-center"
        style={{ opacity: !(props.scrollPosition > 0.4) ? 1 : 0 }}
      >
        <div>Scroll</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white animate-bounce mx-auto my-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <div
        class={`h-1 w-full rounded-full overflow-hidden relative bg-gray-500 ${
          props.scrollPosition > 0 ? "bg-white" : ""
        }`}
      >
        <div
          class={"h-full absolute top-0 left-0 bg-blue-500 transition-all duration-500 ease-in-out"}
          style={{width: `${props.scrollPosition * 100}%`}}
        />
      </div>
    </div>
  );
};

export default ScrollDown;
