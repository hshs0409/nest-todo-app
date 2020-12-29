import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoInput, CreateTodoOutput } from './dtos/create-todo.dto';
import { DeleteTodoInput, DeleteTodoOutput } from './dtos/delete-todo.dto';
import { EditTodoInput, EditTodoOutput } from './dtos/edit-todo.dto';
import { TodosInput, TodosOutput } from './dtos/todos.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todos: Repository<Todo>,
  ) {}

  async createTodo(
    owner: User,
    createTodoInput: CreateTodoInput,
  ): Promise<CreateTodoOutput> {
    try {
      const newTodo = this.todos.create(createTodoInput);
      newTodo.owner = owner;
      await this.todos.save(newTodo);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: `Couldn't create todo`,
      };
    }
  }

  async editTodo(
    owner: User,
    editTodoInput: EditTodoInput,
  ): Promise<EditTodoOutput> {
    try {
      const todo = await this.todos.findOne(editTodoInput.todoId, {
        loadRelationIds: true,
      });
      if (!todo) {
        return {
          ok: false,
          error: 'Todo not Found',
        };
      }
      if (owner.id !== todo.ownerId) {
        return {
          ok: false,
          error: "You're not Todo Owner",
        };
      }
      await this.todos.save([
        {
          id: editTodoInput.todoId,
          ...editTodoInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteTodo(
    owner: User,
    { todoId }: DeleteTodoInput,
  ): Promise<DeleteTodoOutput> {
    try {
      const todo = await this.todos.findOne(todoId);
      if (!todo) {
        return {
          ok: false,
          error: 'Todo not Found',
        };
      }
      if (owner.id !== todo.ownerId) {
        return {
          ok: false,
          error: "You're not Todo Owner",
        };
      }
      // console.log('delete');
      await this.todos.delete(todoId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete Todo',
      };
    }
  }

  async allTodos({ page }: TodosInput): Promise<TodosOutput> {
    try {
      const [todos, allResults] = await this.todos.findAndCount({
        skip: (page - 1) * 10,
        take: 10,
      });
      console.log(todos, allResults);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not find todos',
      };
    }
  }
}
