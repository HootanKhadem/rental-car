import React from "react";
import Hero from "@/src/features/hero/Hero.server";
import Assistant from "@/src/features/assistant/Assistant.server";
import Catalog from "@/src/features/catalog/Catalog.server";
import Membership from "@/src/features/membership/Membership.server";
import Footer from "@/src/features/footer/Footer.server";

const Home = () => {
  return (
    <main>
      <Hero />
      <Assistant />
      <Catalog />
      <Membership />
      <Footer />
    </main>
  );
};

export default Home;
