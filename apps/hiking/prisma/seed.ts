import { PrismaClient } from '@prisma/hiking';

const seedHikingDb = async () => {
  const hikingDatabaseClient = new PrismaClient();

  await hikingDatabaseClient.trail.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Grand mounier',
    },
  });
  await hikingDatabaseClient.trail.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Vallée des merveilles',
    },
  });
  await hikingDatabaseClient.trail.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Marguareis',
    },
  });

  await hikingDatabaseClient.session.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idTrail: 1,
      date: new Date(),
    },
  });
  await hikingDatabaseClient.session.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idTrail: 1,
      date: new Date(),
    },
  });
  await hikingDatabaseClient.session.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idTrail: 2,
      date: new Date(),
    },
  });
  await hikingDatabaseClient.session.upsert({
    where: { id: 4 },
    update: {},
    create: {
      idTrail: 3,
      date: new Date(),
    },
  });

  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idDev: 1,
      idSession: 1,
    },
  });
  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idDev: 2,
      idSession: 1,
    },
  });
  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idDev: 3,
      idSession: 1,
    },
  });
  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 4 },
    update: {},
    create: {
      idDev: 3,
      idSession: 4,
    },
  });
  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 5 },
    update: {},
    create: {
      idDev: 2,
      idSession: 3,
    },
  });
  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 6 },
    update: {},
    create: {
      idDev: 3,
      idSession: 3,
    },
  });
  await hikingDatabaseClient.sessionParticipant.upsert({
    where: { id: 6 },
    update: {},
    create: {
      idDev: 1,
      idSession: 2,
    },
  });

  console.info('Hiking database seeded');
};

export default seedHikingDb();
