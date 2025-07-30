export interface PackageDto{
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
    senderLatitude:number;
    senderLongitude:number;
    receiverFullAdd:string;
    receiverHouseNo:string;
    receiveraddressLine:string;
    receiverPostalCode:string;
    receiverCity:string;
    receiverLandmark:string;
    receiverPhone:string;
    receiverName:string;
    receiverLatitude:number;
    receiverLongitude:number;
    status:PackageStatus;
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
}

export enum PackageStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}