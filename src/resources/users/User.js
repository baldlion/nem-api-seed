import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true
  },
  password: String
})

function comparePassword (attemptedPassword, cb) {
  bcrypt.compare(attemptedPassword, this.password, (error, isMatch) => {
    if (error) {
      cb(new Error(error))
    }

    cb(isMatch)
  })
}

function beforeSave (next, done) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10, function (error, hash) {
      if (error) {
        next(new Error(error))
      }

      this.password = hash
      next()
    })
  } else {
    next()
  }
}

UserSchema.plugin(timestamps)
UserSchema.pre('save', beforeSave)
UserSchema.methods.comparePassword = comparePassword

export default mongoose.model('User', UserSchema)
