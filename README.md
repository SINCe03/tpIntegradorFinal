# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## TP INTEGRADOR FINAL - DESARROLLO WEB
## Funciones de services/publicaciones.js

### obtenerPublicaciones()
Trae todas las publicaciones de la tabla, ordenadas de la mas reciente a la mas vieja.
Se dispara al cargar la pagina (dentro del useEffect de Publicaciones.jsx), y de nuevo
cada vez que se crea, edita o borra una publicacion, para que la lista en pantalla
siempre coincida con lo que hay en la base.

### crearPublicacion({ titulo, contenido })
Inserta una fila nueva en la tabla con el titulo y contenido recibidos.
Se dispara al enviar el formulario cuando no hay ninguna publicacion en modo edicion
(el boton dice "Publicar").

### actualizarPublicacion(id, cambios)
Modifica la fila que tiene ese id, aplicando los cambios recibidos.
Se dispara al enviar el formulario cuando si hay una publicacion en modo edicion
(el boton dice "Guardar cambios"), es decir, despues de apretar "Editar" en alguna
publicacion de la lista.

### eliminarPublicacion(id)
Borra la fila con ese id de la tabla.
Se dispara al apretar el boton "Borrar" de una publicacion, despues de confirmar
con el cartel de window.confirm.