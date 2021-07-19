import { Schema, model, HookNextFunction, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  mobileNumber: string
  createdAt: Date
  updatedAt: Date
  comparePassword(plainPassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
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

userSchema.pre<IUser>('save', async function (next: HookNextFunction) {
  const UserDocument = this
  if (UserDocument.isModified('password')) {
    const hash = await bcrypt.hash(UserDocument.password, 10)
    UserDocument.password = hash
  }
  return next()
})

userSchema.methods.comparePassword = async function (plainPassword: string): Promise<boolean> {
  const UserDocument: IUser = this
  return await bcrypt.compare(plainPassword, UserDocument.password)
}

const UserModel = model<IUser>('User', userSchema, 'users')

export default UserModel
