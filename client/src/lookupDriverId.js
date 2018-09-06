
const lookupDriverId = (driverId) => {
    let driverIdResponse;
    if (driverId) {
        fetch('/api/vans/dvid/' + driverId)
            .then(res => {
                if (res.status === 404) {
                    const err = { "Reviews": [], "driver_name": "Invalid Driver ID" };
                    return err
                } else {
                    return res.json()
                }
            })
            .then(response => {
                driverIdResponse = response;
                console.log("response: " + driverIdResponse);
                return driverIdResponse;
            })
            .catch(err => console.log("Fatal error: " + err));
    }
}

export default lookupDriverId;