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
  fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((response) => response.json())
    .then((data) => {
      dolarInfoElement.innerHTML = "";
      const infoDolar = data
        .filter((item) => item.casa.nombre.startsWith("Dolar"))
        .filter((item) => item.casa.venta !== "0");

      infoDolar.forEach((info) => {
        const compra = info.casa.compra;
        const venta = info.casa.venta;
        const nombre = info.casa.nombre;
        const variacion = info.casa?.variacion;

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
            : ""
        }`;

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
