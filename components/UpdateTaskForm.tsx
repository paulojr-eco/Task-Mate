import { useUpdateTaskMutation } from "@/generated/graphql-frontend";
import { isApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Values {
  title: string;
}

interface UpdateTaskFormProps {
  id: number;
  initialValues: Values;
}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  initialValues,
  id,
}) => {
  const [values, setValues] = useState<Values>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const router = useRouter();

  const [updateTask, { loading, error }] = useUpdateTaskMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateTask({
        variables: { input: { id, title: values.title } },
      });
      if (result.data?.updateTask) {
        router.push("/");
      }
    } catch (e) {}
  };

  let errorMessage = "";
  if (error) {
    if (error.networkError) {
      errorMessage = "A network error occurred, please try again.";
    } else {
      errorMessage = "Sorry, an error occurred.";
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert-error">{errorMessage}</p>}
      <p>
        <label className="field-label">Title</label>
        <input
          type="text"
          name="title"
          className="text-input"
          value={values.title}
          onChange={handleChange}
        />
      </p>
      <p>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Loading" : "Save"}
        </button>
      </p>
    </form>
  );
};

export default UpdateTaskForm;
