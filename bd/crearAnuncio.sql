-- crearAnuncio.sql
create table Anuncio (
anuncio_id integer,
contenido varchar(1000) not null,
titulo varchar(50) not null,
primary key (anuncio_id)
);