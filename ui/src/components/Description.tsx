import type { Component } from "solid-js";

const Description: Component = () => {
  return (
    <div
      class={"transform pl-0 sm:ml-[50%] pb-10 w-1/2 snap-center min-h-screen"}
    >
      <h3 class="mx-4 p-8 pl-0 text-3xl text-white font-bold uppercase">
        What we are ?
      </h3>
      <div class="p-8 pl-0 font-poppins text-xl text-transparent bg-clip-text text-justify bg-gradient-radial from-sky-500 via-sky-600 to-sky-500">
        <p class="mb-4">
          <span class="font-bold">Founding Partner</span> is a social media
          platform designed for entrepreneurs and startup enthusiasts to connect
          and collaborate. Whether you're looking for a co-founder, a mentor, or
          just someone with similar interests, we makes it easy to find that one
          person who shares your passion and vision.
        </p>
        <p class="mb-4">
          With a simple and intuitive interface, you can create a profile,
          showcase your skills and expertise, and browse through a diverse
          community of like-minded individuals. Our powerful matching algorithm
          uses advanced technology to help you find the perfect partner based on
          your interests, experience, and goals.
        </p>
        <p class="mb-4">
          Join <span class="font-bold">Founding Partner</span> today and take
          the first step towards turning your startup idea into a reality!
        </p>
      </div>
      <h4 class="mx-4 p-8 pl-0 text-2xl text-white font-bold uppercase">
        What we are not ?
      </h4>
      <div class="p-8 pl-0 font-poppins text-xl text-transparent bg-clip-text text-justify bg-gradient-radial from-sky-500 via-sky-600 to-sky-500">
        <p class="mb-4">
          <span class="font-bold">Founding Partner</span> is not here to compete
          with social media platforms like Twitter, LinkedIn, Facebook, or
          GitHub. Our objective is to complement these tools by empowering you
          to present your skills, refine your potential, and collaborate on
          innovative ideas with like-minded individuals. These connections can
          transform into strong partnerships, where co-founders share the same
          beliefs and are committed to moving forward together to launch a
          successful startup.
        </p>
        <p class="mb-4">
          <span class="font-bold">Founding Partner</span> believes in you even
          before you do.
        </p>
        <p class="mb-4">
          Our purpose is to enhance your entrepreneurial experience by providing
          a focused space for collaboration, networking, and growth. By
          connecting people on similar journeys, we facilitate the formation of
          invaluable relationships that have proven crucial for many successful
          startups when searching for partners and funding.
        </p>
        <p class="mb-4">
          At <span class="font-bold">Founding Partner</span>, we concentrate on
          building meaningful connections and nurturing a supportive environment
          where entrepreneurs can flourish. We are here to help you assemble
          your ideal team, find the right resources, and turn your startup idea
          into reality. Become a part of Founding Partner today, and embrace a
          platform that enables you to reach your entrepreneurial aspirations.
        </p>
      </div>
    </div>
  );
};

export default Description;
