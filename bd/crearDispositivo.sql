-- crearDispositivo.sql
create table Dispositivo (
dispositivo_id varchar(20) not null,
dni_empleado varchar(10) not null,
foreign key (dni_empleado) references Persona(dni),
primary key (dispositivo_id)
);