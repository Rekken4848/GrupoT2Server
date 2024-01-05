-- crearMedicionDispositivo.sql
create table Medicion_Dispositivo (
medicion_id integer not null,
dispositivo_id varchar(10) not null,
foreign key (medicion_id) references Medicion(id),
foreign key (dispositivo_id) references Dispositivo(dispositivo_id),
primary key (medicion_id)
);