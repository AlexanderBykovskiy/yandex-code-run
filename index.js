const extendTransportSystem = require("./modules/pr-311");

class EarthRoute {
    static vault = []
    transfer(parcel) {
        parcel.destination = 'Earth'
        EarthRoute.vault.push(parcel)
    }
}

class MoonRoute {
    static warehouse = []
    transfer(parcel) {
        parcel.destination = 'Moon'
        MoonRoute.warehouse.push(parcel)
    }
}


// Тесты

const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute)

const earthRoute1 = new EarthRoute()
const moonRoute2 = new MoonRoute()

earthRoute1.transfer({ content: 123 })
moonRoute2.transfer({ text: 'abc' })
moonRoute2.transfer({ text: 'lol' })

console.log("mothershipStorage", mothershipStorage)
/* [
 *   { content: 123, origin: 'Earth', destination: 'Mothership' },
 *   { text: 'abc', origin: 'Moon', destination: 'Mothership' }
 * ]
 */

console.log("EarthRoute", EarthRoute.vault)
/* [
 *   { content: 123, destination: 'Earth' }
 * ]
 */

console.log("MoonRoute", MoonRoute.warehouse)
/* [
 *   { text: 'abc', destination: 'Moon' }
 * ]
 */
