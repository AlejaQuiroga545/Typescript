import type { NextApiRequest, NextApiResponse } from "next";
import Properties from "@/database/models/properties"; // Modelo de mongoose
import dbConnection from "@/lib/dbconection";

interface Property {
  ok: boolean;
  _id?: string;
  name?: string;
  value?: number;
  img?: string;
  message?: string;
  data?: Property[];
  createdId?: string;
  updatedId?:string;
  miInfo?:Property[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property>
) {
  try {
    if (req.method === "GET") {
      await dbConnection();

      const data = await Properties.find();

      console.log(data);
      res.status(200).json({
        ok: true,
        miInfo: data as Property[],
      });
    }

    if (req.method === "POST") {
      await dbConnection();

      console.log("Resultado:", req.body);
      const { name, value, img } = req.body;

      console.log(name);
      console.log(value);
      console.log(img);

      const newProperty = new Properties({
        name,
        value,
        img,
      });

      const savedProperty = await newProperty.save();

      console.log(savedProperty);

      return res.status(200).json({
        ok: true,
        message: "Property saved",
        createdId: savedProperty._id,
      });
    }

    if (req.method === "PUT") {
        await dbConnection()
        const {id, name, value, img} = req.body
        console.log(id, name, value, img)

        const propertyUpdate = await Properties.findByIdAndUpdate(
            id, {
                name,value,img
            },
            { new: true } 
        )
        console.log(propertyUpdate)

        res.status(200).json({
        ok: true,
        message: "Property updated",
        updatedId:propertyUpdate?._id
      });
    }

    if (req.method === "DELETE") {

      await dbConnection();
      const id = req.query.id as string;

      const deletedProperty = await Properties.findByIdAndDelete(id);

      return res.status(200).json({
        ok: true,
        message: "Property deleted",
        _id: deletedProperty?._id,
      });
    }
        // res.status(200).json({name:"Funciona el put"})
    


    // Si llega otro método no contemplado
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
}