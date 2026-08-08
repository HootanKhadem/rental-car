import React from "react";
import Hero from "@/src/features/hero/Hero.server";
import Assistant from "@/src/features/assistant/Assistant.server";

const Home = () => {
  return (
    <main>
      <Hero />
      <Assistant />
    </main>
  );
};

export default Home;
