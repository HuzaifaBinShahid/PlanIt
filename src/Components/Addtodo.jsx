import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { Field, Form, Formik } from "formik";
import { React, useContext } from "react";

import MessageContext from "../context";
import { addTodo } from "../services/Todos";

const Addtodo = () => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext);

  const {
    mutate: addTodoMutate,
    isPending: addingTodo,
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
      <h3 className="text-center">Plan a New Task</h3>

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
          <Form className="d-flex flex-column w-50 mx-auto">
            <div className="form-group d-flex flex-column mb-3">
              <label htmlFor="title">Title</label>
              <Field
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter task title"
                    disabled={addingTodo}
                    className="custom-input py-3 text-base rounded-md bg-transparent text-white"
                  />
                )}
              />
              {touched.title && errors.title && (
                <div className="text-danger small mt-1">{errors.title}</div>
              )}
            </div>

            <div className="form-group d-flex flex-column mb-3">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                render={({ field }) => (
                  <Input
                  {...field}
                  id="description"
                  placeholder="Enter task description"
                  disabled={addingTodo}
                  className="custom-input py-3 text-base rounded-md bg-transparent text-white"
                />
                
                )}
              />
              {touched.description && errors.description && (
                <div className="text-danger small mt-1">
                  {errors.description}
                </div>
              )}
            </div>

            <Button
              className="w-25 mx-auto"
              type="primary"
              htmlType="submit"
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
