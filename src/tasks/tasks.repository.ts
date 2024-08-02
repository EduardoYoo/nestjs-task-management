import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task'); //This 'task' will be used below

    if (status) {
      query.andWhere('task.status === :status', { status }); //:status is like a variable for the query, and then you provide the values
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', //LIKE will look for a partial match
        { search: `%${search}%` }, //Ex.: if search term is "Clean", it will also look for "Cle"
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  //Used to be at Service, but this should be handled at the Repository
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    //Create object based on repository
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    //Save the object into the database
    await this.save([task]);
    return task;
  }
}
