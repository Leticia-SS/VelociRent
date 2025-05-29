package com.velocirent.repository;

import com.velocirent.model.Bikes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BikesRepository extends JpaRepository<Bikes, Integer> {
}
