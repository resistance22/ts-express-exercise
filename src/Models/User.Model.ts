import { Schema, model, HookNextFunction, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface User extends Document {
  name: string
  email: string
  password: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
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

const UserModel = model<User>('User', userSchema)

export default UserModel
