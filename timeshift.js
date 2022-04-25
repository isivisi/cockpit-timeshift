//import cockpit from 'cockpit';

const backupRegex = /([0-9]*).*\>.*([0-9]{4}.* ) ([A-Z].*)/;

async function getBackups() {
    cockpit.spawn(["timeshift", "--list", address.value])
        .then(raw => {
            console.log(raw)
            return raw
        });
}

getBackups()