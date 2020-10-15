const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.resolve(__dirname, 'names.txt'));
const str = Buffer.from(file).toString();
// console.log(str + "");
const pattern = /.+/g;
const names = str.match(pattern);
const leader = [];
const member = [];
names.forEach((n) => {
    if (n.indexOf("*") >= 0) {
        leader.push(n);
    } else {
        member.push(n);
    }
})

fs.writeFileSync(path.resolve(__dirname, 'names.json'), JSON.stringify({ leader: leader, member: member }));