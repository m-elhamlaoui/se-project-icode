import GuardComponent from "@/components/Auth/GuardComponent";
import Layout from "@/components/Layout/Layout";
import Rides from "@/components/Ride/Rides";
import React from "react";
function page() {
  return (
    <GuardComponent>
      <Layout children={<Rides />} hideImage={true}></Layout>
    </GuardComponent>
  );
}

export default page;
