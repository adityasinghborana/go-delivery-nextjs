import { IUserRepository } from "../repositories/IUserRepository";
import { IProfileRepository } from "../repositories/IProfileRepository";
import { ProfileDto } from "../dtos/User.dto";
import { ProfileEntity } from "../entities/User.entity";

export class ProfileUSecase {
  constructor(
    private profileRepository: IProfileRepository,
    private userRepository: IUserRepository
  ) {}
  async updateProfileUsecase(
    data: ProfileDto,
    firebaseUid: string
  ): Promise<ProfileEntity> {
    const existingUser = await this.userRepository.findByFireBaseUid(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("this is not correct user Id");
    }
    const userId = existingUser.id;
    const update = await this.profileRepository.updateProfile(data, userId);
    return update;
  }
  async getProfileUSecase(firebaseUid: string): Promise<ProfileEntity> {
    const existingUser = await this.userRepository.findByFireBaseUid(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("this is not correct user Id");
    }
    const userId = existingUser.id;
    const getProfile = await this.profileRepository.getProfile(userId);
    return getProfile;
  }
}
