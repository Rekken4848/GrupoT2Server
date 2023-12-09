-- crearDispositivoAnuncio.sql
create table Dispositivo_Anuncio (
dispositivo_id varchar(10) not null,
anuncio_id integer not null,
foreign key (dispositivo_id) references Dispositivo(dispositivo_id),
foreign key (anuncio_id) references Anuncio(anuncio_id),
primary key (anuncio_id)
);