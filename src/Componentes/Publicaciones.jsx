// src/componentes/Publicaciones.jsx
import { useState, useEffect } from "react";
import {
    obtenerPublicaciones,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
} from "../Services/publicaciones";
import styles from "./Publicaciones.module.css";

export default function Publicaciones() {
    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [publicacionEditando, setPublicacionEditando] = useState(null);

    async function cargarLista() {
    setCargando(true);
    const { data, error } = await obtenerPublicaciones();
    if (!error) setLista(data);
    setCargando(false);
}

    useEffect(() => {
    cargarLista();
    }, []);

    function resetFormulario() {
    setTitulo("");
    setContenido("");
    setPublicacionEditando(null);
}

    function handleIniciarEdicion(publicacion) {
    setPublicacionEditando(publicacion.id);
    setTitulo(publicacion.titulo);
    setContenido(publicacion.contenido);
}

    async function handleEnviar(evento) {
    evento.preventDefault();

    const datos = { titulo, contenido };

    const { error } = publicacionEditando
        ? await actualizarPublicacion(publicacionEditando, datos)
        : await crearPublicacion(datos);

    if (error) return alert(error.message);

    await cargarLista();
    resetFormulario();
}

    async function handleBorrar(id) {
    const confirmado = window.confirm("Seguro que queres borrar esta publicacion?");
    if (!confirmado) return;

    const { error } = await eliminarPublicacion(id);
    if (error) return alert(error.message);

    setLista((prev) => prev.filter((publicacion) => publicacion.id !== id));
}

    if (cargando) return <p>Cargando publicaciones...</p>;

    return (
    <div className={styles.contenedor}>
        <h1>Publicaciones</h1>

        <form className={styles.formulario} onSubmit={handleEnviar}>
        <input
            type="text"
            placeholder="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
        />
        <textarea
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
        />
            <div className={styles.acciones}>
            <button type="submit" className={`${styles.boton} ${styles.botonPrimario}`}>
            {publicacionEditando ? "Guardar cambios" : "Publicar"}
            </button>
            {publicacionEditando && (
            <button type="button" className={`${styles.boton} ${styles.botonSecundario}`} onClick={resetFormulario}>
                Cancelar
            </button>
        )}
        </div>
        
        </form>

        {lista.length === 0 ? (
        <p>Todavia no hay publicaciones.</p>
    ) : (
        lista.map((publicacion) => (
        <article key={publicacion.id} className={styles.publicacion}>
            <h3>{publicacion.titulo}</h3>
            <p>{publicacion.contenido}</p>
            <small className={styles.fecha}>{new Date(publicacion.creado_en).toLocaleString()}</small>
            <div className={styles.accionesFila}>
            <button className={`${styles.boton} ${styles.botonSecundario}`} onClick={() => handleIniciarEdicion(publicacion)}>Editar</button>
            <button className={`${styles.boton} ${styles.botonPeligro}`} onClick={() => handleBorrar(publicacion.id)}>Borrar</button>
            </div>
        </article>
        ))
    )}
    </div>
);
}