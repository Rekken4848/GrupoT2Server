-- insertarPersona.sql
insert into Persona (dni, nombre, apellidos, correo, telefono) values ( 'Y2345678A', 'Diego', 'Anaconda', 'algo@gmail.com', '777777777');
insert into Persona (dni, nombre, apellidos, correo, telefono) values ( '44444444C', 'Hugo', 'Gusanito', 'cosas@gmail.com', '888888888');
-- insertarAdmin.sql
insert into Admin (dni_admin, contrasenya) values ( 'Y2345678A', 'contrasenya');
-- insertarZona_Admin.sql
insert into Zona_Admin (dni_admin, zona) values ( 'Y2345678A', '03670');
-- insertarDireccion.sql
insert into Direccion (dni, codigo_postal, ccaa, provincia, calle) values ( '44444444C', '03670', 'Comunidad Valenciana', 'Valencia', 'Calle De Valencia');
-- insertarDispositivo.sql
insert into Dispositivo (dispositivo_id, dni_empleado) values ( 'HFFFFFFFFF', '44444444C');
-- insertarTipoValor.sql
insert into TipoValor (tipo_valor) values ('Temperatura');
-- insertarMedicion.sql
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 25, 2, '2023-10-16 16:32:41', '11.1234,21.5678');
-- insertarMedicionDispositivo.sql
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 2, 'HFFFFFFFFF');
-- insertarAnuncio.sql
insert into Anuncio (contenido, titulo, problemas, estado) values ('Se me ha mojado el sensor.', 'Se mojó el sensor', 'Fallo de conexion', 'No leido');
-- insertarDispositivoAnuncio.sql
insert into Dispositivo_Anuncio (dispositivo_id, anuncio_id) values ('HFFFFFFFFF', 2);
-- insertarAdminAnuncio.sql
insert into Admin_Anuncio (dni_admin, anuncio_id) values ('Y2345678A', 2);