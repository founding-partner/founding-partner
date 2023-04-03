import type { Component } from "solid-js";

const Description: Component = () => {
  return (
    <div class={"transform pl-0 md:pl-[50%] pb-10 w-full snap-center min-h-screen"}>
      <div class="m-4 p-4 font-poppins text-xl text-transparent bg-clip-text text-justify border-0 rounded-3xl bg-gradient-radial from-sky-500 via-sky-600 to-sky-500">
        <p>
          Founding-Partner is a social media platform designed for entrepreneurs
          and startup enthusiasts to connect and collaborate. Whether you're
          looking for a co-founder, a mentor, or just someone with similar
          interests, Founding-Partner makes it easy to find that one person who
          shares your passion and vision.
        </p>
        <p>
          With a simple and intuitive interface, you can create a profile,
          showcase your skills and expertise, and browse through a diverse
          community of like-minded individuals. Our powerful matching algorithm
          uses advanced technology to help you find the perfect partner based on
          your interests, experience, and goals.
        </p>
        <p>
          Join Founding-Partner today and take the first step towards turning
          your startup idea into a reality!
        </p>
      </div>
    </div>
  );
};

export default Description;
