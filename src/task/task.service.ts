import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  findAll() {
    return this.taskRepository.getTasks();
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateTask(id, updateTaskDto);
  }

  remove(id: string) {
    return this.taskRepository.deleteTask(id);
  }
}
