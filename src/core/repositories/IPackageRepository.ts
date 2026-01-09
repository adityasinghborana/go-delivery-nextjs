import { PackageDto } from "../dtos/Package.dto";
import { PackageEntity } from "../entities/package.entity";
import prisma from "@/lib/prisma";

export interface IPackageRepository{
    create(data:PackageDto,userId:string,categoryId:string,trackingId:string):Promise<PackageEntity>;
    update(data:PackageDto,userId:string,id:string):Promise<PackageEntity>;
    getAllPackageByuserId(userId:string):Promise<PackageEntity>;
    getAllPackage():Promise<PackageEntity>;
    deletPackage(id:string):Promise<void>;
}

export class PackageRepository implements IPackageRepository{
    async create(data: PackageDto, userId: string,categoryId:string,trackingId:string): Promise<PackageEntity> {
        const newPackage = await prisma.package.create({
            data:{
                trackingId:trackingId,
                senderId:userId,
                categoryId:categoryId,
                weight:data.weight,
                packageTime:data.packageTime,
                parcelWorth:data.parcelWorth,
                Fragile:data.Fragile,
                parcelType:data.parcelType,
                itemCount:data.itemCount,
                notesForRider:data.notesForRider,
                riderId:data.riderId,
                senderFullAdd:data.senderFullAdd,
                senderHouseNo:data.senderHouseNo,
                senderaddressLine:data.senderaddressLine,
                senderPostalCode:data.senderPostalCode,
                senderCity:data.senderCity,
                senderLandmark:data.senderLandmark,
                senderPhone:data.senderPhone,
                senderName:data.senderName,
                senderLatitude:data.senderLatitude,
                senderLongitude:data.senderLongitude,
                receiverFullAdd:data.receiverFullAdd,
                receiverHouseNo:data.receiverHouseNo,
                receiveraddressLine:data.receiveraddressLine,
                receiverPostalCode:data.receiverPostalCode,
                receiverCity:data.receiverCity,
                receiverLandmark:data.receiverLandmark,
                receiverPhone:data.receiverPhone,
                receiverName:data.receiverName,
                receiverLatitude:data.receiverLatitude,
                receiverLongitude:data.receiverLongitude,
                status:data.status,
                baseFare:data.baseFare,
                distanceCharge:data.distanceCharge,
                weightCharge:data.weightCharge,
                totalFare:data.totalFare,
                paymentId:data.paymentId,
                PackageName:data.PackageName,
                Packagewidth:data.Packagewidth,
                Packageheight:data.Packageheight,
                Packagedepth:data.Packagedepth,
                serviceName:data.serviceName,
                servicePrice:data.servicePrice,
                imageUrl:data.imageUrl,
            },
        });
        return newPackage as unknown as PackageEntity;
    }
    async update(data: PackageDto, userId: string,id:string): Promise<PackageEntity> {
        const updatePackage = await prisma.package.update({
            where:{id},
            data:{
                weight:data.weight,
                packageTime:data.packageTime,
                parcelWorth:data.parcelWorth,
                Fragile:data.Fragile,
                parcelType:data.parcelType,
                itemCount:data.itemCount,
                notesForRider:data.notesForRider,
                riderId:data.riderId,
                senderFullAdd:data.senderFullAdd,
                senderHouseNo:data.senderHouseNo,
                senderaddressLine:data.senderaddressLine,
                senderPostalCode:data.senderPostalCode,
                senderCity:data.senderCity,
                senderLandmark:data.senderLandmark,
                senderPhone:data.senderPhone,
                senderName:data.senderName,
                senderLatitude:data.senderLatitude,
                senderLongitude:data.senderLongitude,
                receiverFullAdd:data.receiverFullAdd,
                receiverHouseNo:data.receiverHouseNo,
                receiveraddressLine:data.receiveraddressLine,
                receiverPostalCode:data.receiverPostalCode,
                receiverCity:data.receiverCity,
                receiverLandmark:data.receiverLandmark,
                receiverPhone:data.receiverPhone,
                receiverName:data.receiverName,
                receiverLatitude:data.receiverLatitude,
                receiverLongitude:data.receiverLongitude,
                status:data.status,
                baseFare:data.baseFare,
                distanceCharge:data.distanceCharge,
                weightCharge:data.weightCharge,
                totalFare:data.totalFare,
                paymentId:data.paymentId,
                PackageName:data.PackageName,
                Packagewidth:data.Packagewidth,
                Packageheight:data.Packageheight,
                Packagedepth:data.Packagedepth,
                serviceName:data.serviceName,
                servicePrice:data.servicePrice,
                imageUrl:data.imageUrl,
            },
        });
        return updatePackage as unknown as PackageEntity;
    }
    async getAllPackageByuserId(userId: string): Promise<PackageEntity> {
        const getAllPackageByUserId = await prisma.package.findMany({
            where:{senderId:userId}
        });
        return getAllPackageByUserId as unknown as PackageEntity;
    }
    async getAllPackage(): Promise<PackageEntity> {
        const getAllPackage = await prisma.package.findMany({
        });
        return getAllPackage as unknown as PackageEntity;
    }
    async deletPackage(id: string): Promise<void> {
        await prisma.package.delete({
            where:{id}
        });
    }
}