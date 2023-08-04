import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

export enum TaskStatus {
  active = "active",
  completed = "completed",
}

export type Context = {
  prisma: PrismaClient;
};

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export const resolvers = {
  Query: {
    async tasks(parent: any, args: { status?: TaskStatus }, context: Context) {
      const { status } = args;
      const result = await context.prisma.task.findMany({
        where: {
          status: status === null ? undefined : status,
        },
      });
      return result;
    },
    async task(parent: any, args: { id: number }, context: Context) {
      const task = await context.prisma.task.findFirst({
        where: {
          id: args.id,
        },
      });
      return task;
    },
  },
  Mutation: {
    async createTask(
      parent: any,
      args: { input: { title: string } },
      context: Context
    ): Promise<Task> {
      const result = await context.prisma.task.create({
        data: {
          title: args.input.title,
          status: TaskStatus.active,
        },
      });
      return {
        id: result.id,
        title: args.input.title,
        status: TaskStatus.active,
      };
    },
    async updateTask(
      parent: any,
      args: { input: { id: number; title: string; status: TaskStatus } },
      context: Context
    ) {
      const result = await context.prisma.task.update({
        where: {
          id: args.input.id,
        },
        data: {
          title: args.input.title,
          status: args.input.status,
        },
      });
      return result;
    },
    async deleteTask(parent: any, args: { id: number }, context: Context) {
      const task = await context.prisma.task.findFirst({
        where: {
          id: args.id,
        },
      });
      if (!task) {
        throw new GraphQLError("Could not find the task");
      }
      const deletedTask = await context.prisma.task.delete({
        where: {
          id: args.id,
        },
      });
      return deletedTask;
    },
  },
};
