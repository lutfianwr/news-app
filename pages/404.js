import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import myPic from "../assets/404.svg";
import Layout from "../components/Layout";

const error = () => {
  return (
    <Container sx={{ textAlign: "center" }}>
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
      <Link href="/">Go back home</Link>
    </Container>
  );
};

export default error;
