package com.github.kazuki43zoo.todo.domain.service.todo;

import java.util.List;

import com.github.kazuki43zoo.todo.domain.model.Todo;

public interface TodoService {
    List<Todo> getTodos();

    Todo getTodo(String todoId);

    Todo createTodo(Todo creatingTodo);

    Todo updateTodo(String todoId, Todo updatingTodo);

    void deleteTodo(String todoId);
}
