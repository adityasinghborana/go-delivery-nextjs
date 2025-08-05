import { superAdminDtoUser } from "../dtos/superAdmin.dto";
import { superAdminEntity } from "../entities/superAdmin.entity";
import prisma from "@/lib/prisma";
export interface ISuperAdminUSerRepository {
  create(data: superAdminDtoUser): Promise<superAdminEntity>;
  findByemail(email: string): Promise<superAdminEntity | null>;
  findByfirebaseUid(uid: string): Promise<superAdminEntity | null>;
}
export class SuperAdminUserRepository implements ISuperAdminUSerRepository {
  async create(data: superAdminDtoUser): Promise<superAdminEntity> {
    const createAdmin = await prisma.superAdminUser.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        firebaseUid: data.firebaseUid,
      },
    });
    return createAdmin;
  }
  async findByemail(email: string): Promise<superAdminEntity | null> {
    const findByemailuser = await prisma.superAdminUser.findUnique({
      where: { email },
    });
    return findByemailuser;
  }
  async findByfirebaseUid(uid: string): Promise<superAdminEntity | null> {
    const findByFirebase = await prisma.superAdminUser.findUnique({
      where: { firebaseUid: uid },
    });
    return findByFirebase;
  }
}
