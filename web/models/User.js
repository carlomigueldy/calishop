import { mapUTCDate, dateFormat } from '../utils/Util'

export class User {
  constructor({ 
    avatar = null,
    name = null, 
    role = null, 
    email = null, 
    password = null,
    password_confirmation = null,
    work_phone = null,
    home_phone = null,
    mobile_phone = null,
  } = {}) {
    this.avatar = avatar
    this.name = name 
    this.email = email 
    this.role = role 
    this.password = password
    this.password_confirmation = password_confirmation
    this.work_phone = work_phone
    this.home_phone = home_phone
    this.mobile_phone = mobile_phone
  }
}

export const createUser = (data) => {
  return Object.freeze(new User(data))
}

export const mapUser = (obj) => ({
  id: obj.id,
  name: obj.name,
  email: obj.email,
  role: obj.role,
  authorized: obj.authorized,
  created_at: dateFormat(mapUTCDate(obj.created_at)),
})