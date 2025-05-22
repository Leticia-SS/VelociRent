package com.velocirent.repositories;

import com.velocirent.entities.VelociBikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikesRepository extends JpaRepository<VelociBikes, Long> {

}
