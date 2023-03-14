# Historial de versiones
## 0\.0.5
Cambios importantes:

- Configuración de los logs: 
  - Únicamente se lanzarán logs de [error, warn, debug]
  - Esto se configura fácilmente mediante la clase main
  - Se limitaron los logs de la librería de kafkaJs
  - Se actualizo la versión de typescript para evitar el log del problema con la versión 
- Control de consumidores:
  - El consumidor arrancara mediante una API
  - Se agrego una validación para que no existiera manera de arrancar 2 veces el mismo consumidor y que si esto pasara, lanzar un log de error
  - API que obtiene el registro de los grupos y tópicos activos
- Adaptación a las pruebas de performance:
  - Adaptación del controlador para enviar mediante un enum, los segundos como timeout para la recepción de los mensajes
  - Se agrego regla para la lectura del performance: Lanzara un log de la cantidad de mensajes procesados por segundo.
