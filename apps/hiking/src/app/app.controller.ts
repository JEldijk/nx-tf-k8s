import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { TrailDto } from './dto/trail.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('trials')
  getTrails(): Observable<Array<TrailDto>> {
    return this.appService.getTrails();
  }
}
