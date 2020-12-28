import { InputType, OmitType } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';

@InputType()
export class CreateTodoDto extends OmitType(Todo, ['id']) {}
