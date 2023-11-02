-- crearAdmin.sql
create table Admin (
dni_admin varchar(10) not null,
contrasenya float(50) not null,
foreign key (dni_admin) references Persona(dni),
primary key (dni_admin)
);