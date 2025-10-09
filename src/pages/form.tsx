import React, { FormEvent, useState } from "react";
import { Form, Input, Button, Checkbox } from "@heroui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tipado de los datos del formulario
interface FormData {
  name: string;
  lastname:string;
  occupation:string;
  email: string;
  age: string;
}

// Tipado de posibles errores
interface ValidationErrors {
  name?: string;
  lastname?:string;
  occupation?:string;
  email?: string;
  age?: string;
  terms?: string;
  [key: string]: string | undefined;
}

// Componente principal
function UserForm() {
  const [age, setAge] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState<FormData | null>(null);

  // Valida el campo age
  const getAgeError = (value: string): string | null => {
    const ageNum = parseInt(value, 10);
    if (isNaN(ageNum) || ageNum < 18) {
      return "You must be 18 or older.";
    }
    return null;
  };

  // Maneja el envío del formulario
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as FormData;
    console.log(data)

    const newErrors: ValidationErrors = {};

    // Validación de la edad
    const ageError = getAgeError(data.age);
    if (ageError) newErrors.age = ageError;

    // Validación de email
    if (!data.email.includes("@")) {
      newErrors.email = "Email must include '@'.";
    }

    // Validación de nombre
    if (!data.name || !data.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Validación de apellido
    if (!data.lastname || !data.lastname.trim()) {
      newErrors.lastname = "Lastname is required.";
    }

    // Validación de ciudad
    if (!data.occupation || !data.occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
    }

    // Validación de términos
    const termsAccepted = formData.get("terms") === "true";
    if (!termsAccepted) {
      newErrors.terms = "Please accept the terms and conditions.";
    }

    // Si hay errores, mostrar mensaje y no enviar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    // Si todo está bien, limpiar errores y mostrar mensaje de éxito
    setErrors({});
    setSubmitted(data);
    toast.success("Form submitted successfully!");
  };

  return (
    <>
      <div className="form-container">
        <h2>User registration</h2>

        <Form
          className="heroui-form"
          validationErrors={errors}
          onReset={() => {
            setSubmitted(null);
            setErrors({});
            setAge("");
          }}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-6 max-w-md w-full">
            {/* Campo Name */}
            <Input
              isRequired
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
              classNames={herouiInputClasses}
            />

            {/* Campo Lastname */}
            <Input
              isRequired
              isInvalid={!!errors.lastname}
              errorMessage={errors.lastname}
              label="Lastname"
              labelPlacement="outside"
              name="lastname"
              placeholder="Enter your lastname"
              classNames={herouiInputClasses}
            />

            {/* Campo Occupation */}
            <Input
              isRequired
              isInvalid={!!errors.occupation}
              errorMessage={errors.occupation}
              label="Occupation"
              labelPlacement="outside"
              name="occupation"
              placeholder="Enter your occupation"
              classNames={herouiInputClasses}
            />

            {/* Campo Email */}
            <Input
              isRequired
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              classNames={herouiInputClasses}
            />

            {/* Campo Age */}
            <Input
              isRequired
              isInvalid={!!errors.age || getAgeError(age) !== null}
              errorMessage={errors.age || getAgeError(age)}
              label="Age"
              labelPlacement="outside" 
              name="age"
              placeholder="You must be 18 or older"
              type="number"
              value={age}
              onValueChange={setAge}
              classNames={herouiInputClasses}
            />

            {/* Checkbox Terms */}
            <Checkbox
              isRequired
              classNames={{
                wrapper: "heroui-checkbox-wrapper",
                label: "text-small",
                base: "heroui-checkbox-base",
              }}
              isInvalid={!!errors.terms}
              name="terms"
              validationBehavior="aria"
              value="true"
              onValueChange={() =>
                setErrors((prev) => ({ ...prev, terms: undefined }))
              }
            >
              I accept the terms and conditions
            </Checkbox>

            {/* Mostrar error de términos */}
            {errors.terms && (
              <span className="text-danger text-small">{errors.terms}</span>
            )}

            {/* Botones */}
            <div className="flex gap-4 pt-2">
              <Button className="heroui-button w-full" color="primary" type="submit">
                Submit
              </Button>
              <Button
                type="reset"
                variant="bordered"
                className="heroui-button heroui-button-reset"
              >
                Clear
              </Button>
            </div>
          </div>
        </Form>
      </div>

      {/* Datos enviados */}
      {/* {submitted && (
        <div className="text-small text-default-500 mt-4 text-center">
          Submitted Data:
          <pre className="p-3 bg-gray-100 rounded-lg max-w-md mx-auto text-black">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )} */}

      <ToastContainer position="bottom-center" autoClose={4000} />
    </>
  );
}

export default UserForm;

// Clases personalizadas para los inputs (solo línea inferior)
const herouiInputClasses = {
  inputWrapper: [
    "heroui-input-line",
    "!bg-white",
    "!border-none",
    "shadow-none",
    "rounded-none",
    "border-b-2",
    "border-gray-300",
    "transition-all",
  ],
  input: ["!bg-transparent"],
};