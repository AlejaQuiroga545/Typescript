"use client";

import { ToastContainer } from "react-toastify";
import { notification } from "@/helpers/utils";
import { MiButton } from "@/components/button/Button";
import { MdCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { useState } from "react";
import {
  getProperties,
  postProperty,
  putProperty,
  deleteProperty,
} from "../services/properties";

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

  //Loader para botón Cancel
  const [loader, setLoader] = useState(false);

  const handlerClick = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 3000);
  };

  //GET
  const [dataProperties, setDataProperties] = useState<any>(null);
  const [showData, setShowData] = useState(false);

  const handleClick = async () => {
    const response = await getProperties();
    setDataProperties(response);
    setShowData(true);
  };

  //POST - PUT

  const [form, setForm] = useState({
    id: "",
    name: "",
    value: "",
    img: "",
  });

  const [isEditing, setIsEditing] = useState(false); // controla si estamos editando

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.value || !form.img) {
      notification("Todos los campos son obligatorios", "error");
      return;
    }

    try {
      if (isEditing) {
        // PUT
        await putProperty({
          id: form.id,
          name: form.name,
          value: Number(form.value),
          img: form.img,
        });
        notification("Propiedad actualizada correctamente", "success");
      } else {
        // POST
        await postProperty({
          name: form.name,
          value: Number(form.value),
          img: form.img,
        });
        notification("Propiedad guardada correctamente", "success");
      }

      // limpiar formulario y estado de edición
      setForm({ id: "", name: "", value: "", img: "" });
      setIsEditing(false);

      // refrescar lista
      handleClick();
    } catch (error) {
      console.error("Error guardar/actualizar:", error);
      notification("Error al guardar la propiedad", "error");
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    const confirmed = confirm("¿Seguro que quieres eliminar esta propiedad?");
    if (!confirmed) return;

    try {
      await deleteProperty(id);
      notification("Propiedad eliminada", "success");

      // actualización sin recargar todo
      setDataProperties((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          miInfo: prev.miInfo.filter((p: any) => p._id !== id),
        };
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      notification("Error al eliminar la propiedad", "error");
    }
  };

  // EDIT
  const handleEdit = (property: any) => {
    setForm({
      id: property._id,
      name: property.name,
      value: String(property.value),
      img: property.img,
    });
    setIsEditing(true);
    // opcional: mostrar la lista si estaba oculta
    setShowData(true);
  };

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

      {/* Formulario para crear/editar propiedad */}
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
          {isEditing ? "Update property" : "Add property"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn error-btn"
            onClick={() => {
              setForm({ id: "", name: "", value: "", img: "" });
              setIsEditing(false);
            }}
          >
            Cancel edit
          </button>
        )}
      </form>

      {/* Mostrar data solo si se presionó Call endpoint */}
      {showData && dataProperties?.ok && (
        <div className="data">
          {dataProperties.miInfo?.map((property: any) => (
            <div key={property._id} className="property-card">
              <div>{property.name}</div>
              <div>{property.value}</div>
              <img src={property.img} alt={property.name} />

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  className="btn inf-btn"
                  onClick={() => handleEdit(property)}
                >
                  Edit
                </button>
                <button
                  className="btn error-btn"
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}