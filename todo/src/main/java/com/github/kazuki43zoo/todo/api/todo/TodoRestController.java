package com.github.kazuki43zoo.todo.api.todo;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.validation.groups.Default;

import org.dozer.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.github.kazuki43zoo.todo.api.todo.TodoResource.PostTodos;
import com.github.kazuki43zoo.todo.api.todo.TodoResource.PutTodo;
import com.github.kazuki43zoo.todo.domain.model.Todo;
import com.github.kazuki43zoo.todo.domain.service.todo.TodoService;

@RequestMapping("todos")
@Controller
public class TodoRestController {

    @Inject
    TodoService todoService;

    @Inject
    Mapper beanMapper;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<TodoResource> getTodos() {
        List<Todo> todos = todoService.getTodos();
        List<TodoResource> todoResources = new ArrayList<>();
        for (Todo todo : todos) {
            todoResources.add(beanMapper.map(todo, TodoResource.class));
        }
        return todoResources;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public TodoResource postTodos(
            @RequestBody @Validated({ Default.class, PostTodos.class }) TodoResource postedResource) {
        Todo creatingTodo = beanMapper.map(postedResource, Todo.class);
        Todo createdTodo = todoService.createTodo(creatingTodo);
        TodoResource createdResource = beanMapper.map(createdTodo, TodoResource.class);
        return createdResource;
    }

    @RequestMapping(value = "{todoId}", method = RequestMethod.GET)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public TodoResource getTodo(@PathVariable String todoId) {
        Todo todo = todoService.getTodo(todoId);
        TodoResource todoResource = beanMapper.map(todo, TodoResource.class);
        return todoResource;
    }

    @RequestMapping(value = "{todoId}", method = RequestMethod.PUT)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public TodoResource putTodo(@PathVariable String todoId, @RequestBody @Validated({
            Default.class, PutTodo.class }) TodoResource putedResource) {
        Todo updatingTodo = beanMapper.map(putedResource, Todo.class);
        Todo updatedTodo = todoService.updateTodo(todoId, updatingTodo);
        TodoResource todoResource = beanMapper.map(updatedTodo, TodoResource.class);
        return todoResource;
    }

    @RequestMapping(value = "{todoId}", method = RequestMethod.DELETE)
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable String todoId) {
        todoService.deleteTodo(todoId);
    }

}
