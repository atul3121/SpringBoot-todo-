package com.example.todoapp.controller;

import com.example.todoapp.model.Task;
import com.example.todoapp.model.User;
import com.example.todoapp.service.TaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public Task addTask(@RequestBody Task task, HttpSession session) {
        User user = (User) session.getAttribute("user");
        return service.addTask(task, user);
    }

    @GetMapping
    public List<Task> getTasks(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return service.getTasks(user);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
