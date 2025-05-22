package com.velocirent.entities;

import jakarta.persistence.*;

@Entity
public class VelociBikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String model;
    private boolean available;
    private int owner_matricula;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public int getOwner_matricula() {
        return owner_matricula;
    }

    public void setOwner_matricula(int owner_matricula) {
        this.owner_matricula = owner_matricula;
    }
}
