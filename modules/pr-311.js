function extendTransportSystem(EarthRoute, MoonRoute) {

    const mothershipStorage = [];

    let earthMixin = {
        transfer(parcel) {
            parcel.destination = 'Earth'
            EarthRoute.vault.push(parcel)
            mothershipStorage.push({...parcel, ...{origin: parcel.destination, destination: 'Mothership'}})
        }
    }

    Object.assign(EarthRoute.prototype, earthMixin);


    let moonMixin = {
        transfer(parcel) {
            parcel.destination = 'Moon'
            MoonRoute.warehouse.push(parcel)
            mothershipStorage.push({...parcel, ...{origin: parcel.destination, destination: 'Mothership'}})
        }
    }

    Object.assign(MoonRoute.prototype, moonMixin);

    return mothershipStorage
}

module.exports = extendTransportSystem
