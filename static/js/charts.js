document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ charts.js cargado correctamente");

  // Vincular clics de cada opción
  const opciones = document.querySelectorAll(".estado");

  if (!opciones.length) {
    console.warn("⚠️ No se encontraron elementos con clase .estado");
  }

  opciones.forEach(el => {
    console.log("🔗 Vinculando:", el.dataset.estado);
    el.addEventListener("click", e => {
      e.preventDefault();
      console.log("🟢 Click detectado en:", el.dataset.estado);
      cargarDatos(el.dataset.estado);
    });
  });
});

let chartA, chartG;

async function cargarDatos(estado) {
  console.log("📡 Solicitando datos de:", estado);
  const res = await fetch(`/datos/${estado}`);
  const data = await res.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  console.log("📊 Datos recibidos:", data);

  const labels = data["Tiempo"] || Array.from({ length: data["X"].length }, (_, i) => i + 1);

  const accData = {
    labels: labels,
    datasets: [
      { label: "X", data: data["Ax"], borderColor: "red" },
      { label: "Y", data: data["Ay"], borderColor: "green" },
      { label: "Z", data: data["Az"], borderColor: "blue" }
    ]
  };

  const gyrData = {
    labels: labels,
    datasets: [
      { label: "X", data: data["Gx"], borderColor: "orange" },
      { label: "Y", data: data["Gy"], borderColor: "purple" },
      { label: "Z", data: data["Gz"], borderColor: "brown" }
    ]
  };

  if (chartA) chartA.destroy();
  if (chartG) chartG.destroy();

  chartA = new Chart(document.getElementById("chartAcelerometro"), {
    type: "line",
    data: accData
  });

  chartG = new Chart(document.getElementById("chartGiroscopio"), {
    type: "line",
    data: gyrData
  });
}
