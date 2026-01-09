import { ProfileDto } from "../dtos/User.dto";
import { ProfileEntity } from "../entities/User.entity";
import prisma from "@/lib/prisma";

export interface IProfileRepository {
  updateProfile(data: ProfileDto, id: string): Promise<ProfileEntity>;
  getProfile(id: string): Promise<ProfileEntity>;
}
export class ProfileRepository implements IProfileRepository {
  async updateProfile(data: ProfileDto, id: string): Promise<ProfileEntity> {
    const updateProfile = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        lastName: data.lastName,
        Dob: data.Dob,
      },
    });
    return updateProfile as unknown as ProfileEntity;
  }
  async getProfile(id: string): Promise<ProfileEntity> {
    const getProfile = await prisma.user.findFirst({
      where: { id },
    });
    return getProfile as unknown as ProfileEntity;
  }
}
