import { React, useContext } from "react";
import { Formik, Field, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Spin } from "antd";

import { addTodo } from "../services/Todos";
import MessageContext from "../context";

const Addtodo = () => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext)

  const {
    mutate: addTodoMutate,
    isLoading: addingTodo,
    isError,
  } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: (newTodo) => addTodo(newTodo.title, newTodo.description),
    onSuccess: () => {
      message.success("New Task Added");
      queryClient.invalidateQueries("getAllTodos");
    },
    onError: () => {
      message.error("There was an error adding your task. Please try again.");
    },
  });

  const initialValues = {
    title: "",
    description: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    addTodoMutate(values);
    resetForm();
  };

  return (
    <div className="container my-5">
      <h3>Add a Task</h3>

      {addingTodo && <Spin size="large" />}

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title is required";
          }
          if (!values.description) {
            errors.description = "Description is required";
          }
          return errors;
        }}
      >
        {({ setFieldValue, errors, touched, isValid, dirty }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title of Task</label>
              <Field
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter task title"
                    disabled={addingTodo}
                  />
                )}
              />
              {touched.title && errors.title && (
                <div style={{ color: "red" }}>{errors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="description"
                    placeholder="Enter task description"
                    disabled={addingTodo}
                  />
                )}
              />
              {touched.description && errors.description && (
                <div style={{ color: "red" }}>{errors.description}</div>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              disabled={addingTodo || !dirty || !isValid}
            >
              {addingTodo ? "Adding..." : "Add a Task"}
            </Button>
          </Form>
        )}
      </Formik>

      {isError && (
        <p style={{ color: "red" }}>
          There was an error adding the todo. Please try again.
        </p>
      )}
    </div>
  );
};

export default Addtodo;
