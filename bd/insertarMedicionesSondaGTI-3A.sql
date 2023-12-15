
insert into TipoValor (tipo_valor) values ('Temperatura');

--mediciones de temperatura
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 18.34, 5, '2023-12-15 10:10:40', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 19.93, 5, '2023-12-15 10:10:41', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 21.03, 5, '2023-12-15 10:10:42', '10.1234,20.5678');

--mediciones de ozono
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-12-15 10:10:43', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-12-15 10:10:44', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-12-15 10:10:45', '10.1234,20.5678');

--mediciones de co2
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 4, '2023-12-15 10:10:46', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 4, '2023-12-15 10:10:47', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 4, '2023-12-15 10:10:48', '10.1234,20.5678');

--relacionamos las mediciones con el dispositivo
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 41, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 42, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 43, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 44, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 45, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 46, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 47, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 48, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 49, 'GTI-3A');