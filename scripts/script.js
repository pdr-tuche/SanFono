import { apiUrl } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  const moduleList = document.getElementById("moduleList");
  const audioList = document.getElementById("audioList");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioTitle = document.getElementById("audioTitle");

  // Objeto vazio para armazenar os módulos e seus áudios
  const modules = {};

  // Função para fazer uma solicitação HTTP e preencher o objeto modules
  async function fetchAudiosAndPopulateModules(module) {
    try {
      const response = await fetch(`${apiUrl}/audios/${module.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Não foi possível obter os áudios.");
      }
      const data = await response.json();
      modules[module] = data;
    } catch (error) {
      console.error("Erro ao obter os áudios:", error);
    }
  }

  // Função para exibir os áudios de um módulo
  function showAudios(module) {
    audioList.innerHTML = "";
    modules[module].forEach((audio) => {
      const listItem = document.createElement("li");
      const audioLink = document.createElement("a");
      audioLink.href = `${apiUrl}/audio/${audio.filename}`;
      audioLink.textContent = audio.originalname;
      audioLink.addEventListener("click", (e) => {
        e.preventDefault();
        audioPlayer.src = e.target.href;
        audioPlayer.play();
        audioTitle.textContent = audio.originalname;
      });
      listItem.appendChild(audioLink);
      audioList.appendChild(listItem);
    });
  }

  // Adicione um evento de clique aos links dos módulos
  moduleList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const links = moduleList.querySelectorAll("a");
      links.forEach((link) => {
        link.style.backgroundColor = "";
      });

      //definindo a mudanca de cor
      e.target.style.backgroundColor = "#333";

      const selectedModule = e.target.getAttribute("data-module");
      if (!modules[selectedModule]) {
        fetchAudiosAndPopulateModules(selectedModule).then(() =>
          showAudios(selectedModule)
        );
      } else {
        showAudios(selectedModule);
      }
    }
  });
});
