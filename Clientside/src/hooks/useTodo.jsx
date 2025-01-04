import { useEffect, useState } from "react";
import axios from "../apis/todoApi.js";
import { useAxios } from "./useAxios.jsx";

export const useTodo = () => {
  const [todoList, loading, message, statusCode, axiosFetch] = useAxios();

  useEffect(() => {
    getTodo();
    console.log("hi");
  }, []);
  useEffect(() => {
    getTodo();
  }, [message]);
  useEffect(() => {
    console.log(todoList, "from useTodo");
  }, [loading]);

  const getTodo = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: "/api/todo",
    });
  };

  const postTodo = (newTask) => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/api/todo",
      reqConfiq: {
        todo: newTask,
      },
    });
  };

  const deleteTodo = (id) => {
    axiosFetch({
      axiosInstance: axios,
      method: "delete",
      url: "/api/todo",
      reqConfiq: {
        data: { id },
      },
    });
  };

  const updateTodo = (id, editedTask) => {
    axiosFetch({
      axiosInstance: axios,
      method: "put",
      url: "/api/todo",
      reqConfiq: {
        id,
        todo: editedTask,
        isCompleted: false,
      },
    });
  };

  const editComplete = (id) => {
    axiosFetch({
      axiosInstance: axios,
      method: "put",
      url: "/api/todo/iscomplete",
      reqConfiq: {
        id,
      },
    });
  };

  return [todoList, getTodo, postTodo, updateTodo, deleteTodo, editComplete];
};
