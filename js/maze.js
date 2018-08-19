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

var maze2 = '\
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa   a\n\
8   8               8               8           8                   8   8\n\
8   8   aaaaaaaaa   8   aaaaa   aaaa8aaaa   aaaa8   aaaaa   aaaaa   8   8\n\
8               8       8   8           8           8   8   8       8   8\n\
8aaaaaaaa   a   8aaaaaaa8   8aaaaaaaa   8aaaa   a   8   8   8aaaaaaa8   8\n\
8       8   8               8           8   8   8   8   8           8   8\n\
8   a   8aaa8aaaaaaaa   a   8   aaaaaaaa8   8aaa8   8   8aaaaaaaa   8   8\n\
8   8               8   8   8       8           8           8       8   8\n\
8   8aaaaaaaaaaaa   8aaa8   8aaaa   8   aaaaa   8aaaaaaaa   8   aaaa8   8\n\
8           8       8   8       8   8       8           8   8           8\n\
8   aaaaa   8aaaa   8   8aaaa   8   8aaaaaaa8   a   a   8   8aaaaaaaaaaa8\n\
8       8       8   8   8       8       8       8   8   8       8       8\n\
8aaaaaaa8aaaa   8   8   8   aaaa8aaaa   8   aaaa8   8   8aaaa   8aaaa   8\n\
8           8   8           8       8   8       8   8       8           8\n\
8   aaaaa   8   8aaaaaaaa   8aaaa   8   8aaaa   8aaa8   aaaa8aaaaaaaa   8\n\
8   8       8           8           8       8   8   8               8   8\n\
8   8   aaaa8aaaa   a   8aaaa   aaaa8aaaa   8   8   8aaaaaaaaaaaa   8   8\n\
8   8           8   8   8   8   8           8               8   8       8\n\
8   8aaaaaaaa   8   8   8   8aaa8   8aaaaaaa8   aaaaaaaaa   8   8aaaaaaa8\n\
8   8       8   8   8           8           8   8       8               8\n\
8   8   aaaa8   8aaa8   aaaaa   8aaaaaaaa   8aaa8   a   8aaaaaaaa   a   8\n\
8   8                   8           8               8               8   8\n\
8   8aaaaaaaaaaaaaaaaaaa8aaaaaaaaaaa8aaaaaaaaaaaaaaa8aaaaaaaaaaaaaaa8aaa8\n\
';

var rows = maze2.split('\n');

var walls = [];

for (var row = 0; row < rows.length; row++) {
    var start = null;

    for (var col = 0; col < rows[row].length; col++) {
        var char = rows[row][col];

        if (char !== ' ') {
            if (start === null) {
                start = col;
            }
        } else if (start !== null) {
            makeWall(col, row, start);
            start = null;
        }
    }

    if (start !== null) {
        makeWall(col, row, start);
    }
}

function makeWall(col, row, start) {
    var wallHeight = 3;

    var wallLength = col - start;
    var center = (col + start) / 2;

    walls.push({
        width: wallLength,
        height: wallHeight,
        depth: 1,
        position: { x: center, y: wallHeight / 2, z: row }
    });
}

exports.getWalls = function () {
    return walls;
}