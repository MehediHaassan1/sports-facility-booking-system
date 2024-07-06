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

//! check the facilities is deleted or not...
facilitySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

//! check the facility is deleted or not...
facilitySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

//! check the facility is deleted or not for update...
facilitySchema.pre('findOneAndUpdate', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});


const Facility = model<TFacility>('Facility', facilitySchema);


export default Facility;