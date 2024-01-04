

--mediciones de temperatura
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 18.34, 5, '2023-12-15 02:10:40', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 19.93, 5, '2023-12-15 02:10:41', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 21.03, 5, '2023-12-15 02:10:42', '10.1234,20.5678');

--mediciones de ozono
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-12-15 02:10:43', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-12-15 02:10:44', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 1, '2023-12-15 02:10:45', '10.1234,20.5678');

--mediciones de co2
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 4, '2023-12-15 02:10:46', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 4, '2023-12-15 02:10:47', '10.1234,20.5678');
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.34, 4, '2023-12-15 02:10:48', '10.1234,20.5678');

--relacionamos las mediciones con el dispositivo
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 50, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 51, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 52, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 53, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 54, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 55, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 56, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 57, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 58, 'GTI-3A');