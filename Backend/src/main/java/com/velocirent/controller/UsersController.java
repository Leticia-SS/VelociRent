package com.velocirent.controller;

import com.velocirent.model.Users;
import com.velocirent.repository.UsersRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody Users user) {
        try {
            if (usersRepository.existsById(user.getMatricula())) {
                return ResponseEntity.badRequest()
                        .body("{\"error\": \"Matrícula já cadastrada\"}");
            }

            Users savedUser = usersRepository.save(user);
            return ResponseEntity.ok(savedUser);

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body("{\"error\": \"Violação de integridade: " + e.getMostSpecificCause().getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("{\"error\": \"Erro ao processar requisição: " + e.getMessage() + "\"}");
        }
    }

    @GetMapping
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("/{matricula}")
    public ResponseEntity<Users> getUser(@PathVariable Integer matricula) {
        return usersRepository.findById(matricula)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{matricula}")
    public ResponseEntity<?> updateUser(
            @PathVariable Integer matricula,
            @Valid @RequestBody Users userDetails) {

        if (!usersRepository.existsById(matricula)) {
            return ResponseEntity.notFound().build();
        }

        userDetails.setMatricula(matricula);
        Users updatedUser = usersRepository.save(userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{matricula}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer matricula) {
        if (!usersRepository.existsById(matricula)) {
            return ResponseEntity.notFound().build();
        }
        usersRepository.deleteById(matricula);
        return ResponseEntity.noContent().build();
    }
}

