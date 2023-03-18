import { Prisma } from '@prisma/hiking';
import { Session, Trail } from '@prisma/hiking';

export type SessionSelectType = Omit<Session, 'idTrail'> & {
  Trail: Trail | null;
  Participants: Array<{
    idDev: number;
  }>;
};

export const selectSession = <T extends Prisma.SessionSelect>(
  select: Prisma.Subset<T, Prisma.SessionSelect>
): T => {
  return select;
};

export const sessionsSelect = selectSession({
  id: true,
  date: true,
  Trail: {
    select: {
      id: true,
      name: true,
    },
  },
  Participants: {
    select: {
      idDev: true,
    },
  },
});
