package com.github.kazuki43zoo.todo.api.todo;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

public class TodoResource {
    interface PostTodos {

    }

    interface PutTodo {

    }

    @Null(groups = PostTodos.class)
    private String todoId;

    @NotNull
    @Size(min = 1, max = 128)
    private String title;

    @Size(max = 1024)
    private String description;

    private Date createdAt;

    private boolean completed;

    public String getTodoId() {
        return todoId;
    }

    public void setTodoId(String todoId) {
        this.todoId = todoId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean complated) {
        this.completed = complated;
    }

}
