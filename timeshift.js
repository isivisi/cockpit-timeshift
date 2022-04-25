//import cockpit from 'cockpit';

const backupRegex = /([0-9]*).*\>.*([0-9]{4}.* ) ([A-Z].*)/g;
const snapshotDataRegex = /[0-9].* snapshots/
const freespaceRegex = / [0-9].* free/

const backuplist = document.getElementById("backuplist");
const details = document.getElementById("details");

async function getBackups() {
    var output = []
    await cockpit.spawn(["timeshift", "--list"], options={superuser:true})
    .stream(out => {
        console.log(output)
        output.push(out)
    })
    return output.toString()
}

async function update() {
    getBackups().then(backupsRaw => {

        var snapshots = backupsRaw.match(snapshotDataRegex);
        var freeSpace = backupsRaw.match(freespaceRegex)

        details.innerHTML = `<p>${snapshots}</p>
        <p>${freeSpace}</p>`

        var backups = [...backupsRaw.matchAll(backupRegex)]
        for (var i = 0; i < backups.length; i++) {
            var backup = backups[i]

            backuplist.innerHTML += `<tr>
                <td><img src="default.png" role="presentation" alt=""></td>
                <td><button class="pf-c-button pf-m-link" type="button">${backup[1]}</button></td>
                <td>${backup[2]}</td>
                <td>${backup[3]}</td>
                <td><button class="pf-c-button pf-m-danger" type="button">Remove</button></td>
                </tr>`
        }
    })
}

update()
