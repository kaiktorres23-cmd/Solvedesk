window.SolveDeskExcel = (() => {
  const textEncoder = new TextEncoder();
  const STYLE = {
    body: 0,
    title: 1,
    subtitle: 2,
    section: 3,
    header: 4,
    banded: 5,
    ok: 6,
    warn: 7,
    danger: 8,
    info: 9,
    neutral: 10,
    strong: 11,
    centered: 12
  };

  function escapeXml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function columnName(index) {
    let name = "";
    let current = index;
    while (current > 0) {
      const mod = (current - 1) % 26;
      name = String.fromCharCode(65 + mod) + name;
      current = Math.floor((current - mod) / 26);
    }
    return name;
  }

  function normalizeCell(cell, fallbackStyle = STYLE.body) {
    if (typeof cell === "object" && cell !== null && "value" in cell) {
      return { value: cell.value, style: cell.style ?? fallbackStyle };
    }
    return { value: cell, style: fallbackStyle };
  }

  function cellXml(cell, rowIndex, colIndex) {
    const normalized = normalizeCell(cell);
    if (normalized.value === null || normalized.value === undefined || normalized.value === "") return "";
    const ref = `${columnName(colIndex)}${rowIndex}`;
    if (typeof normalized.value === "number" && Number.isFinite(normalized.value)) {
      return `<c r="${ref}" s="${normalized.style}"><v>${normalized.value}</v></c>`;
    }
    return `<c r="${ref}" s="${normalized.style}" t="inlineStr"><is><t>${escapeXml(normalized.value)}</t></is></c>`;
  }

  function styled(values, style) {
    return values.map((value) => ({ value, style }));
  }

  function blank(columns = 1) {
    return Array.from({ length: columns }, () => ({ value: "", style: STYLE.body }));
  }

  function sheetXml({ rows, widths = [], freezeRow = 5, autoFilterRow = 5, merges = [] }) {
    const maxCols = Math.max(...rows.map((row) => row.length), widths.length, 1);
    const maxRows = Math.max(rows.length, autoFilterRow || rows.length);
    const dimension = `A1:${columnName(maxCols)}${maxRows}`;
    const cols = widths.length
      ? `<cols>${widths.map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join("")}</cols>`
      : "";
    const pane = freezeRow
      ? `<sheetViews><sheetView workbookViewId="0"><pane ySplit="${freezeRow - 1}" topLeftCell="A${freezeRow}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`
      : `<sheetViews><sheetView workbookViewId="0"/></sheetViews>`;
    const sheetData = rows.map((row, rowIndex) => {
      const excelRow = rowIndex + 1;
      const cells = row.map((cell, colIndex) => cellXml(cell, excelRow, colIndex + 1)).join("");
      return `<row r="${excelRow}">${cells}</row>`;
    }).join("");
    const autoFilter = autoFilterRow && rows[autoFilterRow - 1]
      ? `<autoFilter ref="A${autoFilterRow}:${columnName(maxCols)}${maxRows}"/>`
      : "";
    const mergeCells = merges.length
      ? `<mergeCells count="${merges.length}">${merges.map((ref) => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>`
      : "";

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="${dimension}"/>
  ${pane}
  <sheetFormatPr defaultRowHeight="18"/>
  ${cols}
  <sheetData>${sheetData}</sheetData>
  ${autoFilter}
  ${mergeCells}
  <pageMargins left="0.5" right="0.5" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`;
  }

  function stylesXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="5">
    <font><sz val="11"/><color rgb="FF1F2937"/><name val="Aptos"/></font>
    <font><b/><sz val="18"/><color rgb="FFFFFFFF"/><name val="Aptos Display"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
    <font><b/><sz val="11"/><color rgb="FF0F172A"/><name val="Aptos"/></font>
    <font><i/><sz val="10"/><color rgb="FF64748B"/><name val="Aptos"/></font>
  </fonts>
  <fills count="11">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F172A"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F766E"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFCCFBF1"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF8FAFC"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFEF3C7"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFEE2E2"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFDBEAFE"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE2E8F0"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFE2E8F0"/></left><right style="thin"><color rgb="FFE2E8F0"/></right><top style="thin"><color rgb="FFE2E8F0"/></top><bottom style="thin"><color rgb="FFE2E8F0"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="13">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="5" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="6" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="7" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="8" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="9" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="10" borderId="1" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
  <dxfs count="0"/>
  <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>
</styleSheet>`;
  }

  function statusStyle(status, urgency) {
    if (urgency === "Crítica" || ["Crítico", "Reaberto", "Com defeito", "Aguardando peça"].includes(status)) return STYLE.danger;
    if (["Resolvido", "Validado", "Arquivado", "Disponível", "Em estoque"].includes(status)) return STYLE.ok;
    if (["Aguardando compra", "Aguardando cliente", "Aguardando setor interno", "Emprestado", "Reservado"].includes(status)) return STYLE.warn;
    if (["Aberto", "Em análise", "Em teste", "Em manutenção", "Em uso"].includes(status)) return STYLE.info;
    if (status === "Descartado") return STYLE.neutral;
    return STYLE.centered;
  }

  function riskFlag(problem) {
    return ["Alta", "Crítica"].includes(problem.urgency) || problem.canRecur || ["Aberto", "Reaberto"].includes(problem.status) ? "Sim" : "Não";
  }

  function safeList(values) {
    return Array.isArray(values) ? values.filter(Boolean).join(" | ") : (values || "");
  }

  function summaryRows(metrics) {
    const resolvedRate = metrics.totalProblems ? `${metrics.productivity}%` : "0%";
    return [
      [{ value: "SolveDesk Pro - Modelo de acompanhamento", style: STYLE.title }],
      [{ value: `Gerado em ${new Date().toLocaleString("pt-BR")} | Tracker de problemas, soluções e recursos de TI`, style: STYLE.subtitle }],
      blank(3),
      styled(["Indicador", "Valor", "Leitura"], STYLE.header),
      ["Problemas registrados", metrics.totalProblems, "Base operacional"],
      ["Soluções documentadas", metrics.totalSolutions, "Artigos pesquisáveis"],
      ["Resolvidos ou validados", metrics.resolvedProblems, resolvedRate],
      ["Pendentes", metrics.pendingProblems, "Ainda em fluxo"],
      ["Urgentes", metrics.urgentProblems, "Alta ou crítica"],
      ["Tempo médio de resolução", `${metrics.averageTime} min`, "Média dos registros"],
      ["Categoria mais recorrente", metrics.topCategory || "Sem dados", "Prioridade de prevenção"],
      ["Cliente/setor com mais ocorrências", metrics.topClient || "Sem dados", "Ponto de atenção"],
      ["Recursos cadastrados", metrics.totalAssets, "Inventário atual"],
      ["Recursos em uso", metrics.assetsInUse, "Ativos no ambiente"],
      ["Itens disponíveis", metrics.assetsAvailable, "Estoque utilizável"],
      ["Itens com atenção", metrics.assetsAttention, "Manutenção, defeito ou compra"],
      blank(3),
      [{ value: "Como usar", style: STYLE.section }, { value: "", style: STYLE.section }, { value: "", style: STYLE.section }],
      ["1", "Problemas e Soluções", "Use como trilha principal: risco, status, prioridade, descrição e solução aplicada."],
      ["2", "Recursos de TI", "Use para patrimônio, responsável, quantidade, defeito, manutenção e disponibilidade."],
      ["3", "Indicadores", "Use para acompanhar evolução por período e priorizar melhorias."]
    ];
  }

  function problemRows(problems) {
    const rows = [
      [{ value: "SolveDesk Pro - Problemas e Soluções", style: STYLE.title }],
      [{ value: "Formato inspirado em tracker: risco, status, prioridade, prazo/data, tarefa, descrição e responsável.", style: STYLE.subtitle }],
      blank(12),
      styled(["Em risco", "Status", "Prioridade", "Prazo/Data", "Tarefa", "Descrição", "Atribuído a", "Cliente/Setor", "Categoria", "Solução", "Tempo", "Observações"], STYLE.header)
    ];

    if (!problems.length) {
      rows.push(styled(["Não", "Sem registros", "", "", "Nenhum problema exportado", "Use os filtros do sistema para montar o relatório.", "", "", "", "", "", ""], STYLE.banded));
      return rows;
    }

    problems.forEach((problem, index) => {
      const baseStyle = index % 2 ? STYLE.banded : STYLE.body;
      rows.push([
        { value: riskFlag(problem), style: riskFlag(problem) === "Sim" ? STYLE.danger : STYLE.ok },
        { value: problem.status, style: statusStyle(problem.status, problem.urgency) },
        { value: problem.urgency, style: problem.urgency === "Crítica" ? STYLE.danger : statusStyle(problem.status, problem.urgency) },
        { value: problem.occurredAt || problem.month || "", style: STYLE.centered },
        { value: problem.title, style: STYLE.strong },
        { value: problem.description, style: baseStyle },
        { value: problem.owner || "Sem responsável", style: baseStyle },
        { value: `${problem.client || "Sem cliente"} / ${problem.sector || "Sem setor"}`, style: baseStyle },
        { value: problem.category, style: baseStyle },
        { value: problem.solution || "Pendente", style: baseStyle },
        { value: `${problem.timeSpent || 0} min`, style: STYLE.centered },
        { value: problem.notes || safeList(problem.tags), style: baseStyle }
      ]);
    });
    return rows;
  }

  function assetRisk(asset) {
    const lowStock = Number(asset.available || 0) < Number(asset.minStock || 0);
    return lowStock || Number(asset.defective || 0) > 0 || ["Com defeito", "Em manutenção", "Aguardando peça"].includes(asset.status) || asset.condition === "Crítico";
  }

  function assetRows(assets) {
    const rows = [
      [{ value: "SolveDesk Pro - Recursos de TI", style: STYLE.title }],
      [{ value: "Inventário com patrimônio, responsável, disponibilidade, defeito e estado operacional.", style: STYLE.subtitle }],
      blank(12),
      styled(["Em risco", "Status", "Tipo", "Patrimônio", "Recurso", "Setor", "Responsável", "Estado", "Qtd", "Disponível", "Defeito", "Observações"], STYLE.header)
    ];

    if (!assets.length) {
      rows.push(styled(["Não", "Sem registros", "", "", "Nenhum recurso exportado", "", "", "", "", "", "", ""], STYLE.banded));
      return rows;
    }

    assets.forEach((asset, index) => {
      const baseStyle = index % 2 ? STYLE.banded : STYLE.body;
      const risky = assetRisk(asset);
      rows.push([
        { value: risky ? "Sim" : "Não", style: risky ? STYLE.danger : STYLE.ok },
        { value: asset.status, style: statusStyle(asset.status, asset.condition) },
        { value: asset.type, style: baseStyle },
        { value: asset.code, style: STYLE.centered },
        { value: `${asset.name}${asset.model ? ` - ${asset.model}` : ""}`, style: STYLE.strong },
        { value: asset.sector, style: baseStyle },
        { value: asset.user || "Sem responsável", style: baseStyle },
        { value: asset.condition || "Não informado", style: asset.condition === "Crítico" ? STYLE.danger : baseStyle },
        { value: Number(asset.quantity || 1), style: STYLE.centered },
        { value: Number(asset.available || 0), style: Number(asset.available || 0) < Number(asset.minStock || 0) ? STYLE.warn : STYLE.centered },
        { value: Number(asset.defective || 0), style: Number(asset.defective || 0) > 0 ? STYLE.danger : STYLE.centered },
        { value: asset.notes || safeList(asset.tickets), style: baseStyle }
      ]);
    });
    return rows;
  }

  function indicatorRows(periods) {
    const rows = [
      [{ value: "SolveDesk Pro - Indicadores", style: STYLE.title }],
      [{ value: "Resumo por período para revisão de produtividade, recorrência e pontos de atenção.", style: STYLE.subtitle }],
      blank(6),
      styled(["Período", "Problemas", "Soluções", "Taxa", "Categoria recorrente", "Setor recorrente"], STYLE.header)
    ];

    if (!periods.length) {
      rows.push(styled(["Sem período", 0, 0, "0%", "Sem dados", "Sem dados"], STYLE.banded));
      return rows;
    }

    periods.forEach((period, index) => {
      const baseStyle = index % 2 ? STYLE.banded : STYLE.body;
      rows.push([
        { value: period.month, style: STYLE.strong },
        { value: period.problems, style: STYLE.centered },
        { value: period.solutions, style: STYLE.centered },
        { value: `${period.rate}%`, style: period.rate >= 75 ? STYLE.ok : period.rate >= 45 ? STYLE.warn : STYLE.danger },
        { value: period.category || "Sem dados", style: baseStyle },
        { value: period.sector || "Sem dados", style: baseStyle }
      ]);
    });
    return rows;
  }

  function workbookXml(sheetNames) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <bookViews><workbookView xWindow="0" yWindow="0" windowWidth="18000" windowHeight="12000"/></bookViews>
  <sheets>${sheetNames.map((name, index) => `<sheet name="${escapeXml(name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join("")}</sheets>
</workbook>`;
  }

  function workbookRels(sheetNames) {
    const rels = sheetNames.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${rels}
  <Relationship Id="rId${sheetNames.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  }

  function contentTypes(sheetNames) {
    const sheets = sheetNames.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${sheets}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
  }

  function rootRels() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
  }

  function coreProps() {
    const iso = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Relatório SolveDesk Pro</dc:title>
  <dc:creator>SolveDesk Pro</dc:creator>
  <cp:lastModifiedBy>SolveDesk Pro</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${iso}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${iso}</dcterms:modified>
</cp:coreProperties>`;
  }

  function appProps(sheetNames) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>SolveDesk Pro</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>${sheetNames.length}</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="${sheetNames.length}" baseType="lpstr">${sheetNames.map((name) => `<vt:lpstr>${escapeXml(name)}</vt:lpstr>`).join("")}</vt:vector></TitlesOfParts>
</Properties>`;
  }

  function crc32(bytes) {
    let crc = -1;
    for (let i = 0; i < bytes.length; i += 1) {
      crc ^= bytes[i];
      for (let bit = 0; bit < 8; bit += 1) {
        crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function uint16(value) {
    return [value & 255, (value >>> 8) & 255];
  }

  function uint32(value) {
    return [value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255];
  }

  function createZip(files) {
    const chunks = [];
    const central = [];
    let offset = 0;

    files.forEach((file) => {
      const nameBytes = textEncoder.encode(file.name);
      const data = typeof file.content === "string" ? textEncoder.encode(file.content) : file.content;
      const crc = crc32(data);
      const local = new Uint8Array([
        ...uint32(0x04034b50), ...uint16(20), ...uint16(0), ...uint16(0), ...uint16(0), ...uint16(0),
        ...uint32(crc), ...uint32(data.length), ...uint32(data.length), ...uint16(nameBytes.length), ...uint16(0),
        ...nameBytes
      ]);
      chunks.push(local, data);
      central.push({ nameBytes, crc, size: data.length, offset });
      offset += local.length + data.length;
    });

    let centralSize = 0;
    central.forEach((entry) => {
      const header = new Uint8Array([
        ...uint32(0x02014b50), ...uint16(20), ...uint16(20), ...uint16(0), ...uint16(0), ...uint16(0), ...uint16(0),
        ...uint32(entry.crc), ...uint32(entry.size), ...uint32(entry.size), ...uint16(entry.nameBytes.length),
        ...uint16(0), ...uint16(0), ...uint16(0), ...uint16(0), ...uint32(0), ...uint32(entry.offset),
        ...entry.nameBytes
      ]);
      chunks.push(header);
      centralSize += header.length;
    });

    const end = new Uint8Array([
      ...uint32(0x06054b50), ...uint16(0), ...uint16(0), ...uint16(central.length), ...uint16(central.length),
      ...uint32(centralSize), ...uint32(offset), ...uint16(0)
    ]);
    chunks.push(end);
    return new Blob(chunks, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  function createWorkbook({ metrics, problems, assets, periods }) {
    const sheetNames = ["Resumo Geral", "Problemas e Soluções", "Recursos de TI", "Indicadores"];
    const sheets = [
      sheetXml({
        rows: summaryRows(metrics),
        widths: [34, 24, 58],
        freezeRow: 5,
        autoFilterRow: 4,
        merges: ["A1:C1", "A2:C2", "A18:C18"]
      }),
      sheetXml({
        rows: problemRows(problems),
        widths: [11, 18, 14, 14, 34, 48, 22, 26, 22, 52, 14, 38],
        freezeRow: 5,
        autoFilterRow: 4,
        merges: ["A1:L1", "A2:L2"]
      }),
      sheetXml({
        rows: assetRows(assets),
        widths: [11, 18, 16, 16, 34, 22, 24, 18, 10, 13, 11, 42],
        freezeRow: 5,
        autoFilterRow: 4,
        merges: ["A1:L1", "A2:L2"]
      }),
      sheetXml({
        rows: indicatorRows(periods),
        widths: [18, 14, 14, 12, 30, 30],
        freezeRow: 5,
        autoFilterRow: 4,
        merges: ["A1:F1", "A2:F2"]
      })
    ];

    const files = [
      { name: "[Content_Types].xml", content: contentTypes(sheetNames) },
      { name: "_rels/.rels", content: rootRels() },
      { name: "docProps/core.xml", content: coreProps() },
      { name: "docProps/app.xml", content: appProps(sheetNames) },
      { name: "xl/workbook.xml", content: workbookXml(sheetNames) },
      { name: "xl/_rels/workbook.xml.rels", content: workbookRels(sheetNames) },
      { name: "xl/styles.xml", content: stylesXml() },
      ...sheets.map((content, index) => ({ name: `xl/worksheets/sheet${index + 1}.xml`, content }))
    ];

    return createZip(files);
  }

  function downloadWorkbook(payload, fileName = "solvedesk-pro-indicadores.xlsx") {
    const blob = createWorkbook(payload);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return {
    createWorkbook,
    downloadWorkbook
  };
})();
