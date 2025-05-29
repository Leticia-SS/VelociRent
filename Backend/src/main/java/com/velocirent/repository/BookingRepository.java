package com.velocirent.repository;

import com.velocirent.model.Bikes;
import com.velocirent.model.Booking;
import com.velocirent.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.user.matricula = :matricula")
    List<Booking> findByUserMatricula(@Param("matricula") int matricula);

    @Query("SELECT b FROM Booking b WHERE b.bike.id = :bikeId")
    List<Booking> findByBikeId(@Param("bikeId") int bikeId);
}
