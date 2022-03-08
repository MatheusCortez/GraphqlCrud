import { Test, TestingModule } from '@nestjs/testing';
import { ApicepService } from './apicep.service';

describe('ApicepService', () => {
  let service: ApicepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApicepService],
    }).compile();

    service = module.get<ApicepService>(ApicepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
