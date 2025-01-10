import LoginForm from "@/components/Auth/LoginForm";
import Layout from "@/components/Layout/Layout";
import React from "react";

function page() {
  return (

    <Layout children={<LoginForm />} hideImage={true}></Layout>

  );
}


export default page;
