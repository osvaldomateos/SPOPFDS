var app = document.getElementById("app");
var data = null;
var renderedSections = [];

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

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function stringifyValue(value, pretty) {
  if (value === undefined) {
    return "";
  }

  if (value === null) {
    return "null";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return JSON.stringify(value, null, pretty ? 2 : 0);
}

function humanizeKey(key) {
  return String(key || "campo")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, function (letter) {
      return letter.toUpperCase();
    });
}

function buildTextFromObject(record) {
  var keys = Object.keys(record);
  var lines = [];
  var i;

  for (i = 0; i < keys.length; i += 1) {
    lines.push(
      humanizeKey(keys[i]) + ": " + stringifyValue(record[keys[i]], true)
    );
  }

  return lines.join("\n");
}

function getObjectKeys(records) {
  var keys = [];
  var i;
  var j;
  var recordKeys;

  for (i = 0; i < records.length; i += 1) {
    recordKeys = Object.keys(records[i]);

    for (j = 0; j < recordKeys.length; j += 1) {
      if (keys.indexOf(recordKeys[j]) === -1) {
        keys.push(recordKeys[j]);
      }
    }
  }

  return keys;
}

function getMatrixColumnCount(rows) {
  var count = 0;
  var i;

  for (i = 0; i < rows.length; i += 1) {
    if (Array.isArray(rows[i]) && rows[i].length > count) {
      count = rows[i].length;
    }
  }

  return count;
}

function buildTextSection(title, value) {
  var text;

  if (Array.isArray(value)) {
    text = value
      .map(function (item) {
        return stringifyValue(item, true);
      })
      .join("\n");
  } else if (isPlainObject(value)) {
    text = buildTextFromObject(value);
  } else {
    text = stringifyValue(value, true);
  }

  return {
    type: "text",
    title: title,
    text: text || "Sem conteudo."
  };
}

function buildTableSection(title, records) {
  var keys = getObjectKeys(records);
  var headers = [];
  var rows = [];
  var i;
  var j;
  var row;

  for (i = 0; i < keys.length; i += 1) {
    headers.push(humanizeKey(keys[i]));
  }

  for (i = 0; i < records.length; i += 1) {
    row = [];

    for (j = 0; j < keys.length; j += 1) {
      row.push(stringifyValue(records[i][keys[j]], true));
    }

    rows.push(row);
  }

  return {
    type: "table",
    title: title,
    headers: headers,
    rows: rows
  };
}

function buildMatrixSection(title, matrix) {
  var headers = [];
  var rows = [];
  var columnCount = getMatrixColumnCount(matrix);
  var i;
  var j;
  var row;

  for (i = 0; i < columnCount; i += 1) {
    headers.push("Coluna " + (i + 1));
  }

  for (i = 0; i < matrix.length; i += 1) {
    row = [];

    for (j = 0; j < columnCount; j += 1) {
      row.push(stringifyValue(matrix[i][j], true));
    }

    rows.push(row);
  }

  return {
    type: "table",
    title: title,
    headers: headers,
    rows: rows
  };
}

function normalizeArrayData(items) {
  var sections = [];
  var i;

  if (!items.length) {
    return {
      title: "Conteudo JSON",
      description: "O arquivo nao trouxe linhas para exibir.",
      sections: []
    };
  }

  if (
    items.every(function (item) {
      return isPlainObject(item);
    })
  ) {
    sections.push(buildTableSection("Linhas do JSON", items));
  } else if (
    items.every(function (item) {
      return Array.isArray(item);
    })
  ) {
    sections.push(buildMatrixSection("Linhas do JSON", items));
  } else {
    for (i = 0; i < items.length; i += 1) {
      sections.push(buildTextSection("Linha " + (i + 1), items[i]));
    }
  }

  return {
    title: "Conteudo JSON",
    description:
      "Foram carregadas " +
      items.length +
      " linhas dinamicamente, sem depender de quantidade fixa.",
    sections: sections
  };
}

function normalizeObjectData(record) {
  var keys = Object.keys(record);
  var sections = [];
  var i;
  var key;
  var value;

  for (i = 0; i < keys.length; i += 1) {
    key = keys[i];

    if (key === "title" || key === "description" || key === "sections") {
      continue;
    }

    value = record[key];

    if (
      Array.isArray(value) &&
      value.length &&
      value.every(function (item) {
        return isPlainObject(item);
      })
    ) {
      sections.push(buildTableSection(humanizeKey(key), value));
      continue;
    }

    if (
      Array.isArray(value) &&
      value.length &&
      value.every(function (item) {
        return Array.isArray(item);
      })
    ) {
      sections.push(buildMatrixSection(humanizeKey(key), value));
      continue;
    }

    sections.push(buildTextSection(humanizeKey(key), value));
  }

  if (!sections.length) {
    sections.push(buildTextSection("Conteudo", record));
  }

  return {
    title: stringifyValue(record.title, true) || "Conteudo JSON",
    description:
      stringifyValue(record.description, true) ||
      "Todos os campos do arquivo foram lidos dinamicamente.",
    sections: sections
  };
}

function normalizeJsonData(parsedData) {
  if (isPlainObject(parsedData) && Array.isArray(parsedData.sections)) {
    return parsedData;
  }

  if (Array.isArray(parsedData)) {
    return normalizeArrayData(parsedData);
  }

  if (isPlainObject(parsedData)) {
    return normalizeObjectData(parsedData);
  }

  return {
    title: "Conteudo JSON",
    description: "O arquivo foi lido dinamicamente.",
    sections: [buildTextSection("Valor carregado", parsedData)]
  };
}

function parseJsonContent(rawText) {
  var text = String(rawText || "").trim();
  var lines;
  var items;
  var i;
  var line;

  if (!text) {
    return [];
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    lines = text.split(/\r?\n/);
    items = [];

    for (i = 0; i < lines.length; i += 1) {
      line = lines[i].trim();

      if (!line) {
        continue;
      }

      try {
        items.push(JSON.parse(line));
      } catch (lineError) {
        throw new Error(
          "O arquivo JSON nao pode ser interpretado. Verifique a linha " +
            (i + 1) +
            "."
        );
      }
    }

    if (!items.length) {
      throw error;
    }

    return items;
  }
}

function render() {
  var html = "";
  var i;
  var j;
  var k;
  var section;
  var headers;
  var rows;

  renderedSections = Array.isArray(data.sections) ? data.sections : [];

  html += '<section class="card">';
  html += "<h2>" + escapeHtml(data.title || "Conteudo JSON") + "</h2>";

  if (data.description) {
    html += "<p>" + formatText(data.description) + "</p>";
  }

  html += "</section>";

  if (!renderedSections.length) {
    html += '<section class="card">';
    html += "<p>Nenhuma linha foi encontrada no JSON.</p>";
    html += "</section>";
  }

  for (i = 0; i < renderedSections.length; i += 1) {
    section = renderedSections[i];
    html += '<section class="card">';
    html +=
      "<h3>" + escapeHtml(section.title || "Bloco " + (i + 1)) + "</h3>";

    if (section.type === "text") {
      html += "<p>" + formatText(section.text) + "</p>";
    } else if (section.type === "table") {
      headers = Array.isArray(section.headers) ? section.headers : [];
      rows = Array.isArray(section.rows) ? section.rows : [];

      html += "<table><thead><tr>";

      for (j = 0; j < headers.length; j += 1) {
        html += "<th>" + escapeHtml(headers[j]) + "</th>";
      }

      html += "</tr></thead><tbody>";

      for (j = 0; j < rows.length; j += 1) {
        html += "<tr>";

        for (k = 0; k < rows[j].length; k += 1) {
          html += "<td>" + formatText(rows[j][k]) + "</td>";
        }

        html += "</tr>";
      }

      html += "</tbody></table>";
    } else if (section.type === "quiz") {
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
    } else {
      html += "<p>" + formatText(stringifyValue(section, true)) + "</p>";
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
  var response;
  var rawText;

  try {
    response = await fetch("./content/comandos-linux.json");

    if (!response.ok) {
      throw new Error("O arquivo JSON nao pode ser lido.");
    }

    rawText = await response.text();
    data = normalizeJsonData(parseJsonContent(rawText));
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
  section = renderedSections[sectionIndex];

  if (!section || section.type !== "quiz" || !Array.isArray(section.options)) {
    return;
  }

  option = section.options[optionIndex];
  feedback = document.getElementById("feedback-" + sectionIndex);

  if (!option || !feedback) {
    return;
  }

  feedback.className = option.correct ? "feedback correct" : "feedback wrong";
  feedback.innerHTML = formatText(option.feedback);
});

load();
