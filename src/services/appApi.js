import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "app",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001" }),

  endpoints: (builder) => ({
    // creating the user
    signupUser: builder.mutation({
      query: (userDetails) => ({
        url: "/signup",
        method: "POST",
        body: userDetails,
      }),
    }),
    //login the user
    loginUser: builder.mutation({
      query: (userDetails) => ({
        url: "/login",
        method: "POST",
        body: userDetails,
      }),
    }),
    //fetching all task
    fetchAllTask: builder.mutation({
      query: (userId) => ({
        url: "/fetch-all-tasks",
        method: "POST",
        body: userId,
      }),
    }),
    // create task
    createTask: builder.mutation({
      query: (taskDetails) => ({
        url: "/create-tasks",
        method: "POST",
        body: taskDetails,
      }),
    }),
    //update tasks
    updateTask: builder.mutation({
      query: (newTaskDetails, taskId) => ({
        url: `/update-tasks`,
        method: "POST",
        body: newTaskDetails,
      }),
    }),
    //delete task
    deleteTask: builder.mutation({
      query: (userId, taskId) => ({
        url: `/delete-tasks`,
        method: "POST",
        body: userId,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useFetchAllTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = appApi;

export const { useGetPostsQuery } = appApi;
