-- crearDireccion.sql
create table Direccion (
dni varchar(10) not null,
codigo_postal varchar(5) not null,
ccaa varchar(30) not null,
provincia varchar(30) not null,
calle varchar(200) not null,
foreign key (codigo_postal) references Zona_Admin(zona),
foreign key (dni) references Persona(dni),
primary key (dni)
);