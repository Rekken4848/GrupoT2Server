--mediciones de ozono
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 80.4, 1, '2024-01-12 02:10:42', '38.990372, -0.157928');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 120.3, 1, '2024-01-12 02:09:43', '38.994947, -0.164142');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 200.9, 1, '2024-01-12 02:11:43', '38.969066, -0.170063');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 227.2, 1, '2024-01-12 02:04:43', '38.971025, -0.169295');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 284.7, 1, '2024-01-12 02:29:43', '38.994357, -0.160923');--alto

--mediciones de co
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 1.8, 4, '2024-01-12 02:10:31', '38.994216, -0.162864');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 3.1, 4, '2024-01-12 02:10:37', '38.994561, -0.163838');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 6.2, 4, '2024-01-12 02:10:21', '38.993677, -0.165361');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 8.7, 4, '2024-01-12 02:10:12', '38.995105, -0.166596');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 12.9, 4, '2024-01-12 02:51:43', '38.995539, -0.166339');--alto

--mediciones de no2
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 60.1, 2, '2024-01-12 02:02:43', '38.994947, -0.164142');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 27.4, 2, '2024-01-12 02:04:43', '38.990372, -0.157928');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 129.3, 2, '2024-01-12 02:40:43', '38.969066, -0.170063');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 178.7, 2, '2024-01-12 02:10:18', '38.971025, -0.169295');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 243.6, 2, '2024-01-12 02:10:36', '38.994357, -0.160923');--alto

--mediciones de so2
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 92.4, 3, '2024-01-12 02:10:41', '38.994216, -0.162864');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 76.3, 3, '2024-01-12 02:58:43', '38.994561, -0.163838');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 173.6, 3, '2024-01-12 02:10:33', '38.993677, -0.165361');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 249.1, 3, '2024-01-12 02:50:43', '38.995105, -0.166596');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 384.5, 3, '2024-01-12 02:10:15', '38.995539, -0.166339');--alto

--mediciones de benceno
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 0.3, 5, '2024-01-12 02:10:43', '38.994947, -0.164142');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 1.4, 5, '2024-01-12 02:10:43', '38.990372, -0.157928');--bajo
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 2.3, 5, '2024-01-12 02:10:43', '38.969066, -0.170063');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 3.7, 5, '2024-01-12 02:10:43', '38.971025, -0.169295');--medio
insert into Medicion (valor, tipo_valor_id, fecha, lugar) values ( 7.2, 5, '2024-01-12 02:10:43', '38.994357, -0.160923');--alto

--relacionamos las mediciones con el dispositivo
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 144, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 145, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 146, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 147, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 148, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 149, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 150, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 151, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 152, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 153, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 154, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 155, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 156, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 157, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 158, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 159, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 160, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 161, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 162, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 163, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 164, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 165, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 166, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 167, 'GTI-3A');
insert into Medicion_Dispositivo (medicion_id, dispositivo_id) values ( 168, 'GTI-3A');