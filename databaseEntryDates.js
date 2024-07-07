let databases;

fetch("songDatabases.json").then(res => res.json()).then(json => {
  databases = json;

  for(const database in databases) {
    let total = 0;
    let numberOfBenchmarks = 0;
    for(let benchmark in databases[database].benchmarks) {
      if(benchmark == 0) { continue; };
      benchmark = benchmark;
      numberOfBenchmarks++;
      total += (benchmark / databases[database].benchmarks[benchmark]);
    };
    databases[database].averagePerDay = (total / numberOfBenchmarks);
  };

  const dayMs = 8.64e+7;

  const approximate1 = (idBenchmarks, id, baseTimestamp, averagePerDay) => {
    const benchmarkIds = Object.keys(idBenchmarks).map(i => parseInt(i));
    let surroundingIds;
    for (let i = 0; i < benchmarkIds.length; i++) {
      const lowEnd = benchmarkIds[i];
      const highEnd = benchmarkIds[i + 1];
      if (id >= lowEnd && id <= highEnd) {
        surroundingIds = [lowEnd, highEnd];
        break;
      };
    };
    let lowId, highId, lowDate, highDate;
    if(surroundingIds) {
      lowId = surroundingIds[0];
      highId = surroundingIds[1];
      lowDate = idBenchmarks[surroundingIds[0]];
      highDate = idBenchmarks[surroundingIds[1]];
    } else {
      lowId = benchmarkIds[benchmarkIds.length - 1];
      highDate = Math.round((Date.now() - baseTimestamp) / dayMs);
      highId = lowId + (averagePerDay * (highDate - idBenchmarks[lowId]));
      lowDate = idBenchmarks[lowId];
      id = Math.min(id, highId);
      console.log(lowId, highId, lowDate, highDate, id);
    };
    return {
      approximateDate: lowDate + Math.round(((id - lowId) / (highId - lowId)) * (highDate - lowDate)),
      lowDate, highDate
    };
  };

  const dayToDate = (startTimestamp, days) => new Date(startTimestamp + (days * dayMs));

  const dbSelect = document.getElementById("databaseName");
  const entryIdInput = document.getElementById("entryId");

  const resultElem = document.getElementById("result");

  document.getElementById("approximateDate").addEventListener("click", function () {
    const dbName = dbSelect.value.toUpperCase();
    switch (dbName) {
      case "":
        alert("You must select a database name first.");
        break;
      case "SOCAN":
      case "ASCAP":
      case "BMI":
      case "GEMA":
      case "CMRRA":
        const entryId = parseInt(dbName == "GEMA" ? entryIdInput.value.split("-")[0] : entryIdInput.value);
        const database = databases[dbName];
        if (entryId) {
          const result = approximate1(database.benchmarks, entryId, database.baseTimestamp, database.averagePerDay);
          console.log(result);
          resultElem.innerHTML = `
        <strong>Approximate Date:</strong> ${dayToDate(database.baseTimestamp, result.approximateDate).toDateString()}<br />
        <strong>Likely Date Range:</strong> From ${dayToDate(database.baseTimestamp, result.lowDate).toDateString()} to ${dayToDate(database.baseTimestamp, result.highDate).toDateString()}</strong><br /><br />
        <em>* Please note: Work numbers can vary greatly. Occasionally, songs may have multiple entries. Please ensure you've entered the lowest work number for your song.</em>`;
        } else {
          alert(`An invalid work number has been entered. In most databases, entry IDs are only allowed to be numbers. Please try again.`);
        };
        break;
    };
  });
});
