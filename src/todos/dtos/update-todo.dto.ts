import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoDto } from './create-todo.dto';

@InputType()
class UpdateTodoInputType extends PartialType(CreateTodoDto) {}

@InputType()
export class UpdateTodoDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateTodoInputType)
  data: UpdateTodoInputType;
}
