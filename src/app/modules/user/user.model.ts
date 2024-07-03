import { Schema, model } from 'mongoose';
import { TAddress, TUser, TUserName } from './user.interface';
import { user_gender, user_role, user_status } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

// Define the Mongoose schema for UserName
const UserNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    }
},
    {
        _id: false
    }
);

const AddressSchema = new Schema<TAddress>({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },

    country: {
        type: String,
        required: [true, 'Country is required']
    },

},
    {
        _id: false
    }
)

// Define the Mongoose schema for User
const userSchema = new Schema<TUser>({
    name: {
        type: UserNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: user_gender,
            message: 'Gender must be one of: male, female, other'
        },
        required: [true, 'Gender is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        minlength: [10, 'Phone number must be at least 10 characters long'],
        maxlength: [15, 'Phone number cannot exceed 15 characters']
    },
    role: {
        type: String,
        enum: {
            values: user_role,
            message: 'Role must be either admin or user'
        },
        required: [true, 'Role is required']
    },
    address: AddressSchema,
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: user_status,
        default: 'active'
    }
}, { timestamps: true });

//! Hashed the password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
    next();
})

//! remove the password field in the response
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

//! not getting the deleted user
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

//! not getting the blocked user
userSchema.pre('find', function (next) {
    this.find({ status: { $ne: 'blocked' } });
    next();
});

userSchema.pre('findOne', function (next) {
    this.find({ status: { $ne: 'blocked' } });
    next();
});

// Create the Mongoose model
const User = model<TUser>('User', userSchema);

export default User;
