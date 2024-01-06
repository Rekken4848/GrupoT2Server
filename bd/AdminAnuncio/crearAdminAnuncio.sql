-- crearAdminAnuncio.sql
create table Admin_Anuncio (
dni_admin varchar(10) not null,
anuncio_id integer not null,
foreign key (dni_admin) references Admin(dni_admin),
foreign key (anuncio_id) references Anuncio(anuncio_id),
primary key (anuncio_id)
);