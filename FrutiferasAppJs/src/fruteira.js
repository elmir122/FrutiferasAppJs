document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formFruteira");
  const lista = document.getElementById("listaFruteiras");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const novaFruteira = {
      id: Date.now(),
      nomePopular: document.getElementById("nomePopular").value,
      nomeCientifico: document.getElementById("nomeCientifico").value,
      producao: document.getElementById("producao").value,
      dataPlantio: document.getElementById("dataPlantio").value
    };

    const fruteiras = JSON.parse(localStorage.getItem("fruteiras")) || [];
    fruteiras.push(novaFruteira);
    localStorage.setItem("fruteiras", JSON.stringify(fruteiras));

    form.reset();
    bootstrap.Modal.getInstance(document.getElementById("modalCadastro")).hide();
    listarFruteiras();
  });

  function listarFruteiras() {
    lista.innerHTML = "";
    const fruteiras = JSON.parse(localStorage.getItem("fruteiras")) || [];
    fruteiras.forEach(f => {
      const idade = calcularIdadeMeses(f.dataPlantio);
      lista.innerHTML += `
        <div class="col-md-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5>${f.nomePopular}</h5>
              <p><strong>Nome científico:</strong> ${f.nomeCientifico}</p>
              <p><strong>Produção média:</strong> ${f.producao} kg</p>
              <p><strong>Data do plantio:</strong> ${f.dataPlantio}</p>
              <p><strong>Idade:</strong> ${idade} meses</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  function calcularIdadeMeses(dataPlantio) {
    const plantio = new Date(dataPlantio);
    const agora = new Date();
    return (agora.getFullYear() - plantio.getFullYear()) * 12 + (agora.getMonth() - plantio.getMonth());
  }

  listarFruteiras();
});
