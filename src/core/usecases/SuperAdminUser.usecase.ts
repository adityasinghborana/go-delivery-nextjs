import { admin } from "@/lib/firebaseAdmin";
import { superAdminDtoUser } from "../dtos/superAdmin.dto";
import { superAdminEntity } from "../entities/superAdmin.entity";
import { ISuperAdminUSerRepository } from "../repositories/ISuperAdminUserRepository";

export class SuperAdminUserUseCase {
  constructor(private superAdminRepository: ISuperAdminUSerRepository) {}
  async createNewUser(
    data: superAdminDtoUser,
    token: string
  ): Promise<superAdminEntity> {
    const decode = await admin.auth().verifyIdToken(token);
    const firebaseUid = decode.uid;
    const email = decode.email ?? data.email;
    const name = decode.name ?? data.name;
    const phone = decode.phone_number ?? data.phone;
    let superAdminUSer = await this.superAdminRepository.findByfirebaseUid(
      firebaseUid
    );
    if (!superAdminUSer) {
      superAdminUSer = await this.superAdminRepository.create({
        name,
        email,
        phone,
        firebaseUid,
      });
    }
    return superAdminUSer;
  }
}
