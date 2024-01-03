--crearMedicionesParaMapa.

--insert into Persona (dni, nombre, apellidos, correo, telefono) values ( 'PruebaMapa', 'Mario', 'Casas', 'mariocasas@gmail.com', '999999999');
--insert into Dispositivo (dispositivo_id, dni_empleado) values ( 'PrueMapaDis', 'PruebaMapa');

--insert into TipoValor (tipo_valor) values ('CO2');
--insert into TipoValor (tipo_valor) values ('CO3');
--insert into TipoValor (tipo_valor) values ('N');
--insert into TipoValor (tipo_valor) values ('C8');
--insert into TipoValor (tipo_valor) values ('CO3');
--insert into TipoValor (tipo_valor) values ('CO3');

insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2024-01-03 16:32:40', '38.990372, -0.157928');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 16.34, 2, '2024-01-03 16:32:40', '38.994947, -0.164142');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 24.34, 3, '2024-01-03 16:32:40', '38.995539, -0.166339');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 22.34, 2, '2024-01-03 16:32:40', '38.995105, -0.166596');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 17.34, 3, '2024-01-03 16:32:40', '38.993677, -0.165361');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 08.34, 4, '2024-01-03 16:32:40', '38.994561, -0.163838');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 32.34, 1, '2024-01-03 16:32:40', '38.994216, -0.162864');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 42.34, 1, '2024-01-03 16:32:40', '38.994357, -0.160923');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 06.34, 2, '2024-01-03 16:32:40', '38.971025, -0.169295');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 15.34, 3, '2024-01-03 16:32:40', '38.969066, -0.170063');


insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 89, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 90, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 91, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 92, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 93, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 94, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 95, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 96, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 97, 'PrueMapaDis');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 98, 'PrueMapaDis');
--insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 11, 'PrueMapaDis');
--insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 12, 'PrueMapaDis');