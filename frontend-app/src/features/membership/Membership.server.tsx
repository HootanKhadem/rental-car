import React from "react";
import MembershipClient from "./Membership.client";

export default function MembershipServer() {
  return (
    <section
      id="membership"
      aria-labelledby="membership-title"
      className="py-12 lg:py-20 bg-background-green-section2 border-y border-divider-line"
    >
      <div className="container mx-auto px-4">
        <MembershipClient />
      </div>
    </section>
  );
}
