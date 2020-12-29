import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class TodosInput extends PaginationInput {}

@ObjectType()
export class TodosOutput extends PaginationOutput {
  @Field((type) => [Todo], { nullable: true })
  todos?: Todo[];
}
