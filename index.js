const solveCaptcha = require("./module/pr-292");

// const test1 = `
//   TRABWARH
//   THSCAHAW
//   WWBCWASA
//   CACACHCR
// `

// const test1 = `
//   TSABWARH
//   THFCAHSW
//   WBCWASA
//   CSCACHCR
// `

const test1 = `
HSRSTBHC
CAWTRTBT
WBATSTRA
TWRBRTRR
RWTABSHB
TWCBWBCA
`

// const test1 = `
// TSRSBWAC
// ASCSWBTC
// TTAHTABC
// AHWTRWWA
// `

console.log("res", solveCaptcha(test1));
