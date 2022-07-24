// Importando gulp
const { src, dest, watch } = require("gulp");
// Importando gulp sass
const sass = require("gulp-sass")(require("sass"));

// Funcion que compila codigo de SASS
function css(done) {
  // Identificar archivo principal (hoja de estilos)
  src("src/scss/app.scss")
    // .pipe() para esperar la ejecucion de la funcion anterior y compilamos SASS
    .pipe(sass())
    // Exportarlo o guardarlo en una ubicacion
    .pipe(dest("build/css"));

  done();
}

// Funcion watch (Compila automaticamente)
function dev() {
  // Archivo el cual escuchamos sus cambios constantemente y funcion a ejecutar
  watch("src/scss/**/*.scss", css);

  // A diferencia de la anterior, esta tarea inicia pero no finalzia
}

// Para ejecutar la tarea abrir cmd y correr: gulp (nombre tarea exportada) -> gulp css
exports.css = css;
exports.dev = dev;
