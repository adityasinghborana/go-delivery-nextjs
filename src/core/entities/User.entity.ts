export interface UserEntity {
  id: string;
  name: string;
  firebaseUid: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProfileEntity {
  id: string;
  name: string;
  firebaseUid: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  Dob?: Date;
  createdAt: Date;
  updatedAt: Date;
}
