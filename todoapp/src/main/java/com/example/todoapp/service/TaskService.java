package com.example.todoapp.service;

import com.example.todoapp.model.Task;
import com.example.todoapp.model.User;
import com.example.todoapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public Task addTask(Task task, User user) {
        task.setUser(user);
        return repo.save(task);
    }

    public List<Task> getTasks(User user) {
        return repo.findByUser(user);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}
