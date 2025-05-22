package com.velocirent.controler;

import com.velocirent.entities.VelociBikes;
import com.velocirent.repositories.BikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/velociUsers")
public class BikeControler {
    @Autowired
    private BikesRepository bikesRepository;

    @GetMapping
    public List<VelociBikes> listBikes() {
        return bikesRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public VelociBikes getBikes(@PathVariable long id) {
        return bikesRepository.findById(id).get();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VelociBikes addBikes(@RequestBody VelociBikes bikes){
        return bikesRepository.save(bikes);
    }

   @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> removeBike(@PathVariable Long id){
        bikesRepository.deleteById(id);
        return ResponseEntity.ok(true);
   }

}
