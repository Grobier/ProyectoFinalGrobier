function Home() {
  return (
    <div className="home-container">
      {/* Ubicación del video: Coloca tu archivo en la carpeta 'public' con el nombre 'video.mp4' */}
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* Contenido centrado sobre el video */}
      <div className="content">
        <h1>TU SALUD, NUESTRA MISIÓN</h1>
        <p>Bienvenido a nuestra tienda en línea. ¡Explora nuestros servicios!</p>
      </div>
    </div>
  );
}

export default Home;
