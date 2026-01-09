export interface ReviewEntity{
    id:string;
    userId:string;
    serviceId:string;
    rating:number;
    comment:string;
    createdAt:Date;
    updatedAt:Date;
}