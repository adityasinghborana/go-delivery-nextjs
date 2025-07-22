import { UserDto } from "../dtos/User.dto";
import { UserEntity } from "../entities/User.entity";
import prisma from "@/lib/prisma";

export interface IUserRepository {
  findByemail(email: string): Promise<UserEntity | null>;
  findByFireBaseUid(uid: string): Promise<UserEntity | null>;
  create(data: UserDto): Promise<UserEntity>;
}
export class UserRepository implements IUserRepository {
  async create(data: UserDto): Promise<UserEntity> {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        firebaseUid: data.firebaseUid,
      },
    });
    return newUser;
  }

  async findByemail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findByFireBaseUid(uid: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: uid },
    });
    return user;
  }
}
