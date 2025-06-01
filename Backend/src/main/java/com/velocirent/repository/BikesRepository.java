package com.velocirent.repository;

import com.velocirent.model.Bikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikesRepository extends JpaRepository<Bikes, Integer> {
    List<Bikes> findByAvailable(boolean available);
}
