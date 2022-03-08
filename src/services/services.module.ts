import { Module } from '@nestjs/common';
import { ApicepService } from './apicep/apicep.service';

@Module({
  providers: [ApicepService],
})
export class ServicesModule {}
