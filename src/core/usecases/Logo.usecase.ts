import { LogoDto } from "../dtos/Logo.dto";
import { LogoEntity } from "../entities/Logo.entity";
import { ILogoRepository } from "../repositories/ILogoRepository";

export class LogoUsecase {
  constructor(private logoRepository: ILogoRepository) {}
  async getLogoUseCase(): Promise<LogoEntity> {
    const logo = await this.logoRepository.getLogo();
    return logo;
  }

  async updateLogoUsecase(logo: LogoDto): Promise<LogoEntity> {
    const updateLogo = await this.logoRepository.updateLogo(logo);
    return updateLogo;
  }
}
