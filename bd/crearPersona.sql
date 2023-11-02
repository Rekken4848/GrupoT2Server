-- crearPersona.sql
create table Persona (
dni varchar(10) not null,
nombre varchar(15) not null,
apellidos varchar(50) not null,
correo varchar not null,
telefono varchar(20) not null,
primary key (dni)
);