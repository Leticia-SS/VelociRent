package com.velocirent.controller;

import com.velocirent.model.Booking;
import com.velocirent.repository.BikesRepository;
import com.velocirent.repository.BookingRepository;
import com.velocirent.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BikesRepository bikesRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable int id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getUser() == null || booking.getBike() == null ||
                booking.getStartTime() == null || booking.getEndTime() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (!usersRepository.existsById(booking.getUser().getMatricula()) ||
                !bikesRepository.existsById(booking.getBike().getId())) {
            return ResponseEntity.badRequest().build();
        }

        if (booking.getEndTime().before(booking.getStartTime())) {
            return ResponseEntity.badRequest().build();
        }

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable int id, @RequestBody Booking booking) {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        if (booking.getUser() == null || booking.getBike() == null ||
                booking.getStartTime() == null || booking.getEndTime() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (!usersRepository.existsById(booking.getUser().getMatricula()) ||
                !bikesRepository.existsById(booking.getBike().getId())) {
            return ResponseEntity.badRequest().build();
        }

        if (booking.getEndTime().before(booking.getStartTime())) {
            return ResponseEntity.badRequest().build();
        }

        booking.setId(id);
        Booking updatedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{matricula}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable int matricula) {
        if (!usersRepository.existsById(matricula)) {
            return ResponseEntity.notFound().build();
        }
        List<Booking> bookings = bookingRepository.findByUserMatricula(matricula);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bike/{bikeId}")
    public ResponseEntity<List<Booking>> getBookingsByBike(@PathVariable int bikeId) {
        if (!bikesRepository.existsById(bikeId)) {
            return ResponseEntity.notFound().build();
        }
        List<Booking> bookings = bookingRepository.findByBikeId(bikeId);
        return ResponseEntity.ok(bookings);
    }
}
