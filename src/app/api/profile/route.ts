import { NextResponse, NextRequest } from "next/server";
import { ProfileRepository } from "@/core/repositories/IProfileRepository";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { ProfileUSecase } from "@/core/usecases/Profile.usecase";
import { getUserIdFromRequest } from "@/lib/auth";
import { ProfileDto } from "@/core/dtos/User.dto";
const userRepository = new UserRepository();
const profileRepository = new ProfileRepository();
const profileUsecase = new ProfileUSecase(profileRepository, userRepository);

export async function PUT(request: NextRequest) {
  try {
    const data: ProfileDto = await request.json();
    const userId = await getUserIdFromRequest(request);
    const updateProfile = await profileUsecase.updateProfileUsecase(
      data,
      userId
    );
    return NextResponse.json(updateProfile, { status: 201 });
  } catch (error: unknown) {
    console.error("Error  update profile :", error);
    return NextResponse.json(
      {
        message: "Failed to update Profile  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    const getProfile = await profileUsecase.getProfileUSecase(userId);
    return NextResponse.json(getProfile, { status: 201 });
  } catch (error: unknown) {
    console.error("Error  get profile :", error);
    return NextResponse.json(
      {
        message: "Failed to get Profile  ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
