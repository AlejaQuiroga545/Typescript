import { User } from "../interfaces/User";
import { users } from "@/data/users";

export function authenticate (username:string, password:string):boolean{
    const user = users.find (
        (u: User) => u.username === username && u.password === password
    );
    return !! user // Con el !! (doble negación) convierto user a booleano para que me retorne true si es un valor thruthy y false si es falsy.
}