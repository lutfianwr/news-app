import Image from "next/image";
import React from "react";
import myPic from "../assets/404.svg";
import Layout from "../components/Layout";

const error = () => {
  return (
    <Layout>
      <div className="content">
        <a href="https://storyset.com/web">
          <Image
            priority={true}
            height={400}
            width={400}
            alt="error"
            src={myPic}
          />
        </a>
      </div>
    </Layout>
  );
};

export default error;
