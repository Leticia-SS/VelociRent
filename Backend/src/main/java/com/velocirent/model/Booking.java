package com.velocirent.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "veloci_bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "matricula")
    private Users user;
    @ManyToOne
    @JoinColumn(name = "bike_id")
    private Bikes bike;
    private Date startTime;
    private Date endTime;
    private String status;


    public Booking() {
    }

    public Booking(Integer id, Users user, Bikes bike, Date startTime, Date endTime, String status) {
        this.id = id;
        this.user = user;
        this.bike = bike;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Bikes getBike() {
        return bike;
    }

    public void setBike(Bikes bike) {
        this.bike = bike;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
