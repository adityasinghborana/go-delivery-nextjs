import { AddressDto } from "../dtos/Address.dto";
import { AddressEntity } from "../entities/Address.entity";
import { IAddressRepository } from "../repositories/IAddressRepository";

export class AddressUsecase {
  constructor(private addressRepository: IAddressRepository) {}
  async getAddressUsecase(userId: string): Promise<AddressEntity[]> {
    if (!userId) {
      throw new Error("userId  is required");
    }
    const addresses = this.addressRepository.getAddresses(userId);
    return addresses;
  }
  async addAddress(userId: string, data: AddressDto): Promise<AddressEntity> {
    if (!userId) {
      throw new Error("userId is required");
    }
    if (!data.fullAddress) {
      throw new Error("fullAddress is required");
    }
    if (!data.houseNumber) {
      throw new Error("house no is required");
    }
    if (!data.latitude) {
      throw new Error("latitude is required");
    }
    if (!data.longitude) {
      throw new Error("longitude is required");
    }
    if (!data.postalCode) {
      throw new Error("postal code is required");
    }
    if (!data.type) {
      throw new Error("type is required");
    }
    const newAddress = await this.addressRepository.addAddress(userId, data);
    return newAddress;
  }
  async updateAddressUsecase(
    userId: string,
    id: string,
    data: AddressDto
  ): Promise<AddressEntity> {
    if (!userId) {
      throw new Error("userId is required");
    }
    if (!id) {
      throw new Error("id is required");
    }

    const updateAddress = await this.addressRepository.updateAddress(
      userId,
      id,
      data
    );
    return updateAddress;
  }

  async deleteAddressUsecase(userId: string, id: string): Promise<void> {
    if (!userId) {
      throw new Error("userId is required");
    }
    if (!id) {
      throw new Error("id is required");
    }
    const deleteAddress = await this.addressRepository.deleteAddress(
      userId,
      id
    );
    return deleteAddress;
  }
}
