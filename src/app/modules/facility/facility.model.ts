import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";


const facilitySchema = new Schema<TFacility>({
    name: { type: String, required: true },
    description: { type: String, required: true, minlength: 30, maxlength: 200 },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
},
    {
        timestamps: true,
    }
);

const Facility = model<TFacility>('Facility', facilitySchema);


export default Facility;