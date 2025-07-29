import { ReviewDto } from "../dtos/Review.dto";
import { ReviewEntity } from "../entities/Review.entity";
import prisma from "@/lib/prisma";

export interface IReviewRepository{
    create(data:ReviewDto,serviceId:string,userId:string):Promise<ReviewEntity>;
    update(data:ReviewDto,serviceId:string,userId:string,id:string):Promise<ReviewEntity>;
    getReviewById(id:string,serviceId:string):Promise<ReviewEntity>;
    getAllReviewByserviceId(serviceId:string):Promise<ReviewEntity[]>;
    deleteReviewById(serviceId:string,userId:string,id:string):Promise<void>;
}

export class ReviewRepository implements IReviewRepository{
    async create(data: ReviewDto, serviceId: string, userId: string): Promise<ReviewEntity> {
        const createReview = await prisma.review.create({
            data:{
                userId:userId,
                serviceId:serviceId,
                rating:data.rating,
                comment:data.comment
            }
        });
        return createReview as ReviewEntity;
    }
    async update(data: ReviewDto, serviceId: string, userId: string, id: string): Promise<ReviewEntity> {
        const updateReview = await prisma.review.update({
            where:{serviceId,userId,id},
            data:{
                rating:data.rating,
                comment:data.comment
            }
        });
        return updateReview as ReviewEntity;
    }
    async getReviewById(id: string, serviceId: string): Promise<ReviewEntity> {
        const getReviewById = await prisma.review.findFirst({
            where:{id,serviceId},
            include:{
                user:{
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
        });
        return getReviewById as ReviewEntity;
    }
    async getAllReviewByserviceId(serviceId: string): Promise<ReviewEntity[]> {
        const getAllreview = await prisma.review.findMany({
            where:{serviceId},
            include:{
                user:{
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
        });
        return getAllreview as ReviewEntity[];
    }
    async deleteReviewById(serviceId: string, userId: string,id:string): Promise<void> {
        await prisma.review.delete({
            where:{serviceId,userId,id}
        });
    }
}