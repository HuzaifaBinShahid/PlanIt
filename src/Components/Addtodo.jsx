import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import { Field, Form, Formik } from "formik";
import { React, useContext } from "react";
import Papa from "papaparse";

import { addTodo } from "../services/Todos";
import { MessageContext, TodosContext } from "../context";

const Addtodo = () => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext);
  const todos = useContext(TodosContext);

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

  const handleExport = () => {
    if (!todos || todos.length === 0) {
      message.warning("No todos to export.");
      return;
    }
    const headers = ["Title", "Description", "Created At"];
    const rows = todos.map((todo) => [
      `"${todo.title}"`,
      `"${todo.description}"`,
      `"${new Date(todo.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "todos_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const todos = results.data;

        const validTodos = todos
          .filter((t) => t.Title && t.Description)
          .map((t) => ({
            title: t.Title.trim(),
            description: t.Description.trim(),
          }));

        if (validTodos.length === 0) {
          message.warning("No valid todos found in the CSV.");
          return;
        }

        validTodos.forEach((todo) => addTodoMutate(todo));
      },
    });

    return false; // prevent auto-upload
  };

  return (
    <div className="container my-5">
      <div>
        <div
          className="text-center mb-3 position-absolute"
          style={{ right: 20 }}
        >
          <Button type="primary" onClick={handleExport}>
            Export Plans as CSV
          </Button>
        </div>
        <div
          className="text-center mb-3 position-absolute text-white"
          style={{ right: 20, top: 40 }}
        >
          <Upload
            accept=".csv"
            showUploadList={true}
            beforeUpload={handleImport}
            className="custom-upload"
          >
            <Button icon={<UploadOutlined />} type="dashed">
              Import Plans from CSV
            </Button>
          </Upload>
        </div>
      </div>
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
              <Field name="title">
                {({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter task title"
                    disabled={addingTodo}
                    className="custom-input py-3 text-base rounded-md bg-transparent text-white"
                  />
                )}
              </Field>
              {touched.title && errors.title && (
                <div className="text-danger small mt-1">{errors.title}</div>
              )}
            </div>

            <div className="form-group d-flex flex-column mb-3">
              <label htmlFor="description">Description</label>
              <Field name="description">
                {({ field }) => (
                  <Input
                    {...field}
                    id="description"
                    placeholder="Enter task description"
                    disabled={addingTodo}
                    className="custom-input py-3 text-base rounded-md bg-transparent text-white"
                  />
                )}
              </Field>
              {touched.description && errors.description && (
                <div className="text-danger small mt-1">
                  {errors.description}
                </div>
              )}
            </div>

            <Button className="w-25 mx-auto" type="primary" htmlType="submit">
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
