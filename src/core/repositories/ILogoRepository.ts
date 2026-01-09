import { LogoDto } from "../dtos/Logo.dto";
import { LogoEntity } from "../entities/Logo.entity";
import prisma from "@/lib/prisma";

export interface ILogoRepository {
  getLogo(): Promise<LogoEntity>;
  updateLogo(logo: LogoDto): Promise<LogoEntity>;
}
export class LogoRepository implements ILogoRepository {
  async getLogo(): Promise<LogoEntity> {
    const logo = await prisma.logo.findFirst();
    return logo as LogoEntity;
  }

  async updateLogo(logo: LogoDto): Promise<LogoEntity> {
    const existingLogo = await prisma.logo.findFirst();
    if (existingLogo) {
      const updateLogo = await prisma.logo.update({
        where: { id: existingLogo.id },
        data: {
          logoUrl: logo.logoUrl,
          logoAlt: logo.logoAlt,
        },
      });
      return updateLogo as LogoEntity;
    } else {
      const newLogo = await prisma.logo.create({
        data: {
          logoUrl: logo.logoUrl,
          logoAlt: logo.logoAlt,
        },
      });
      return newLogo as LogoEntity;
    }
  }
}
