document.addEventListener("DOMContentLoaded", function () {
  const moduleList = document.getElementById("moduleList");
  const audioList = document.getElementById("audioList");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioTitle = document.getElementById("audioTitle");

  // Lista de módulos e seus áudios correspondentes
  const modules = {
    Facil: ["audio_modulo1.mp3", "trompete.mp3", "violao.mp3"],
    Intermediario: ["audio_modulo2.mp3", "trombone.mp3"],
    Dificil: ["audio_modulo3.mp3", "pandeiro.mp3"],
  };

  // Função para exibir os áudios de um módulo
  function showAudios(module) {
    audioList.innerHTML = "";
    modules[module].forEach((audio) => {
      const listItem = document.createElement("li");
      const audioLink = document.createElement("a");
      audioLink.href = `audios/${module}/${audio}`;
      audioLink.textContent = audio;
      audioLink.addEventListener("click", (e) => {
        e.preventDefault();
        audioPlayer.src = e.target.href;
        audioPlayer.play();
        audioTitle.textContent = audio;
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
      showAudios(selectedModule);
    }
  });
});
