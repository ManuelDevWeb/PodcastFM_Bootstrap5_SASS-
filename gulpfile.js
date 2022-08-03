// Importando gulp
const { src, dest, watch, series } = require("gulp");
// Importando gulp sass
const sass = require("gulp-sass")(require("sass"));
// Importando imagenmin
const imagenmin = require("gulp-imagemin");
// Importando purgeCss y rename
const purgecss = require("gulp-purgecss");
const rename = require("gulp-rename");

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

// Funcion para aligerar la carga de imagenes
function imagenes(done) {
  // Ubicacion de nuestras imagenes
  src("src/img/**/*")
    // Minificamos imagenes
    .pipe(imagenmin({ optimizationLevel: 3 }))
    // Exportarlo o guardarlo en una ubicacion
    .pipe(dest("build/img"));

  done();
}

// Funcion watch (Compila automaticamente)
function dev() {
  // Archivo el cual escuchamos sus cambios constantemente y funcion a ejecutar
  watch("src/scss/**/*.scss", css);

  // A diferencia de la anterior, esta tarea inicia pero no finalzia
}

// Function para preparar proyecto a produccion
function cssbuild(done) {
  // Identificar archivo a reducir size
  src("build/css/app.css")
    // .pipe() para esperar la ejecucion de la funcion anterior y renombramos nombre del archivo
    .pipe(
      rename({
        // Quedaria: app.min.css
        suffix: ".min",
      })
    )
    .pipe(
      purgecss({
        // En este caso solo pasamos un archivo, pero si hubieran mas podriamos hacerlo
        content: ["index.html"],
      })
    )
    // Exportarlo o guardarlo en una ubicacion
    .pipe(dest("build/css"));

  done();
}

// Para ejecutar la tarea abrir cmd y correr: gulp (nombre tarea exportada) -> gulp css
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
// Ejecutar por defecto multiples tareas, para correr ejecutar: gulp
exports.default = series(imagenes, css, dev);
// Ejecutar: gulp build (Preparamos archivo para produccion)
exports.build = series(cssbuild);
