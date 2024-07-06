const dayMs = 8.64e+7;

// SOCAN

const socanTimestamp = 6375744e5;

let socanIdBenchmarks = {
  0: 0,
  10207521: 1075,
  10469755: 1362,
  10743384: 1467,
  20077587: 2397,
  23806593: 2433,
  26521174: 3622,
  29159388: 4246,
  35955099: 6003,
  72614623: 7746,
  76619173: 8339,
  83217364: 9345,
  89351673: 9943,
  91010349: 10080,
  219923194: 10385,
  215438506: 11395,
  229094272: 11934,
  230878959: 12024
};

socanIdBenchmarks[Number.MAX_SAFE_INTEGER] = Math.round((Date.now() - socanTimestamp) / dayMs);

// ASCAP

const ascapTimestamp = -17634816e5;

let ascapIdBenchmarks = {
  0: 0,
  505602753: 21651,
  885167159: 36501,
  888011848: 36943,
  889537420: 37114,
  889665372: 37169,
  890359260: 37198,
  892675614: 37590,
  892726263: 37674,
  893642879: 37891,
  894072408: 38052,
  894738075: 38055,
  895354562: 38073,
  895593810: 38157,
  903925977: 38626,
  908435431: 38794,
  925183429: 40277
};

ascapIdBenchmarks[Number.MAX_SAFE_INTEGER] = Math.round((Date.now() - ascapTimestamp) / dayMs);

// BMI

const bmiTimestamp = -954432e6;

const bmiIdBenchmarks = {
  0: 0,
  215090: 10805,
  323300: 13531,
  476509: 18343,
  1177526: 14326,
  1897447: 19605,
  3740021: 20835,
  5178540: 22151,
  5795427: 22690,
  6644917: 23362,
  6808935: 23495,
  7478552: 23787,
  7607775: 24258,
  9209320: 24832,
  11333525: 25686,
  11924147: 25801,
  14432646: 26228,
  14275728: 26550,
  16492867: 26819,
  16949729: 27215,
  20395750: 27717,
  22564532: 27922,
  24165120: 28384,
  28007551: 28783,
  28684500: 28881,
  29794252: 28905,
  30860477: 29105,
  33076334: 29175,
  42462672: 29364,
  48076001: 29650,
  51816432: 29812,
  52000138: 29868,
  52296665: 29924,
  63346458: 30609,
};

bmiIdBenchmarks[Number.MAX_SAFE_INTEGER] = Math.round((Date.now() - bmiTimestamp) / dayMs);

// GEMA
      
const gemaTimestamp = -11442528e5;

const gemaIdBenchmarks = {
  0: 0,
  1519211: 17762,
  1555666: 17995,
  1555778: 18066,
  1666243: 18488,
  1772993: 18813,
  1846769: 19009,
  1952058: 19233,
  1956236: 19556,
  2129942: 19765,
  2315485: 20246,
  4573019: 23559,
  4826722: 23867,
  4838256: 23885,
  4838276: 23972,
  5133711: 24231,
  5135800: 24323,
  5155028: 24644,
  5473548: 24980,
  5478320: 25008,
  7722723: 25386,
  8140647: 25932,
  10615270: 27567,
  12551280: 28666,
  16162723: 29968,
  23907764: 31438,
  35179309: 31814,
  35533539: 32075,
  35653093: 32862
};

gemaIdBenchmarks[Number.MAX_SAFE_INTEGER] = Math.round((Date.now() - gemaTimestamp) / dayMs);

// CMRRA

const cmrraTimestamp = 1577952e2;

const cmrraIdBenchmarks = {
  0: 0,
  171090: 3170,
  173849: 3313,
  187985: 3603,
  190476: 3713,
  336836: 4275,
  355124: 6473,
  375205: 6704,
  447929: 7664,
  674120: 5242,
  721110: 9406,
  756650: 9799,
  794588: 10144,
  814940: 10337,
  843967: 10632,
  901792: 11019,
	1331602: 11941,
  1741445: 12393,
  2165707: 13040,
  2243561: 13331,
  3182287: 14653,
	11008137: 15103,
  18971724: 15644,
  19036411: 15724,
  22553250: 16004,
  29697557: 16333,
  33971321: 16795,
  58704825: 17110
};

cmrraIdBenchmarks[Number.MAX_SAFE_INTEGER] = Math.round((Date.now() - cmrraTimestamp) / dayMs);

// End of Database Code

const approximate1 = (idBenchmarks, id) => {
  const benchmarkIds = Object.keys(idBenchmarks).map(i => parseInt(i));
  let surroundingIds;
  for(let i = 0; i < benchmarkIds.length; i++) {
    const lowEnd = benchmarkIds[i];
    const highEnd = benchmarkIds[i + 1];
    console.log(lowEnd, highEnd, i);
    if(id >= lowEnd && id <= highEnd) {
      surroundingIds = [lowEnd, highEnd];
      break;
    };
  };
  const lowId = surroundingIds[0];
  const highId = surroundingIds[1];
  const lowDate = idBenchmarks[surroundingIds[0]];
  const highDate = idBenchmarks[surroundingIds[1]];
  console.log(lowDate, highDate);
  return {
    approximateDate: lowDate + Math.round(((id - lowId) / (highId - lowId)) * (highDate - lowDate)),
    lowDate, highDate
  };
};

const dayToDate = (startTimestamp, days) => new Date(startTimestamp + (days * dayMs));

const dbSelect = document.getElementById("databaseName");
const entryIdInput = document.getElementById("entryId");

const benchmarksMap = { "socan": socanIdBenchmarks, "ascap": ascapIdBenchmarks, "bmi": bmiIdBenchmarks, "gema": gemaIdBenchmarks, "cmrra": cmrraIdBenchmarks };
const timestampsMap = { "socan": socanTimestamp, "ascap": ascapTimestamp, "bmi": bmiTimestamp, "gema": gemaTimestamp, "cmrra": cmrraTimestamp };

const resultElem = document.getElementById("result");

document.getElementById("approximateDate").addEventListener("click", function() {
  const dbName = dbSelect.value;
  switch(dbName) {
    case "":
      alert("You must select a database name first.");
      break;
    case "socan":
    case "ascap":
    case "bmi":
    case "gema":
    case "cmrra":
      const entryId = parseInt(dbName == "gema" ? entryIdInput.value.split("-")[0] : entryIdInput.value);
      if(entryId) {
        const result = approximate1(benchmarksMap[dbName], entryId);
        console.log(dbName, timestampsMap[dbName], benchmarksMap[dbName], result);
        resultElem.innerHTML = `
        <strong>Approximate Date:</strong> ${dayToDate(timestampsMap[dbName], result.approximateDate).toDateString()}<br />
        <strong>Likely Date Range:</strong> From ${dayToDate(timestampsMap[dbName], result.lowDate).toDateString()} to ${dayToDate(timestampsMap[dbName], result.highDate).toDateString()}</strong><br /><br />
        <em>* Please note: Work numbers can vary greatly. Make sure you have chosen the lowest work number associated with this song.</em>`;
      } else {
        alert(`An invalid ${dbName.toUpperCase()} entry ID has been entered. In most databases, work IDs are only allowed to be numbers. Please try again.`);
      };
      break;
  };
});