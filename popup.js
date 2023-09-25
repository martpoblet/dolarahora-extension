const dolarInfoElement = document.getElementById("dolar-info");
const actualizacionElement = document.getElementById("actualizacion");
const botonActualizar = document.getElementById("botonActualizar");

const skeletonDiv = () => {
  dolarInfoElement.innerHTML = "";
  actualizacionElement.innerHTML = "";
  const skeletonTime = document.createElement("div");
  skeletonTime.classList.add("skeletonTimeDiv");
  actualizacionElement.appendChild(skeletonTime);
  for (let i = 0; i < 6; i++) {
    const skeletonElement = document.createElement("div");
    skeletonElement.classList.add("skeletonDiv");
    dolarInfoElement.appendChild(skeletonElement);
  }
};
skeletonDiv();

const getDataDolar = async () => {
  fetch("https://dolarapi.com/v1/dolares")
    .then((response) => response.json())
    .then((data) => {
      const infoDolar = data.filter((item) => item.venta !== "0");
      console.log(infoDolar);
      dolarInfoElement.innerHTML = "";

      infoDolar.forEach((info) => {
        console.log(info);
        const compra = info.compra;
        const venta = info.venta;
        const nombre = info.nombre;
        const fechaActualizacion = new Date(info.fechaActualizacion);
        const opcionesDeFormato = {
          year: "numeric",
          month: "numeric", // Puedes cambiar a 'short' o 'numeric' si prefieres
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
          hour12: false, // 24 horas
          timeZone: "America/Argentina/Buenos_Aires", // Zona horaria de Argentina
        };
        const formatoEsAR = new Intl.DateTimeFormat(
          "es-AR",
          opcionesDeFormato
        ).format(fechaActualizacion);

        /* const variacion = info.casa?.variacion; */

        const infoElement = document.createElement("div");
        infoElement.classList.add("dolarDiv");
        if (nombre.includes("Blue")) {
          infoElement.classList.add("blueDiv");
        }
        infoElement.innerHTML = `
        <h3>${nombre.includes("Liqui") ? "Dolar Liqui" : nombre}</h3>
        <div class="compra">
          <span>Compra:</span>
          ${compra === "No Cotiza" ? compra : "$" + compra}
        </div>
        <div class="venta">
          <span>Venta:</span>
          $${venta}
        </div>
        <div class="positivo variacion">
            <span>${formatoEsAR}</span>
            </div>
        `;
        /*
        Add Variation for next
        ${
          variacion
            ? ` <div class="${
                typeof variacion !== "object"
                  ? variacion.startsWith("-")
                    ? "negativo variacion"
                    : "positivo variacion"
                  : "positivo variacion"
              }">
              <p>Variación:</p><span>${
                typeof variacion !== "object" ? variacion : "-"
              }</span>
            </div>`
            : "" }*/

        dolarInfoElement.appendChild(infoElement);
      });
      actualizacionElement.innerHTML =
        "Actualizado el " + new Date().toLocaleString();
    })
    .catch((error) => {
      console.error("Error al obtener los valores del dólar:", error);
      dolarInfoElement.textContent = "Error al obtener los valores del dólar.";
    });
};

document.addEventListener("DOMContentLoaded", () => {
  skeletonDiv();
  getDataDolar();
});
botonActualizar.addEventListener("click", () => {
  skeletonDiv();
  getDataDolar();
});
