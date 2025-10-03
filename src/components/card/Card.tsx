import React from "react";
import { PiArrowCircleUpRightFill } from "react-icons/pi";
import Image from "next/image";

interface CardProps {
  backgroundColor: string;
  title: string;
  titleBackgroundColor: string;
  buttonText: string;
  image: string;
  onClick?: () => void;
}

function Card({backgroundColor,title,titleBackgroundColor,buttonText,image,onClick}: CardProps) {
  return (
    <div className="card" style={{ backgroundColor }}>
      {/* Texto */}
      <div className="text-container">
        <h2
          className="title"
          style={{ backgroundColor: titleBackgroundColor }}
        >
          {title}
        </h2>

        <button
            onClick={onClick}
            className="button"
            style={{ color: backgroundColor === "#191A23" ? "#fff" : "#000" }}
            >
            <span className="icon">
                <PiArrowCircleUpRightFill />
            </span>
            {buttonText}
        </button>
      </div>

      {/* Imagen optimizada */}
      <div>
        <Image src={image} alt={title} width={190} height={190} className="image" />
      </div>
    </div>
  );
}

export default Card;