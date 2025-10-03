export class userServices {
  url: string = "http://localhost:3000";

  async getUsers() {
    try {
      const result = await fetch(`${this.url}/api/hello`);

      if (!result.ok) {
        throw new Error("Error fetching users");
      }

      const data = await result.json(); // 👈 Aquí parseamos
      return data; // { users: [...] }
    } catch (error) {
      console.error("Fetch failed:", error);
      return { users: [] }; // 👈 Devuelve vacío si hay error
    }
  }
}