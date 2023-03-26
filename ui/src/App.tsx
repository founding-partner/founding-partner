import type { Component } from "solid-js";
import Background from "./components/Background";
import Title from "./components/Title";

const App: Component = () => {
  return (
    <Background>
      <Title />
    </Background>
  );
};

export default App;
