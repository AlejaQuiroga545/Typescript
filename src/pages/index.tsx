"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "../utils/auth";
import { userServices } from "./services/users";

// Interfaz para tipar los usuarios
interface User {
  name: string;
  age: number;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [usersList, setUsersList] = useState<User[]>([]);

  const handleClick = async () => {
    const userClass = new userServices();
    const data = await userClass.getUsers(); // { users: [...] }

    console.log("Usuarios recibidos:", data.users);

    setUsersList(data.users);
  };

  useEffect(() => {
    console.log("Users list updated:", usersList);
  }, [usersList]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (authenticate(username, password)) {
      setMessage("✅ Login successful!");
      router.push("/dashboard");
    } else {
      setMessage("❌ Oops, invalid credentials!");
    }
  };

  // GENÉRICOS
  function identify<T>(parametro: T): T {
    return parametro;
  }

  const result = identify<number>(15); //Tipo de dato que quiero que reciba T
  console.log(result);

  const arrayNum = [2, 54, 6, 8, 3, 4];
  const arrayStrg = ["A", "B", "C", "D"];
  const arrayBln = [true, false];

  const result2 = identify<string>("A");
  console.log(result2);

  const result3 = identify<boolean>(true);
  console.log(result3);

  const returnLastElement = <T,>(array: T[]): T => {
    // Retornamos el último elemento
    return array[array.length - 1];
  };

  // EJERCICIO 2 | Retornar elementos en reversa

  const revers = <T,>(array: T[]): T[] => {
    return [...array].reverse();
  };

  const reverStrg = revers(["A", "B", "C", "D"]);
  console.log(reverStrg);

  const reverBool = revers([true, false]);
  console.log(reverBool);

  const reverNumber = revers([13, 11, 16, 17]);
  console.log(reverNumber);

  const lastNum = returnLastElement(arrayNum);
  console.log("Último número:", lastNum); // 4

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Hello user</h1>
        <h3>Please log in to continue</h3>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="log" type="submit">
            Login
          </button>
        </form>

        {message && <p>{message}</p>}
        <br />
        <button className="get" onClick={handleClick}>
          Get user
        </button>

        <div>
          {usersList.map(
            (
              item,
              index // Recorre el array usersList y devuelve un bloque por cada usuario
            ) => (
              <div key={index}>
                {" "}
                {/* Bloque individual de cada usuario; "key" ayuda a React a identificar cada elemento */}
                <div>{item.name}</div> {/* Renderiza el nombre del usuario */}
                <div>{item.age}</div> {/* Renderiza la edad del usuario */}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
