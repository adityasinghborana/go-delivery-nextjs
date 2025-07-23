import { AddressDto } from "../dtos/Address.dto";
import { AddressEntity } from "../entities/Address.entity";
import prisma from "@/lib/prisma";

export interface IAddressRepository {
  getAddresses(userId: string): Promise<AddressEntity[]>;
  addAddress(userId: string, data: AddressDto): Promise<AddressEntity>;
  updateAddress(
    userId: string,
    id: string,
    data: AddressDto
  ): Promise<AddressEntity>;
  deleteAddress(userId: string, id: string): Promise<void>;
}

export class AddressRepository implements IAddressRepository {
  async getAddresses(userId: string): Promise<AddressEntity[]> {
    const addresses = await prisma.address.findMany({
      where: {
        user: {
          firebaseUid: userId,
        },
      },
    });
    return addresses as AddressEntity[];
  }
  async addAddress(userId: string, data: AddressDto): Promise<AddressEntity> {
    const addAddress = await prisma.address.create({
      data: {
        type: data.type,
        fullAddress: data.fullAddress,
        houseNumber: data.houseNumber,
        landMark: data.landMark,
        postalCode: data.postalCode,
        directionText: data.directionText,
        latitude: data.latitude,
        longitude: data.longitude,
        user: {
          connect: { firebaseUid: userId },
        },
      },
    });
    return addAddress as AddressEntity;
  }

  async updateAddress(
    userId: string,
    id: string,
    data: AddressDto
  ): Promise<AddressEntity> {
    const updateAddress = await prisma.address.update({
      where: { user: { firebaseUid: userId }, id },
      data: {
        fullAddress: data.fullAddress,
        houseNumber: data.houseNumber,
        type: data.type,
        landMark: data.landMark,
        postalCode: data.postalCode,
        directionText: data.directionText,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return updateAddress as AddressEntity;
  }

  async deleteAddress(userId: string, id: string): Promise<void> {
    await prisma.address.delete({
      where: { user: { firebaseUid: userId }, id },
    });
  }
}
