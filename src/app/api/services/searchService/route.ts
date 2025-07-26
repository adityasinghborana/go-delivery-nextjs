import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { ServiceUsecase } from "@/core/usecases/Services.usecase";
import { CategoryRepository } from "@/core/repositories/ICategoryRepository";
import { NextRequest, NextResponse } from "next/server";
const categoryRepository = new CategoryRepository();
const serviceRepository = new ServicesRepository();
const serviceusecases = new ServiceUsecase(
  serviceRepository,
  categoryRepository
);

export async function GET(req: NextRequest) {
  try {
    console.log("--- SEARCH API ROUTE HIT ---");
    console.log("Request URL:", req.url);
    const q = req.nextUrl.searchParams.get("q");
    console.log(`Search term (q) is: "${q}"`);
    if (!q || q.trim().length < 2) {
      return NextResponse.json(
        { message: "A search query of at least 2 characters is required." },
        { status: 400 }
      );
    }
    const services = await serviceusecases.searchByNameUsecase(q);
    return NextResponse.json(services, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create services." },
      { status: 500 }
    );
  }
}
