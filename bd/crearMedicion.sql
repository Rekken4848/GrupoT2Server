-- crearMedicion.sql
create table Medicion (
id integer,
Vgas float(4) not null,
Vtemp float(4) not null,
fecha DATETIME not null,
dispositivo_id varchar(20) not null,
primary key (id)
);