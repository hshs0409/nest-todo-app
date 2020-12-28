import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todos.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  // graphql return type
  @Query((returns) => [Todo])
  // typescript return type
  todos(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createTodo(
    @Args('input') createTodoDto: CreateTodoDto,
  ): Promise<boolean> {
    try {
      await this.todoService.createTodo(createTodoDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateTodo(
    @Args('input') updateTodoDto: UpdateTodoDto,
  ): Promise<boolean> {
    try {
      await this.todoService.updateTodo(updateTodoDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
