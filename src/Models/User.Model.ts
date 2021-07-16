import { Schema, model, HookNextFunction, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface User extends Document {
  name: string
  email: string
  password: string
  firstName: string
  lastName: string
  mobileNumber: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<User>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, unique: true, required: true }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next: HookNextFunction) {
  const UserDocument: User = this
  if (UserDocument.isModified('password')) {
    const hash = await bcrypt.hash(UserDocument.password, 10)
    UserDocument.password = hash
  }
  return next()
})

userSchema.methods.comparePassword = async function (plainPassword: string) {
  const UserDocument: User = this
  return bcrypt.compare(plainPassword, UserDocument.password)
}

const UserModel = model<User>('User', userSchema, 'users')

export default UserModel
