import { NextResponse,NextRequest } from "next/server";
import { ServicesRepository } from "@/core/repositories/IServiceRepository";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { ReviewRepository } from "@/core/repositories/IReviewRepository";
import { ReviewDto } from "@/core/dtos/Review.dto";
import { ReviewUsecase } from "@/core/usecases/Review.usecase";
import { getUserIdFromRequest } from "@/lib/auth";
const serviceRepository = new ServicesRepository();
const userRepository = new UserRepository();
const reviewRepositiry = new ReviewRepository();
const reviewusecase = new ReviewUsecase(serviceRepository,userRepository,reviewRepositiry);

export async function POST(
    request:NextRequest,
     { params }: { params: Promise<{ serviceId: string }> }
){
    try {
        const {serviceId}= await params;
        const reviewData:ReviewDto= await request.json();
        const userId= await getUserIdFromRequest(request);
        const review = await reviewusecase.createReviewUsecase(reviewData,serviceId,userId);
        return NextResponse.json(review,{status:201});
    } catch (error: unknown) {
    console.error("Error create GroceryMenu by id:", error);
    return NextResponse.json(
      {
        message: "Failed to create GroceryMenu",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
export async function GET(
    request:NextRequest,
   { params }: { params: Promise<{ serviceId: string }> }
) {
    try {
        const {serviceId} = await params;
        const getAllreview = await reviewusecase.getAllReviewUsecase(serviceId);
        return NextResponse.json(getAllreview,{status:201});
    } catch (error: unknown) {
    console.error("Error get Grocery by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get Grocery.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}