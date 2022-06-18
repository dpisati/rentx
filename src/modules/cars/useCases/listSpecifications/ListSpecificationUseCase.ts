import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return await this.specificationRepository.list();
  }
}

export { ListSpecificationUseCase };
