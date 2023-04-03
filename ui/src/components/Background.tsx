import type { ParentComponent } from "solid-js";
// import { onMount } from "solid-js";

const Background: ParentComponent = (props) => {
  // onMount(() => {
  //   // const rubikCube = new Rubik();
  //   // rubikCube.init("#canvas-container");
  //   // rubikCube.animate();
  // });

  return (
    <div
      id="canvas-container"
      class="min-h-screen bg-fixed bg-gradient-radial from-gray-800 via-gray-890 to-gray-900 overflow-y-auto"
    >
      {props.children}
    </div>
  );
};

// import { ParentComponent, createEffect, createSignal } from "solid-js";
// import { Rubik } from "../lib/Rubik";

// const Background: ParentComponent = (props) => {

//   createEffect(() => {
//     if (canvas()) {
//       const renderer = new Rubik(canvas());
//       renderer.render();
//     }
//   });

//   return (
//     <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
//       <canvas
//         ref={(el) => {
//           setCanvas(el);
//         }}
//         class="w-full h-full absolute top-0 left-0 z-0"
//       />
//       {props.children}
//     </div>
//   );
// };

export default Background;
