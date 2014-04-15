package com.github.kazuki43zoo.todo.domain.repository.todo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.kazuki43zoo.todo.domain.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, String> {

}
