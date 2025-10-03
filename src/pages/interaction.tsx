import React from "react";
import Card from "../components/inter_comp/Card";
import { ToastContainer } from "react-toastify";

const Interaction = () => {
  return (
    <div className="interaction-container">
      <h1 className="interaction-title">Digital Marketing Services</h1>

      <div className="cards-grid">
        <Card
          title={"Search engine\n optimization"}
          buttonText="Learn more"
          image="/images/01_Search engine.png"
          badgeText="SEO"
          badgeStatus="success"
        />
        <Card
          title={"Pay-per-click\n advertising"}
          buttonText="Learn more"
          image="/images/Illustration.png"
          badgeText="PPC"
          badgeStatus="info"
        />
        <Card
          title={"Social Media\n Marketing"}
          buttonText="Learn more"
          image="/images/03.png"
          badgeText="Social"
          badgeStatus="warning"
        />
        <Card
          title={"Email\n Marketing"}
          buttonText="Learn more"
          image="/images/04.png"
          badgeText="Email"
          badgeStatus="error"
        />
        <Card
          title={"Content\n Creation"}
          buttonText="Learn more"
          image="/images/05.png"
          badgeText="Content"
          badgeStatus="neutral"
        />
        <Card
          title={"Analytics and\n Tracking"}
          buttonText="Learn more"
          image="/images/06.png"
          badgeText="Data0"
          badgeStatus="success"
        />
      </div>

      {/* Contenedor de Toastify */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default Interaction;