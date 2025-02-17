const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    key: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
AdminSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        if (this.isModified("key")) {
            this.key = await bcrypt.hash(this.key, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

AdminSchema.methods.compareKey = async function (candidateKey) {
    return bcrypt.compare(candidateKey, this.key);
};

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
