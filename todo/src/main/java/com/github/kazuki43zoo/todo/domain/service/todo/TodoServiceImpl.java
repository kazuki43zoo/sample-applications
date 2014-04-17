package com.github.kazuki43zoo.todo.domain.service.todo;

import java.util.List;

import javax.inject.Inject;

import org.dozer.Mapper;
import org.joda.time.DateTime;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.terasoluna.gfw.common.date.DateFactory;

import com.github.kazuki43zoo.todo.domain.model.Todo;
import com.github.kazuki43zoo.todo.domain.repository.todo.TodoRepository;

@Transactional
@Service
public class TodoServiceImpl implements TodoService {

    @Inject
    TodoRepository todoRepository;

    @Inject
    DateFactory dateFactory;

    @Inject
    Mapper beanMapper;

    @Transactional(readOnly = true)
    public List<Todo> getTodos() {
        Sort sort = new Sort("completed", "createdAt");
        return todoRepository.findAll(sort);
    }

    @Transactional(readOnly = true)
    public Todo getTodo(String todoId) {
        return todoRepository.findOne(todoId);
    }

    public Todo createTodo(Todo creatingTodo) {
        DateTime now = dateFactory.newDateTime();
        creatingTodo.setCreatedAt(now.toDate());
        return todoRepository.save(creatingTodo);
    }

    public Todo updateTodo(String todoId, Todo updatingTodo) {
        Todo todo = getTodo(todoId);
        beanMapper.map(updatingTodo, todo);
        return todoRepository.save(todo);
    }

    public void deleteTodo(String todoId) {
        todoRepository.delete(todoId);
    }

}
