import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FirebaseService } from '../src/shared/firebase/firebase.service';

describe('TestController (e2e)', () => {
  let app: INestApplication;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    firebaseService = moduleFixture.get(FirebaseService);
    app = moduleFixture.createNestApplication();
    await app.init();

    await firebaseService
      .getInstance()
      .recursiveDelete(firebaseService.getInstance().collection('tasks'));
  });

  it('/tasks (GET)', async () => {
    const task1 = await firebaseService.getInstance().collection('tasks').add({
      description: 'Description 1',
      title: 'Title 1',
      status: 'COMPLETED',
    });

    const task2 = await firebaseService.getInstance().collection('tasks').add({
      description: 'Description 2',
      title: 'Title 2',
      status: 'PENDING',
    });

    const res = await request(app.getHttpServer()).get('/tasks').expect(200);

    expect(res.body).toStrictEqual(
      expect.arrayContaining([
        {
          ...(await task1.get()).data(),
          _id: task1.id,
        },
        {
          ...(await task2.get()).data(),
          _id: task2.id,
        },
      ]),
    );
  });

  it('/tasks (POST)', async () => {
    const newTask = {
      title: 'Title 1',
      description: 'Description 1',
      status: 'COMPLETED',
    };

    return await request(app.getHttpServer())
      .post('/tasks')
      .send(newTask)
      .expect(201);
  });

  it('/tasks (DELETE)', async () => {
    const task1 = await firebaseService.getInstance().collection('tasks').add({
      description: 'Description 1',
      title: 'Title 1',
      status: 'COMPLETED',
    });

    return await request(app.getHttpServer())
      .delete(`/tasks/${task1.id}`)
      .expect(200);
  });

  it('/tasks (PUT)', async () => {
    const task1 = await firebaseService.getInstance().collection('tasks').add({
      description: 'Description 1',
      title: 'Title 1',
      status: 'COMPLETED',
    });

    const newValues = {
      description: 'Description new',
      title: 'Title new',
      status: 'PENDING',
    };

    return await request(app.getHttpServer())
      .patch(`/tasks/${task1.id}`)
      .send(newValues)
      .expect(200);
  });
});
