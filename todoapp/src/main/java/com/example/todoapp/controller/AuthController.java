package com.example.todoapp.controller;

import com.example.todoapp.model.User;
import com.example.todoapp.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }


    @GetMapping("/me")
    public ResponseEntity<Void> me() {
        return ResponseEntity.ok().build();
    }


    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return service.signup(user.getUsername(), user.getPassword());
    }

    @PostMapping("/login")
    public User login(@RequestBody User user, HttpSession session) {
        User loggedIn = service.login(user.getUsername(), user.getPassword());
        session.setAttribute("user", loggedIn);
        return loggedIn;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
