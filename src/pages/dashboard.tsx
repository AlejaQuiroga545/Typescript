"use client";

import { ToastContainer } from "react-toastify";
import { notification } from "@/helpers/utils";
import { MiButton } from "@/components/button/Button";
import { MdCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { useState } from "react";
import { getProperties, postProperty } from "../services/properties";

export default function Dashboard() {

  // Notificaciones de prueba
  const handleSuccessClick = () => {
    notification("Usuario creado correctamente", "success");
  };

  const handleErrorClick = () => {
    notification("Ha ocurrido un error", "error");
  };

  const handleInfoClick = () => {
    notification("Información entregada correctamente", "info");
  };

  const handleWarningClick = () => {
    notification("Precaución, usuario expuesto", "warn", 7000);
  };

  // Loader para botón Cancel 
  const [loader, setLoader] = useState(false);

  const handlerClick = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 3000);
  };

  // GET
  const [dataProperties, setDataProperties] = useState<any>(null);
  const [showData, setShowData] = useState(false); // controla si se despliegan los datos

  const handleClick = async () => {
    const response = await getProperties();
    setDataProperties(response);
    setShowData(true); // solo muestra cuando se hace click
  };

  // POST con formulario
  const [form, setForm] = useState({
    name: "",
    value: "",
    img: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // Los [] me permiten usar el valor de una variable como nombre de propiedad en un objeto.
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.value || !form.img) {
      notification("Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const response = await postProperty({
        name: form.name,
        value: Number(form.value),
        img: form.img,
      });

      notification("Propiedad guardada correctamente", "success");
      console.log("Saved:", response);

      // Limpia formulario
      setForm({ name: "", value: "", img: "" });

      // Mostrar datos cuando se ingresan
      handleClick();
    } catch (error) {
      notification("Error al guardar la propiedad", "error");
      console.error(error);
    }
  };

  // Renderizado
  return (
    <div className="dashboard">
      <h1>Welcome to your dashboard</h1>

      {/* Botones de prueba */}
      <div className="buttons">
        <button className="btn success-btn" onClick={handleSuccessClick}>
          Show success
        </button>
        <button className="btn error-btn" onClick={handleErrorClick}>
          Show error
        </button>
        <button className="btn wrg-btn" onClick={handleWarningClick}>
          Show warning
        </button>
        <button className="btn inf-btn" onClick={handleInfoClick}>
          Show info
        </button>

        <MiButton
          text={"Save"}
          icon={<IoIosSave />}
          click={() => notification("Guardado exitosamente", "success")}
        />
        <MiButton
          text={"Cancel"}
          icon={<MdCancel />}
          loading={loader}
          click={handlerClick}
        />

        <button className="btn inf-btn" onClick={handleClick}>
          Call endpoint
        </button>
      </div>

      {/* Formulario para agregar nueva propiedad */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="value"
          placeholder="Value"
          value={form.value}
          onChange={handleChange}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={form.img}
          onChange={handleChange}
        />
        <button type="submit" className="btn success-btn">
          Add property
        </button>
      </form>

      {/* Mostrar data solo si se presionó Call endpoint */}
      {showData && dataProperties?.ok && (
        <div className="data">
          {dataProperties.miInfo?.map((property: any) => (
            <div key={property._id}>
              <div>{property.name}</div>
              <div>{property.value}</div>
              <img src={property.img} alt={property.name} />
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}