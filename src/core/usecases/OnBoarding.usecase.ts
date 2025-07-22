import { OnboardingScreenDto } from "../dtos/onBoaringScreen.dto";
import { onboardingScreenEntity } from "../entities/OnboardingScreen.entity";
import { IOnBoardingRepository } from "../repositories/IOnBordingRepository";

export class OnBoardingUsecase {
  constructor(private onboardingRepository: IOnBoardingRepository) {}
  async getScreenusecase(): Promise<onboardingScreenEntity[]> {
    const screens = await this.onboardingRepository.findAllScreens();
    return screens;
  }

  async upsertScreen(
    data: OnboardingScreenDto[]
  ): Promise<onboardingScreenEntity[]> {
    const upsertScreen = await this.onboardingRepository.upsertScreen(data);
    return upsertScreen;
  }
}
