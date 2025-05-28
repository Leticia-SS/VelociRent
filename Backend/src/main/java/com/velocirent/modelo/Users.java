package com.velocirent.modelo;

public class Users {
    private int matricula;
    private String name;
    private long cellphone;
    private String role;


    public Users(int matricula, String name, long cellphone, String role) {
        this.matricula = matricula;
        this.name = name;
        this.cellphone = cellphone;
        this.role = role;
    }

    public int getMatricula() {
        return matricula;
    }

    public void setMatricula(int matricula) {
        this.matricula = matricula;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCellphone() {
        return cellphone;
    }

    public void setCellphone(long cellphone) {
        this.cellphone = cellphone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
