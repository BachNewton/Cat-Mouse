var maze = '\
.--.--.--.  .--.--.\n\
|     |        |  |\n\
:  :--:  :  :  :  :\n\
|  |     |  |     |\n\
:  :  :  :--:--:--:\n\
|  |  |           |\n\
:  :  :--:--:--:  :\n\
|  |        |  |  |\n\
:  :--:--:  :  :  :\n\
|     |     |  |  |\n\
:--:  :  :--:  :  :\n\
|        |        |\n\
:  :--:--:--:--:--:\
';

var rows = maze.split('\n');

var walls = [];

for (var row = 0; row < rows.length; row++) {
    for (var col = 0; col < rows[row].length; col++) {
        var char = rows[row][col];

        if (char !== ' ') {
            walls.push({ x: col, y: 0, z: row });
        }
    }
}

exports.getWalls = function () {
    return walls;
}