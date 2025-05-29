package com.velocirent.controller;


import com.velocirent.model.Bikes;
import com.velocirent.repository.BikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bikes")
public class BikesController {

    @Autowired
    private BikesRepository bikesRepository;

    @GetMapping
    public List<Bikes> getAllBikes() {
        return bikesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bikes> getBikeById(@PathVariable int id) {
        return bikesRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Bikes> createBike(@RequestBody Bikes bike) {
        Bikes savedBike = bikesRepository.save(bike);
        return ResponseEntity.ok(savedBike);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bikes> updateBike(@PathVariable int id, @RequestBody Bikes bikeDetails) {
        if (!bikesRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        bikeDetails.setId(id);
        Bikes updatedBike = bikesRepository.save(bikeDetails);
        return ResponseEntity.ok(updatedBike);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBike(@PathVariable int id) {
        if (!bikesRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bikesRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
