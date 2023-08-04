export const typeDefs = /* GraphQL */ `
enum TaskStatus {
  active
  completed
}

type Task {
  id: Int!
  title: String!
  status: TaskStatus!
}

input CreateTaskInput {
  title: String!
}

input UpdatedTaskInput {
  id: Int!
  title: String
  status: TaskStatus
}

type Query {
  tasks(status: TaskStatus): [Task!]!
  task(id: Int!): Task
}
type Mutation {
  createTask(input: CreateTaskInput!): Task
  updateTask(input: UpdatedTaskInput!): Task
  deleteTask(id: Int!): Task
}
`;