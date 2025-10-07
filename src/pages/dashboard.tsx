import { useContext } from "react";
import { MyContext } from "@/context/Context";
import { Switch } from "@heroui/react";

export default function Dashboard() {
  const { userLogged, isActive, setIsActive } = useContext(MyContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {userLogged.name || "User"}
      </h1>

      <h2 className="mb-6 text-gray-600">
        Role: {userLogged.role || "Guest"}
      </h2>

      <Switch isSelected={isActive} onValueChange={setIsActive}>
        Dark Mode
      </Switch>

      <p className="text-sm text-gray-500 mt-2">
        Estado actual: {isActive ? "Activo" : "Inactivo"}
      </p>
    </div>
  );
}