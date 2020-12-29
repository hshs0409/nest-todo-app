import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteTodoInput {
  @Field((type) => Number)
  todoId: number;
}

@ObjectType()
export class DeleteTodoOutput extends CoreOutput {}
