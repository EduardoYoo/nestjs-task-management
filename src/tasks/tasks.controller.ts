//Controller will be entry point
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} //TasksService injected

  //Return array of tasks
  @Get()
  public getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  //Return task by ID
  @Get('/:id') //The colon tells NestJS the id will be a path parameter
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  //Creates task using DTO
  @Post()
  public createTask(
    @Body()
    createTaskDto: CreateTaskDto /*@Body('title') title: string, @Body('description') description: string, -> Without DTO (Old) */,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  //Deletes task by ID
  @Delete('/:id')
  public deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  //Updates task by ID
  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
