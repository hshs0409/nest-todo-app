import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class CreateTodoInput extends PickType(Todo, [
  'name',
  'description',
  'isDone',
]) {}

@ObjectType()
export class CreateTodoOutput extends CoreOutput {}
