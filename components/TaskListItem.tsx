import {
  Task,
  TaskStatus,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/generated/graphql-frontend";
import { Reference } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { deleteTaskId: task.id },
    errorPolicy: "all",
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask;
      if (deletedTask) {
        cache.modify({
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              return taskRefs.filter((taskRef) => {
                return readField("id", taskRef) !== deletedTask.id;
              });
            },
          },
        });
      }
    },
  });
  const handleDeleteClick = async () => {
    try {
      await deleteTask();
    } catch (e) {}
  };

  useEffect(() => {
    if (error) {
      alert("An error occured, please try again.");
    }
  }, [error]);

  const [updateTask, { loading: updateTaskLoading, error: updateTaskError }] =
    useUpdateTaskMutation({ errorPolicy: "all" });
  const handleStatusChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked
      ? TaskStatus.Completed
      : TaskStatus.Active;
    try {
      await updateTask({
        variables: { input: { id: task.id, status: newStatus } },
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (updateTaskError) {
      alert("An error occurred, please try again");
    }
  }, [updateTaskError]);

  return (
    <li key={task.id} className="task-list-item">
      <label className="checkbox">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          disabled={updateTaskLoading}
          checked={task.status === TaskStatus.Completed}
        />
        <span className="checkbox-mark">&#10003;</span>
      </label>
      <Link
        href={"/update/[id]"}
        as={`/update/${task.id}`}
        className="task-list-item-title"
      >
        {task.title} ({task.status})
      </Link>
      <button
        className="task-list-item-delete"
        disabled={loading}
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </li>
  );
};

export default TaskListItem;
