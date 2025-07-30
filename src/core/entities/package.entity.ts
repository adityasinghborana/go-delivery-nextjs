export interface PackageEntity{
    id:string;
    trackingId:string;
    senderId:string;
    categoryId:string;
    weight:number;
    packageTime:Date;
    parcelWorth:string;
    Fragile:string;
    parcelType:string;
    itemCount:number;
    notesForRider:string;
    riderId?:string;
    senderFullAdd:string;
    senderHouseNo:string;
    senderaddressLine:string;
    senderPostalCode:string;
    senderCity:string;
    senderLandmark?:string;
    senderPhone:string;
    senderName:string;
    senderLatitude:string;
    senderLongitude:string;
    receiverFullAdd:string;
    receiverHouseNo:string;
    receiveraddressLine:string;
    receiverPostalCode:string;
    receiverCity:string;
    receiverLandmark:string;
    receiverPhone:string;
    receiverName:string;
    receiverLatitude:string;
    receiverLongitude:string;
    status:PackageStatusEntity;
    baseFare:number;
    distanceCharge:number;
    weightCharge:number;
    totalFare:number;
    paymentId?:string;
    PackageName:string;
    Packagewidth:number;
    Packageheight:number;
    Packagedepth:number;
    serviceName:string;
    servicePrice:number;
    imageUrl:string;
    createdAt:Date;
    updatedAt:Date;
    deliveredAt?:Date;
}


export enum PackageStatusEntity {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}