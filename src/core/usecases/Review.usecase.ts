import { IServiceRepository } from "../repositories/IServiceRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IReviewRepository } from "../repositories/IReviewRepository";
import { ReviewDto } from "../dtos/Review.dto";

export class ReviewUsecase{
    constructor(private serviceRepository:IServiceRepository,
        private userRepository:IUserRepository,
        private reviewRepository:IReviewRepository
    ){}
    async createReviewUsecase(data:ReviewDto,serviceId:string,userId:string){
        const existingServiceId = await this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service Id is required please check the service id")
        }
        const existinguserId = await this.userRepository.findByFireBaseUid(userId);
        if(!existinguserId){
            throw new Error("please login your device ");
        }
        const id = existinguserId.id;
        const createReviewUsecase = await this.reviewRepository.create(data,serviceId,id);
        return createReviewUsecase;
    }
    async updateReviewUSecase(data:ReviewDto,serviceId:string,userId:string,id:string){
        const existingServiceId = await this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service Id is required please check the service id")
        }
        const existinguserId = await this.userRepository.findByFireBaseUid(userId);
        if(!existinguserId){
            throw new Error("please login your device ");
        }
        const userDb = existinguserId.id;
        const updateReview = await this.reviewRepository.update(data,serviceId,userDb,id);
        return updateReview;
    }
    async getReviewbyIdUSecase(id:string,serviceId:string){
        const existingServiceId = await this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service Id is required please check the service id")
        }
        const getReviewById = await this.reviewRepository.getReviewById(id,serviceId);
        return getReviewById;
    }
    async getAllReviewUsecase(serviceId:string){
        const existingServiceId = await this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service Id is required please check the service id")
        }
        const allReview = await this.reviewRepository.getAllReviewByserviceId(serviceId);
        return allReview;
    }
    async deleteReviewUsecase(serviceId:string,userId:string,id:string){
        const existingServiceId = await this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service Id is required please check the service id")
        }
        const existinguserId = await this.userRepository.findByFireBaseUid(userId);
        if(!existinguserId){
            throw new Error("please login your device ");
        }
        const userDb = existinguserId.id;
        await this.reviewRepository.deleteReviewById(serviceId,userDb,id);
    }
}