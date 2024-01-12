delete from Anuncio;
delete from Dispositivo_Anuncio;

insert into Anuncio (contenido, titulo, problemas, estado) values ('La app no detecta mi dispositivo', 'App no detecta dispositivo', 'Fallo de reconocimiento', 'No leido');
insert into Anuncio (contenido, titulo, problemas, estado) values ('La aplicacion muestra valores imposibles, no se si es la aplicacion o la sonda', 'La app muestra valores imposibles', 'Valores incorrectos', 'Leido');
insert into Anuncio (contenido, titulo, problemas, estado) values ('La carcasa se ha quemado porque la bateria estaba dando problemas', 'Bateria defectuosa', 'Bateria defectuosa', 'Completado');

insert into Dispositivo_Anuncio (dispositivo_id, anuncio_id) values ('GTI-3A', 1);
insert into Dispositivo_Anuncio (dispositivo_id, anuncio_id) values ('GTI-3A', 2);
insert into Dispositivo_Anuncio (dispositivo_id, anuncio_id) values ('GTI-3A', 3);