import { Injectable } from '@nestjs/common';
import { Trail, SessionParticipant } from '@prisma/hiking';
import { from, Observable } from 'rxjs';
import { HikingPrismaClient } from './hiking-prisma.client';

import { SessionSelectType, sessionsSelect } from './selects/sessions.select';

@Injectable()
export class HikingRepositoryService {
  constructor(private readonly hikingDatabaseClient: HikingPrismaClient) {}
  getSessions = (): Observable<Array<SessionSelectType>> =>
    from(
      this.hikingDatabaseClient.session.findMany({
        select: sessionsSelect,
      })
    );

  getTrails = (): Observable<Array<Trail>> =>
    from(this.hikingDatabaseClient.trail.findMany({}));

  getTrailSessionBy = (id: number): Observable<SessionSelectType | null> =>
    from(
      this.hikingDatabaseClient.session.findFirst({
        where: {
          id,
        },
        select: sessionsSelect,
      })
    );

  joinTrailSession = (
    idDev: number,
    idSession: number
  ): Observable<SessionParticipant> =>
    from(
      this.hikingDatabaseClient.sessionParticipant.create({
        data: {
          idDev,
          idSession,
        },
      })
    );
}
