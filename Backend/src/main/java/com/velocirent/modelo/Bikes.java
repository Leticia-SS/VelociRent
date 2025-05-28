package com.velocirent.modelo;

public class Bikes {
    private int id;
    private String model;
    private boolean available;
    private int ownerMatricula;

    public Bikes(int id, String model, boolean available, int ownerMatricula) {
        this.id = id;
        this.model = model;
        this.available = available;
        this.ownerMatricula = ownerMatricula;
    }

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

    public int getOwnerMatricula() {
        return ownerMatricula;
    }

    public void setOwnerMatricula(int ownerMatricula) {
        this.ownerMatricula = ownerMatricula;
    }
}
