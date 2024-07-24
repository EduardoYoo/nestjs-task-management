//Service owns the business logic
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable() //Allows service to be injected into controller
export class TasksService {
  private tasks: Task[] = []; //Will be changed to database later

  //Return array of tasks
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  //Return array of tasks based on filterDTO
  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  //Return task by ID
  public getTaskById(id: string): Task {
    //Try to get task
    const found = this.tasks.find((task) => task.id === id);

    //If not found, throw an error (404 not found)
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    //Else, return found task
    return found;
  }

  //Creates task using DTO
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(), //Using uuid package to generate id
      title,
      description,
      status: TaskStatus.OPEN, //Initialize status as OPEN
    };

    this.tasks.push(task);
    return task;
  }

  //Deletes task by ID
  public deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  //Updates task by ID
  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
