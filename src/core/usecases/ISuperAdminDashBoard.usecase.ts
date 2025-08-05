import { ISuperAdminDashboard } from "../repositories/ISuperAdminDashBoardRepository";
import { SuperAdminDashBoardDto } from "../dtos/SuperAdminDashboard.dto";

export class SuperAdminDashboardUsecase {
  constructor(private superAdminDashBoardRepo: ISuperAdminDashboard) {}
  async execute(): Promise<SuperAdminDashBoardDto> {
    const totalServiceCategoryWise =
      await this.superAdminDashBoardRepo.getTotalServiceByCategoryWise();
    const totalCategory =
      await this.superAdminDashBoardRepo.getTotalCategoryCount();
    const totalUser = await this.superAdminDashBoardRepo.getTotalUser();
    return {
      totalServiceCategoryWise,
      totalCategory,
      totalUser,
    };
  }
}
