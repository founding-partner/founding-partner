import type { ParentComponent } from "solid-js";

const Background: ParentComponent = (props) => {
  return (
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {props.children}
    </div>
  );
};

export default Background;
