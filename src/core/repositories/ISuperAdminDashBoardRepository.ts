import prisma from "@/lib/prisma";
import { CategoryCount } from "../dtos/SuperAdminDashboard.dto";

export interface ISuperAdminDashboard {
  getTotalCategoryCount(): Promise<number>;
  getTotalServiceByCategoryWise(): Promise<CategoryCount[] | null>;
  getTotalUser(): Promise<number>;
}
export class SuperAdminDashboardRepository implements ISuperAdminDashboard {
  async getTotalServiceByCategoryWise(): Promise<CategoryCount[] | null> {
    const serviceGroup = await prisma.services.groupBy({
      by: ["categoryName"],
      _count: {
        _all: true,
      },
    });

    const formattedCounts: CategoryCount[] = serviceGroup.map((group) => {
      return {
        categoryName: group.categoryName,
        count: group._count._all,
      };
    });
    return formattedCounts;
  }
  async getTotalCategoryCount(): Promise<number> {
    return prisma.category.count();
  }
  async getTotalUser(): Promise<number> {
    return prisma.user.count();
  }
}
