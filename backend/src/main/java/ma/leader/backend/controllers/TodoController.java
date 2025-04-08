package ma.leader.backend.controllers;

import lombok.AllArgsConstructor;
import ma.leader.backend.dtos.TodoDto;
import ma.leader.backend.entities.User;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.security.JwtUtils;
import ma.leader.backend.services.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/todos")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@AllArgsConstructor
public class TodoController {

    private final TodoService todoService;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto, @CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        TodoDto savedTodo = todoService.addTodo(todoDto, userId);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long todoId, @CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        TodoDto todoDto = todoService.getTodo(todoId, userId);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos(@CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<TodoDto> todos = todoService.getAllTodosByUserId(userId);
        return ResponseEntity.ok(todos);
    }

    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable("id") Long todoId, @CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        TodoDto updatedTodo = todoService.updateTodo(todoDto, todoId, userId);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoId, @CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        todoService.deleteTodo(todoId, userId);
        return ResponseEntity.ok("Todo deleted successfully!.");
    }

    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long todoId, @CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        TodoDto updatedTodo = todoService.completeTodo(todoId, userId);
        return ResponseEntity.ok(updatedTodo);
    }

    @PatchMapping("{id}/in-complete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long todoId, @CookieValue(name = "token") String token) {
        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        TodoDto updatedTodo = todoService.inCompleteTodo(todoId, userId);
        return ResponseEntity.ok(updatedTodo);
    }

    private Long getUserIdFromToken(String token) {
        if (token == null || !jwtUtils.validateToken(token)) {
            return null;
        }
        return jwtUtils.extractUserId(token);
    }
}
