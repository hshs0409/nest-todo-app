import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateTodoInput, CreateTodoOutput } from './dtos/create-todo.dto';
import { DeleteTodoInput, DeleteTodoOutput } from './dtos/delete-todo.dto';
import { EditTodoInput, EditTodoOutput } from './dtos/edit-todo.dto';
import { TodosInput, TodosOutput } from './dtos/todos.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todos.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation((returns) => CreateTodoOutput)
  @Role(['Client'])
  async createTodo(
    @AuthUser() authUser: User,
    @Args('input') createTodoInput: CreateTodoInput,
  ): Promise<CreateTodoOutput> {
    return this.todoService.createTodo(authUser, createTodoInput);
  }

  @Mutation((returns) => EditTodoOutput)
  @Role(['Client'])
  editTodo(
    @AuthUser() owner: User,
    @Args('input') editTodoInput: EditTodoInput,
  ): Promise<EditTodoOutput> {
    return this.todoService.editTodo(owner, editTodoInput);
  }

  @Mutation((returns) => DeleteTodoOutput)
  @Role(['Client'])
  deleteTodo(
    @AuthUser() owner: User,
    @Args('input') deleteTodoInput: DeleteTodoInput,
  ): Promise<DeleteTodoOutput> {
    return this.todoService.deleteTodo(owner, deleteTodoInput);
  }

  @Query((returns) => TodosOutput)
  todos(@Args('input') todosInput: TodosInput): Promise<TodosOutput> {
    return this.todoService.allTodos(todosInput);
  }
}
