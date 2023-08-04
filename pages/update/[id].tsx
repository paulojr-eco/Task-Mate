import UpdateTaskForm from "@/components/UpdateTaskForm";
import {
  TaskDocument,
  TaskQuery,
  TaskQueryVariables,
  useTaskQuery,
} from "@/generated/graphql-frontend";
import { initializeApollo } from "@/lib/client";
import { GetServerSideProps } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const UpdateTask = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id, 10) : NaN;
  const { data, loading, error } = useTaskQuery({ variables: { taskId: id } });
  if (!id) {
    return <Error statusCode={404} />;
  }
  const task = data?.task;
  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>An error occurred.</p>
  ) : task ? (
    <UpdateTaskForm id={task.id} initialValues={{ title: task.title }} />
  ) : (
    <p>Task not found.</p>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id === "string"
      ? parseInt(context.params.id, 10)
      : NaN;
  if (id) {
    const apolloClient = initializeApollo();
    await apolloClient.query<TaskQuery, TaskQueryVariables>({
      query: TaskDocument,
      variables: { taskId: id },
    });
    return { props: { initialApolloState: apolloClient.cache.extract() } };
  }
  return { props: {} };
};

export default UpdateTask;
