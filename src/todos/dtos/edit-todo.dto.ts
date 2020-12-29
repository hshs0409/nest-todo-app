import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateTodoInput } from './create-todo.dto';

@InputType()
export class EditTodoInput extends PartialType(CreateTodoInput) {
  @Field((type) => Number)
  todoId: number;
}

@ObjectType()
export class EditTodoOutput extends CoreOutput {}
