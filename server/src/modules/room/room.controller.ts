import { Socket } from "socket.io";

const defaultDeck = [
    {
        "suit": "hearts",
        "value": 2
    },
    {
        "suit": "hearts",
        "value": 3
    },
    {
        "suit": "hearts",
        "value": 4
    },
    {
        "suit": "hearts",
        "value": 5
    },
    {
        "suit": "hearts",
        "value": 6
    },
    {
        "suit": "hearts",
        "value": 7
    },
    {
        "suit": "hearts",
        "value": 8
    },
    {
        "suit": "hearts",
        "value": 9
    },
    {
        "suit": "hearts",
        "value": 10
    },
    {
        "suit": "hearts",
        "value": "J"
    },
    {
        "suit": "hearts",
        "value": "Q"
    },
    {
        "suit": "hearts",
        "value": "K"
    },
    {
        "suit": "hearts",
        "value": "A"
    },
    {
        "suit": "diamonds",
        "value": 2
    },
    {
        "suit": "diamonds",
        "value": 3
    },
    {
        "suit": "diamonds",
        "value": 4
    },
    {
        "suit": "diamonds",
        "value": 5
    },
    {
        "suit": "diamonds",
        "value": 6
    },
    {
        "suit": "diamonds",
        "value": 7
    },
    {
        "suit": "diamonds",
        "value": 8
    },
    {
        "suit": "diamonds",
        "value": 9
    },
    {
        "suit": "diamonds",
        "value": 10
    },
    {
        "suit": "diamonds",
        "value": "J"
    },
    {
        "suit": "diamonds",
        "value": "Q"
    },
    {
        "suit": "diamonds",
        "value": "K"
    },
    {
        "suit": "diamonds",
        "value": "A"
    },
    {
        "suit": "clubs",
        "value": 2
    },
    {
        "suit": "clubs",
        "value": 3
    },
    {
        "suit": "clubs",
        "value": 4
    },
    {
        "suit": "clubs",
        "value": 5
    },
    {
        "suit": "clubs",
        "value": 6
    },
    {
        "suit": "clubs",
        "value": 7
    },
    {
        "suit": "clubs",
        "value": 8
    },
    {
        "suit": "clubs",
        "value": 9
    },
    {
        "suit": "clubs",
        "value": 10
    },
    {
        "suit": "clubs",
        "value": "J"
    },
    {
        "suit": "clubs",
        "value": "Q"
    },
    {
        "suit": "clubs",
        "value": "K"
    },
    {
        "suit": "clubs",
        "value": "A"
    },
    {
        "suit": "spades",
        "value": 2
    },
    {
        "suit": "spades",
        "value": 3
    },
    {
        "suit": "spades",
        "value": 4
    },
    {
        "suit": "spades",
        "value": 5
    },
    {
        "suit": "spades",
        "value": 6
    },
    {
        "suit": "spades",
        "value": 7
    },
    {
        "suit": "spades",
        "value": 8
    },
    {
        "suit": "spades",
        "value": 9
    },
    {
        "suit": "spades",
        "value": 10
    },
    {
        "suit": "spades",
        "value": "J"
    },
    {
        "suit": "spades",
        "value": "Q"
    },
    {
        "suit": "spades",
        "value": "K"
    },
    {
        "suit": "spades",
        "value": "A"
    }
]


type roomsType = {
    [roomName: string]: {
        password: string,
        gameRunning: boolean,
        game: object,
        players: {
            [username: string]: {
                id: string,
                admin: boolean
            }
        },
    }
}

let rooms: roomsType = {}

const game = (socket: Socket) => {
    // create room by owner
    socket.on("create_room", ({ roomName, password }) => {
        if (typeof password !== "string") {
            return
        }
        const player = socket.player

        if (!player) {
            socket.emit('room_status', { success: false, message: 'Incorrect ceridentials' });
            return;
        }
        rooms = {
            ...rooms,
            [roomName]: {
                password,
                gameRunning: false,
                game: {},
                players: {
                    [player.username]: { id: player.id, admin: true },

                },
            },
        }

        socket.join(roomName)

        socket.emit('room_status', { success: true, message: `Camera ${roomName} a fost creată.` });
    })


    socket.on("join-room", ({ roomName, password }) => {
        const room = rooms[roomName]
        if (!room) {
            socket.emit('room_status', { success: false, message: 'Camera nu există.' });
            return;
        }

        if (room.password !== password) {
            socket.emit('room_status', { success: false, message: 'Parola incorecta.' });
            return;
        }
        const player = socket.player

        if (!player) {
            socket.emit('room_status', { success: false, message: 'Incorrect ceridentials' });
            return;
        }
        room.players = {
            ...room.players,
            [player.username]: { id: player.id, admin: false },
        }

    })

    socket.on
}