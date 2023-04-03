import { onCleanup, onMount } from "solid-js";
import RubikClass from "../lib/Rubik";

function Rubik() {
  let rubikInstance: RubikClass;

  onMount(() => {
    rubikInstance = new RubikClass();
  });

  onCleanup(() => {
    // rome-ignore lint/style/noNonNullAssertion: <explanation>
    rubikInstance = null!;
  });

  return (
    <canvas id="rubikCubeCanvas" style={{ width: "22.5rem", height: "22.5rem" }} />
  );
}

export default Rubik;
