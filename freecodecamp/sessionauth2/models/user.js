const mongoose = require('mongoose');
const { compareSync, hashSync } = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: username => User.doesNotExist({ username }),
            message: "Username already exists"
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: email => User.doesNotExist({ email }),
            message: "Email already exists"
        }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: password => passwordValidator(password),
        message: "Password must be at least 8 characters long"
      }
    }
})

function passwordValidator(password) {
    if(password.length < 8) return false;
    return true;
}

UserSchema.pre('save', function() {
    if(this.isModified('password')) {
        this.password = hashSync(this.password, 17);
    }
})
  
UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};
  
UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
};
  
const User = mongoose.model('User', UserSchema);

module.exports.default = User;