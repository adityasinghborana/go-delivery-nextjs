import { onboardingScreenEntity } from "../entities/OnboardingScreen.entity";
import { OnboardingScreenDto } from "../dtos/onBoaringScreen.dto";
import prisma from "@/lib/prisma";

export interface IOnBoardingRepository {
  findAllScreens(): Promise<onboardingScreenEntity[]>;
  upsertScreen(data: OnboardingScreenDto[]): Promise<onboardingScreenEntity[]>;
}
export class OnBordingRepository implements IOnBoardingRepository {
  async findAllScreens(): Promise<onboardingScreenEntity[]> {
    const screens = await prisma.onboardingScreen.findMany({});
    return screens as onboardingScreenEntity[];
  }

  async upsertScreen(
    data: OnboardingScreenDto[]
  ): Promise<onboardingScreenEntity[]> {
    try {
      const upsertPromises = data.map((screeData) =>
        prisma.onboardingScreen.upsert({
          where: { screenOrder: screeData.screenOrder },
          update: {
            title: screeData.title,
            description: screeData.description,
            imageUrl: screeData.imageUrl,
          },
          create: {
            title: screeData.title,
            screenOrder: screeData.screenOrder,
            description: screeData.description,
            imageUrl: screeData.imageUrl,
          },
        })
      );
      const result = await prisma.$transaction(upsertPromises);
      return result as onboardingScreenEntity[];
    } catch (error) {
      console.error("Error during bulk screen upsert:", error);
      throw new Error("Failed to update screens.");
    }
  }
}
