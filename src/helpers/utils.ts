// utils.ts
import { Bounce, toast } from "react-toastify";

export const notification = (text: string, type: string, time:number=5000) => {
  console.log("El texto es", text);
  console.log("El tipo es", type);
  console.log("El tiempo es",time)

  if (type === "success") {
    toast.success(text, {
      position: "bottom-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });
  }

  if (type === "error") {
    toast.error(text, {
      position: "bottom-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });
  }

  if (type === "info") {
    toast.info(text, {
      position: "bottom-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });
  }

  if (type === "warn") {
    toast.warn(text, {
      position: "bottom-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });
  }
};