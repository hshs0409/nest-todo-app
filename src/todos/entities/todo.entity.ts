import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('TodoInputType', { isAbstract: true }) // graphql Decorater
@ObjectType() // TypeOrm Decorater
@Entity()
export class Todo extends CoreEntity {
  @Field((type) => String) //gql
  @Column() //db
  @IsString() //dto
  name: string;

  @Field((type) => Boolean, { defaultValue: false })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isDone: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  description: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.todos, { onDelete: 'CASCADE' })
  owner: User;

  @RelationId((todo: Todo) => todo.owner)
  ownerId: number;
}
