export interface SuperAdminDashBoardDto {
  totalServiceCategoryWise: CategoryCount[] | null;
  totalCategory: number;
  totalUser: number;
}
export type CategoryCount = {
  categoryName: string | null;
  count: number | null;
};
