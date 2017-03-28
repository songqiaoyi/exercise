var taizhuRmb = 0.1963

function roundTwoDecimals(amount) {
    return Math.round(amount * 100) / 100
}

exports.taizhuToRmb = function(taizhu) {
    return roundTwoDecimals(taizhu * taizhuRmb)
}

exports.rmbToTaizhu = function(rmb) {
    return roundTwoDecimals(rmb / taizhuRmb)
}