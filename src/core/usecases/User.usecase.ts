import { admin } from "@/lib/firebaseAdmin";
import { UserDto } from "../dtos/User.dto";
import { UserEntity } from "../entities/User.entity";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async createUserUSecase(token: string, data: UserDto): Promise<UserEntity> {
    const decode = await admin.auth().verifyIdToken(token);
    const firebaseUid = decode.uid;
    const email = decode.email ?? data.email;
    const number = decode.phone_number ?? data.phone;
    const name = decode.name ?? data.name;

    let user = await this.userRepository.findByFireBaseUid(firebaseUid);
    if (!user) {
      user = await this.userRepository.create({
        name,
        email,
        phone: number,
        firebaseUid,
      });
    }
    return user;
  }
}
