import { IGroceryMenuRepository } from "../repositories/IGroceryMenuRepository";
import { GroceryMenuDto } from "../dtos/GroceryMenu.dto";
import { GroceryMenuEntity } from "../entities/GroceryMenu.entity";
import { IServiceRepository } from "../repositories/IServiceRepository";

export class GroceryUSecase{
    constructor(private groceryRepository:IGroceryMenuRepository,
        private serviceRepository:IServiceRepository){}
    async createGroceryusecase(data:GroceryMenuDto,serviceId:string):Promise<GroceryMenuEntity>{
        const existingServiceId = await  this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service id not found");
        }
        const createGroceryMenu = await this.groceryRepository.create(data,serviceId);
        return createGroceryMenu;
    }
    async updateGroceryMenuuseCase(data:GroceryMenuDto,serviceId:string):Promise<GroceryMenuEntity>{
        const existingServiceId = await  this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service id not found");
        }
        const updateMenu = await this.groceryRepository.update(data,serviceId);
        return updateMenu;
    }
    async findByServiceIdGroceryUsecase(serviceId:string):Promise<GroceryMenuEntity | null>{
        const existingServiceId = await  this.serviceRepository.findServiceById(serviceId);
        if(!existingServiceId){
            throw new Error("service id not found");
        }
        const menu= await this.groceryRepository.findByServiceId(serviceId);
        return menu;
    }
    async findByIdGroceryUsecase(id:string):Promise<GroceryMenuEntity| null>{
        const menu = await this.groceryRepository.findbyId(id);
        return menu;
    }
    async DeleteGroceryUSecase(id:string):Promise<void>{
        const menu = await this.groceryRepository.delete(id);
        return menu;
    }
}