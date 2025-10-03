import React from "react";
import Card from "../components/card/Card";

const Landing = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop:"60px",
        justifyContent: "center",
        flexWrap:"wrap",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
        <Card
          title={"Search engine\n optimizations"}
          buttonText="Learn more"
          image="/images/01_Search engine.png"
          backgroundColor="#F3F3F3"
          titleBackgroundColor="#B9FF66"
        />
        <Card
          title={"Pay-per-click\n advertising"}
          buttonText="Learn more"
          image="/images/Illustration.png"
          backgroundColor="#B9FF66"
          titleBackgroundColor="#F3F3F3"
        />
        <Card
          title={"Social Media\n Marketing"}
          buttonText="Learn more"
          image="/images/03.png"
          backgroundColor="#191A23"
          titleBackgroundColor="#FFFFFF"
        />
        <Card
          title={"Email\n Marketing"}
          buttonText="Learn more"
          image="/images/04.png"
          backgroundColor="#F3F3F3"
          titleBackgroundColor="#B9FF66"
        />
        <Card
          title={"Content\n Creation"}
          buttonText="Learn more"
          image="/images/05.png"
          backgroundColor="#B9FF66"
          titleBackgroundColor="#F3F3F3"
        />
        <Card
          title={"Analytics and\n Tracking"}
          buttonText="Learn more"
          image="/images/06.png"
          backgroundColor="#191A23"
          titleBackgroundColor="#B9FF66"
        />
    </div>
  );
};

export default Landing;
