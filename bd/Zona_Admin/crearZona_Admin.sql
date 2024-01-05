-- crearZona_Admin.sql
create table Zona_Admin (
dni_admin varchar(10) not null,
zona varchar(5) not null,
foreign key (dni_admin) references Admin(dni_admin),
primary key (dni_admin)
);