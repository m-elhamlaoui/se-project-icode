import RegisterDriverForm from "@/components/Auth/RegisterDriverForm";
import Layout from "@/components/Layout/Layout";
import React from "react";

function page() {
  return (

    <Layout children={<RegisterDriverForm />} hideImage={true}></Layout>

  );
}

export default page;
