import CreateTaskForm from "@/components/CreateTaskForm";
import TaskFilter from "@/components/TaskFilter";
import TaskList from "@/components/TaskList";
import {
  TaskStatus,
  TasksDocument,
  TasksQuery,
  TasksQueryVariables,
  useTasksQuery,
} from "@/generated/graphql-frontend";
import { initializeApollo } from "@/lib/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Custom404 from "./404";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const status =
    typeof context.params?.status === "string"
      ? isTaskStatus(context.params?.status)
        ? context.params?.status
        : undefined
      : undefined;

  if (status === undefined || isTaskStatus(status)) {
    const apolloClient = initializeApollo();
    await apolloClient.query<TasksQuery, TasksQueryVariables>({
      query: TasksDocument,
      variables: { status },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }

  return { props: {} };
};

const isTaskStatus = (value: string): value is TaskStatus =>
  Object.values(TaskStatus).includes(value as TaskStatus);

export default function Home() {
  const router = useRouter();
  const status =
    typeof router.query.status === "string"
      ? isTaskStatus(router.query.status)
        ? router.query.status
        : undefined
      : undefined;

  const prevStattus = useRef(status);
  useEffect(() => {
    prevStattus.current = status;
  }, [status]);

  const result = useTasksQuery({
    variables: { status },
    fetchPolicy:
      prevStattus.current === status ? "cache-first" : "cache-and-network",
  });

  if (
    router.query.status !== undefined &&
    typeof router.query.status === "string" &&
    !isTaskStatus(router.query.status)
  ) {
    return <Custom404 />;
  }
  const tasks = result.data?.tasks;
  return (
    <>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm onSuccess={result.refetch} />
      {result.loading && !tasks ? (
        <p> Loading Tasks... </p>
      ) : result.error ? (
        <p> An error occurred. </p>
      ) : tasks && tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p className="no-tasks-message"> You`ve got no tasks. </p>
      )}
      <TaskFilter status={status} />
    </>
  );
}
