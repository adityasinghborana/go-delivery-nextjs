import { NextResponse } from "next/server";
import { OnBoardingUsecase } from "@/core/usecases/OnBoarding.usecase";
import { OnBordingRepository } from "@/core/repositories/IOnBordingRepository";
import { OnboardingScreenDto } from "../../../core/dtos/onBoaringScreen.dto";

const onboardingrepository = new OnBordingRepository();
const screenUsecase = new OnBoardingUsecase(onboardingrepository);

export async function GET() {
  try {
    const screens = await screenUsecase.getScreenusecase();
    return NextResponse.json(screens);
  } catch (error) {
    console.error("Failed to fetch screens:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching screens." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const screenData: OnboardingScreenDto[] = await request.json();
    const screens = await screenUsecase.upsertScreen(screenData);
    return NextResponse.json(screens);
  } catch (error) {
    console.error("Failed to create screens:", error);
    return NextResponse.json(
      { message: "An error occurred while creating screens." },
      { status: 500 }
    );
  }
}
