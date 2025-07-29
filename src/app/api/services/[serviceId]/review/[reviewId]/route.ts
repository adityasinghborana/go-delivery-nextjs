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

export async function GET(
    request:NextRequest,
   { params }: { params: Promise<{ serviceId: string,reviewId:string }> }
) {
    try {
        const {serviceId,reviewId} = await params;
        const getreview = await reviewusecase.getReviewbyIdUSecase(reviewId,serviceId);
        return NextResponse.json(getreview,{status:201});
    } catch (error: unknown) {
    console.error("Error get Review by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get Review.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function PUT(
    request:NextRequest,
   { params }: { params: Promise<{ serviceId: string,reviewId:string }> }
) {
    try {
        const {serviceId,reviewId} = await params;
        const reviewData:ReviewDto=await request.json();
        const userId =await getUserIdFromRequest(request);
        const updateReview = await reviewusecase.updateReviewUSecase(reviewData,serviceId,userId,reviewId);
        return NextResponse.json(updateReview,{status:201});
    } catch (error: unknown) {
    console.error("Error get review by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get review.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
    request:NextRequest,
    {params}:{params:Promise<{serviceId:string,reviewId:string}>}
) {
    try {
        const {serviceId,reviewId} = await params;
        const userId =await getUserIdFromRequest(request);
         await reviewusecase.deleteReviewUsecase(serviceId,userId,reviewId);
        return NextResponse.json(null,{status:201});
    } catch (error: unknown) {
    console.error("Error get review by id:", error);
    return NextResponse.json(
      {
        message: "Failed to get review.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
    
}