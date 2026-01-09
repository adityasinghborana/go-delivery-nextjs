import { PackageDto } from "../dtos/Package.dto";
import { IPackageRepository } from "../repositories/IPackageRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { nanoid } from "nanoid";
export class PackageUsecase{
    constructor(
        private packageRepository:IPackageRepository,
        private userRepository:IUserRepository
    ){}
    async createPackageUsecase(data:PackageDto,userId:string,categoryId:string){
        const existingUser = await this.userRepository.findByFireBaseUid(userId);
        if(!existingUser){
            throw new Error("user id is not found please login");
        }
        const dbUser = existingUser.id;
        const trackingId = nanoid(12);
        const newPackage = await this.packageRepository.create(data,dbUser,categoryId,trackingId);
        return newPackage;
    }
    async updatePackageUsecase(data:PackageDto,userId:string,id:string){
        const existingUser = await this.userRepository.findByFireBaseUid(userId);
        if(!existingUser){
            throw new Error("user id is not found please login");
        }
        const dbUser = existingUser.id;
        const updatePackage = await this.packageRepository.update(data,dbUser,id);
        return updatePackage;
    }
    async getAllPackageByUserIdusecase(userId:string){
        const existingUser = await this.userRepository.findByFireBaseUid(userId);
        if(!existingUser){
            throw new Error("user id is not found please login");
        }
        const dbUser = existingUser.id;
        const allPackage = await this.packageRepository.getAllPackageByuserId(dbUser);
        return allPackage;
    }
    async getAllPackageUsecase(){
        const allPackage = await this.packageRepository.getAllPackage();
        return allPackage;
    }
    async deletePackageUsecase(id:string){
        const deletePackage= await this.packageRepository.deletPackage(id);
        return deletePackage;
    }
}