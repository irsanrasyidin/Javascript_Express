const ExecutionResult = require('../../domain/entities/execution_result');

function filterByName(executions, targetNama) {
    const filteredExecutions = executions.filter(execution => execution.nama.includes(targetNama));
    return filteredExecutions;
}

function analyzeExecutions(executions) {
    const result = [];

    const groupedExecutions = {};
    executions.forEach(execution => {
        groupedExecutions[execution.nama] ??= []; // Jika belum ada, inisialisasi
        groupedExecutions[execution.nama].push(execution);
    });

    for (const nama in groupedExecutions) {
        let durations = groupedExecutions[nama].map(execution => parseFloat(execution.duration));

        let standardDeviation = calculateStandardDeviation(durations).toFixed(3);
        let outlierData = [];

        while (standardDeviation > 10 && durations.length > 1) { // Kondisi untuk loop
            const maxDuration = Math.max(...durations);
            outlierData.push(maxDuration);
            durations = durations.filter(duration => duration !== maxDuration); // Hapus max
            standardDeviation = calculateStandardDeviation(durations).toFixed(3);
        }

        const average = durations.length > 0 ? (durations.reduce((acc, curr) => acc + curr, 0) / durations.length).toFixed(3) : 0;
        const fastest = durations.length > 0 ? Math.min(...durations) : 0;

        result.push(new ExecutionResult(nama, average, fastest, durations, standardDeviation, outlierData.length, outlierData));
    }
    //console.log(result)

    return result;
}

function calculateStandardDeviation(numbers) {
    const mean = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    const variance = numbers.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / numbers.length;
    const sDeviasi = Math.sqrt(variance);
    return sDeviasi;
}

function analyze(mainData) {
    const jsonData = filterByName(mainData, "Json");
    const postgresqlData = filterByName(mainData, "Postgresql");    
    const resultJson = analyzeExecutions(jsonData);
    const resultPostgresql = analyzeExecutions(postgresqlData);
    return { resultJson, resultPostgresql };
}

function sort(mainData, resultData) {
    resultData.forEach(element => {
        mainData.forEach(element2 => {
            if (element.nama.toLowerCase() == element2.nama.toLowerCase()) {
                if (Array.isArray(element.OutlinerData)) {
                    element.OutlinerData.forEach(element3 => {
                        if (element2.duration == element3) {
                            element2.status = 'out';
                        }
                    });
                } else if (element.OutlinerData !== null) {;
                    if (element2.duration == element.OutlinerData) {
                        element2.status = 'out';
                    }
                }
                if (element.Top == element2.duration){
                    element2.status='top';
                }
            }
        });
    });
}

module.exports = { filterByName, analyze, sort};
