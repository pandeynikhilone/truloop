import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        points: {                                
            type: Number,
            default: 0,
        },
        reviewedProducts: [                      
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        coupons: [                                   
            {
                code: String,
                discount: Number,
                expiryDate: Date,
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;                          
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;