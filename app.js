var app = document.getElementById("app");
var data = null;

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatText(text) {
  var parts = String(text || "").split("`");
  var html = "";
  var i;

  for (i = 0; i < parts.length; i += 1) {
    if (i % 2 === 1) {
      html += "<code>" + escapeHtml(parts[i]) + "</code>";
    } else {
      html += escapeHtml(parts[i]).replace(/\n/g, "<br>");
    }
  }

  return html;
}

function render() {
  var html = "";
  var i;
  var j;
  var k;
  var section;

  html += '<section class="card">';
  html += "<h2>" + escapeHtml(data.title) + "</h2>";
  html += "<p>" + formatText(data.description) + "</p>";
  html += "</section>";

  for (i = 0; i < data.sections.length; i += 1) {
    section = data.sections[i];
    html += '<section class="card">';
    html += "<h3>" + escapeHtml(section.title) + "</h3>";

    if (section.type === "text") {
      html += "<p>" + formatText(section.text) + "</p>";
    }

    if (section.type === "table") {
      html += "<table><thead><tr>";
      for (j = 0; j < section.headers.length; j += 1) {
        html += "<th>" + escapeHtml(section.headers[j]) + "</th>";
      }
      html += "</tr></thead><tbody>";

      for (j = 0; j < section.rows.length; j += 1) {
        html += "<tr>";
        for (k = 0; k < section.rows[j].length; k += 1) {
          html += "<td>" + formatText(section.rows[j][k]) + "</td>";
        }
        html += "</tr>";
      }

      html += "</tbody></table>";
    }

    if (section.type === "quiz") {
      html += "<p>" + formatText(section.question) + "</p>";
      for (j = 0; j < section.options.length; j += 1) {
        html +=
          '<button class="quiz-option" data-section="' +
          i +
          '" data-option="' +
          j +
          '">' +
          escapeHtml(section.options[j].text) +
          "</button>";
      }
      html += '<p class="feedback" id="feedback-' + i + '"></p>';
    }

    html += "</section>";
  }

  app.innerHTML = html;
}

function showError(message) {
  app.innerHTML =
    '<section class="card error">' +
    "<h2>Erro ao carregar o projeto</h2>" +
    "<p>" + escapeHtml(message) + "</p>" +
    "<p>Abra esta pasta por GitHub Pages ou por um servidor local simples.</p>" +
    "</section>";
}

async function load() {
  try {
    var response = await fetch("./content/comandos-linux.json");

    if (!response.ok) {
      throw new Error("O arquivo JSON não pôde ser lido.");
    }

    data = await response.json();
    render();
  } catch (error) {
    showError(error.message || "Erro desconhecido.");
  }
}

document.addEventListener("click", function (event) {
  var button = event.target.closest("[data-section]");
  var sectionIndex;
  var optionIndex;
  var section;
  var option;
  var feedback;

  if (!button || !data) {
    return;
  }

  sectionIndex = Number(button.getAttribute("data-section"));
  optionIndex = Number(button.getAttribute("data-option"));
  section = data.sections[sectionIndex];
  option = section.options[optionIndex];
  feedback = document.getElementById("feedback-" + sectionIndex);

  if (!feedback) {
    return;
  }

  feedback.className = option.correct ? "feedback correct" : "feedback wrong";
  feedback.innerHTML = formatText(option.feedback);
});

load();
