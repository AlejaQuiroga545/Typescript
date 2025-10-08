import { ToastContainer } from "react-toastify";
import { Button, Input, Switch } from "@heroui/react";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { notification } from "@/helpers/utils";
import { MyContext } from "@/context/Context";

const userLogueado = {
  name: "aleja",
  role: "admin",
  isActive: true,
  date: "24/12/2025",
};

export default function Home() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // Contexto global
  const { setUserLogged, setIsActive, isActive } = useContext(MyContext);

  const router = useRouter();

  const handleClick = async () => {
    if (user === "aleja" && pass === "123456") {
      setUserLogged(userLogueado);
      notification("✅ Login exitoso", "success");
      router.push("./dashboard");
    } else {
      notification("❌ Usuario o contraseña incorrectos", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          User
        </label>
        <Input
          label="User"
          placeholder="Enter your user"
          type="text"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />

        {/* Switch HeroUI */}
        <div className="mt-6">
          <Switch isSelected={isActive} onValueChange={setIsActive}>
            Dark Mode
          </Switch>
          <p className="text-sm text-gray-500 mt-1">
            Estado actual: {isActive ? "Activo" : "Inactivo"}
          </p>
        </div>

        <Button onPress={handleClick} className="mt-7 w-full" color="primary">
          Login
        </Button>
      </div>
    </div>
  );
}