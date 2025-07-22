import { NextResponse } from "next/server";
import { LogoRepository } from "@/core/repositories/ILogoRepository";
import { LogoUsecase } from "@/core/usecases/Logo.usecase";
import { LogoDto } from "@/core/dtos/Logo.dto";
const logoRepository = new LogoRepository();
const logousecase = new LogoUsecase(logoRepository);

export async function GET() {
  try {
    const logo = await logousecase.getLogoUseCase();
    return NextResponse.json(logo);
  } catch (error) {
    console.error("Failed to fetch logo:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching categories." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const logoData: LogoDto = await request.json();
    const logo = await logousecase.updateLogoUsecase(logoData);
    return NextResponse.json(logo);
  } catch (error) {
    console.error("Failed to update or create logo:", error);
    return NextResponse.json(
      { message: "An error occurred while updating logo." },
      { status: 500 }
    );
  }
}
