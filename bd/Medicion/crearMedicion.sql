-- crearMedicion.sql
create table Medicion (
id integer,
valor float(4) not null,
tipo_valor_id integer not null,
fecha DATETIME not null,
lugar POINT(20) not null,
foreign key (tipo_valor_id) references TipoValor(tipo_valor_id),
primary key (id)
);