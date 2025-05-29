package com.velocirent.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "veloci_users")
public class Users {
    @Id
    @NotNull(message = "Matrícula é obrigatória")
    private Integer matricula;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String name;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Telefone deve conter apenas números (10-15 dígitos)")
    private String cellphone;

    @NotBlank(message = "Perfil é obrigatório")
    private String role;

    public Users() {
    }

    public Users(Integer matricula, String name, String cellphone, String role) {
        this.matricula = matricula;
        this.name = name;
        this.cellphone = cellphone;
        this.role = role;
    }


    public Integer getMatricula() {
        return matricula;
    }

    public void setMatricula(Integer matricula) {
        this.matricula = matricula;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
