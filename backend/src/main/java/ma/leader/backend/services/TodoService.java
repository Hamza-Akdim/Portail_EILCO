package ma.leader.backend.services;

import ma.leader.backend.dtos.TodoDto;

import java.util.List;

public interface TodoService {

    TodoDto addTodo(TodoDto todoDto, Long userId);

    TodoDto getTodo(Long id, Long userId);

    List<TodoDto> getAllTodosByUserId(Long userId);

    TodoDto updateTodo(TodoDto todoDto, Long id, Long userId);

    void deleteTodo(Long id, Long userId);

    TodoDto completeTodo(Long id, Long userId);

    TodoDto inCompleteTodo(Long id, Long userId);
}
