import type { ParentComponent } from "solid-js";

const Background: ParentComponent = (props) => {
  return (
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 scroll-snap-y snap-center overflow-y-scroll scroll-snap-align-start">
      {props.children}
    </div>
  );
};

export default Background;
