// app/api/user/route.ts

import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { UserUseCase } from "@/core/usecases/User.usecase";
import { UserDto } from "@/core/dtos/User.dto";

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - no token" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const userData: UserDto = body;

    const newUser = await userUseCase.createUserUSecase(token, userData);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create user." },
      { status: 500 }
    );
  }
}
