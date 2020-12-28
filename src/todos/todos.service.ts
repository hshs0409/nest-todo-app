import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todo: Repository<Todo>,
  ) {}
  getAll(): Promise<Todo[]> {
    return this.todo.find();
  }
  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todo.create(createTodoDto);
    return this.todo.save(newTodo);
  }
  updateTodo({ id, data }: UpdateTodoDto) {
    this.todo.update(id, { ...data });
  }
}
