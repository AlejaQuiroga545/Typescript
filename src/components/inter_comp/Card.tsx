import React, { useState } from "react";
import Image from "next/image";
import { PiArrowCircleUpRightFill } from "react-icons/pi";
import Badge from "./Badge";
import { toast } from "react-toastify";

interface CardProps {
  title: string;
  buttonText: string;
  image: string;
  badgeText: string;
  badgeStatus: "success" | "warning" | "info" | "error" | "neutral";
}

function Card({ title, buttonText, image, badgeText, badgeStatus }: CardProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(`${title.replace("\n", " ")} loaded! 🎉`);
    }, 2000);
  };

  return (
    <div className="card">
      <div className="text-container">
        <Badge text={badgeText} status={badgeStatus} />

        <h2 className="title">{title}</h2>

        <button
          onClick={handleClick}
          className="button"
          disabled={loading}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <span className="icon">
                <PiArrowCircleUpRightFill />
              </span>
              {buttonText}
            </>
          )}
        </button>
      </div>

      <div>
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="image"
        />
      </div>
    </div>
  );
}

export default Card;