import { TaskStatus } from "@/generated/graphql-frontend";
import Link from "next/link";
import React from "react";

interface TaskFilterProps {
  status?: TaskStatus;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ status }) => {
  return (
    <ul className="task-filter">
      <li>
        <Link
          href={"/"}
          scroll={false}
          shallow={true}
          className={!status ? "task-filter-active" : ""}
        >
          All
        </Link>
      </li>
      <li>
        <Link
          href={"/[status]"}
          as={`/${TaskStatus.Active}`}
          scroll={false}
          shallow={true}
          className={status === TaskStatus.Active ? "task-filter-active" : ""}
        >
          Active
        </Link>
      </li>
      <li>
        <Link
          href={"/[status]"}
          as={`/${TaskStatus.Completed}`}
          scroll={false}
          shallow={true}
          className={
            status === TaskStatus.Completed ? "task-filter-active" : ""
          }
        >
          {" "}
          Completed
        </Link>
      </li>
    </ul>
  );
};

export default TaskFilter;
