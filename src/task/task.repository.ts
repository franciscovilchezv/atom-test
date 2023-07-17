import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../shared/firebase/firebase.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private firebaseService: FirebaseService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.firebaseService
      .getInstance()
      .collection('tasks')
      .add(createTaskDto);
  }

  async getTasks() {
    const docs = await this.firebaseService
      .getInstance()
      .collection('tasks')
      .listDocuments();

    const values = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = await docs[i].get();

      values.push({ ...doc.data(), _id: doc.id });
    }

    return values;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return this.firebaseService
      .getInstance()
      .collection('tasks')
      .doc(id)
      .set(updateTaskDto);
  }

  async deleteTask(id: string) {
    return this.firebaseService
      .getInstance()
      .collection('tasks')
      .doc(id)
      .delete();
  }
}
