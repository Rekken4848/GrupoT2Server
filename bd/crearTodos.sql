-- crearPersona.sql
create table Persona (
dni varchar(10) not null,
nombre varchar(15) not null,
apellidos varchar(50) not null,
correo varchar not null,
telefono varchar(20) not null,
primary key (dni)
);
-- crearAdmin.sql
create table Admin (
dni_admin varchar(10) not null,
contrasenya varchar(50) not null,
foreign key (dni_admin) references Persona(dni),
primary key (dni_admin)
);
-- crearZona_Admin.sql
create table Zona_Admin (
dni_admin varchar(10) not null,
zona varchar(5) not null,
foreign key (dni_admin) references Admin(dni_admin),
primary key (dni_admin)
);
-- crearDireccion.sql
create table Direccion (
dni varchar(10) not null,
codigo_postal varchar(5) not null,
ccaa varchar(30) not null,
provincia varchar(30) not null,
calle varchar(200) not null,
--foreign key (codigo_postal) references Zona_Admin(zona),
foreign key (dni) references Persona(dni),
primary key (dni)
);
create table Dispositivo (
dispositivo_id varchar(20) not null,
dni_empleado varchar(10) not null,
foreign key (dni_empleado) references Persona(dni),
primary key (dispositivo_id)
);
-- crearTipoValor.sql
create table TipoValor (
tipo_valor_id integer,
tipo_valor varchar not null,
primary key (tipo_valor_id)
);
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
-- crearMedicionDispositivo.sql
create table Medicion_Dispositivo (
medicion_id integer not null,
dispositivo_id varchar(10) not null,
foreign key (medicion_id) references Medicion(id),
foreign key (dispositivo_id) references Dispositivo(dispositivo_id),
primary key (medicion_id)
);
-- crearAnuncio.sql
create table Anuncio (
anuncio_id integer,
contenido varchar(1000) not null,
titulo varchar(50) not null,
primary key (anuncio_id)
);
-- crearDispositivoAnuncio.sql
create table Dispositivo_Anuncio (
dispositivo_id varchar(10) not null,
anuncio_id integer not null,
foreign key (dispositivo_id) references Dispositivo(dispositivo_id),
foreign key (anuncio_id) references Anuncio(anuncio_id),
primary key (dispositivo_id)
);
-- crearAdminAnuncio.sql
create table Admin_Anuncio (
dni_admin varchar(10) not null,
anuncio_id integer not null,
foreign key (dni_admin) references Admin(dni_admin),
foreign key (anuncio_id) references Anuncio(anuncio_id),
primary key (anuncio_id)
);