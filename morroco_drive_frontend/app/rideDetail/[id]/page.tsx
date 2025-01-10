"use client";
import React from "react";

import GuardComponent from "@/components/Auth/GuardComponent";
import Layout from "@/components/Layout/Layout";
import RideDetail from "@/components/RideDetail/RideDetail";

function page({ params }: { params: { id: number } }) {
  return (
    <GuardComponent>
      <Layout children={<RideDetail id={params.id} />} hideImage={true}></Layout>
    </GuardComponent>
  );
}

export default page;
