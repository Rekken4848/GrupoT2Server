-- insertarPersona.sql
insert into Persona (dni, nombre, apellidos, correo, telefono) values ( '12345678A', 'Juan', 'Mata', 'juanmata@gmail.com', '666666666');
insert into Persona (dni, nombre, apellidos, correo, telefono) values ( '44444444B', 'Mario', 'Casas', 'mariocasas@gmail.com', '999999999');
-- insertarAdmin.sql
insert into Admin (dni_admin, contrasenya) values ( '12345678A', '123456789');
-- insertarZona_Admin.sql
insert into Zona_Admin (dni_admin, zona) values ( '12345678A', '03601');
-- insertarDireccion.sql
insert into Direccion (dni, codigo_postal, ccaa, provincia, calle) values ( '44444444B', '03601', 'Madrid', 'Madrid', 'Calle De Madrid');
-- insertarDispositivo.sql
insert into Dispositivo (dispositivo_id, dni_empleado) values ( 'FFFFFFFFFF', '44444444B');
-- insertarTipoValor.sql
insert into TipoValor (tipo_valor) values ('CO3');
-- insertarMedicion.sql
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-10-15 16:32:40', '10.1234,20.5678');
-- insertarMedicionDispositivo.sql
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 1, 'FFFFFFFFFF');
-- insertarAnuncio.sql
insert into Anuncio (contenido, titulo, problemas, estado) values ('Se me ha roto muy fuerte el sensor.', 'Se rompió el sensor', 'Fallo de conexion', 'No leido');
-- insertarDispositivoAnuncio.sql
insert into Dispositivo_Anuncio (dispositivo_id, anuncio_id) values ('FFFFFFFFFF', 1);
-- insertarAdminAnuncio.sql
insert into Admin_Anuncio (dni_admin, anuncio_id) values ('12345678A', 1);