import { Schema, model } from 'mongoose';
import { Types } from 'mongoose';
import { TBooking } from './booking.interface';
import { bookingStatus } from './booking.constant';

const BookingSchema: Schema = new Schema({
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    facility: {
        type: Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    payableAmount: {
        type: Number,
        required: true
    },
    isBooked: {
        type: String,
        enum: bookingStatus,
        required: true,
        default: 'confirmed'
    }
});

const Booking = model<TBooking>('Booking', BookingSchema);

export default Booking;
