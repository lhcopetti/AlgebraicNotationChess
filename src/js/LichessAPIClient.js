

export default class LichessAPIClient {

    constructor(token) {
        this.token = token;
    }

    sendMove(gameId, move) {
        const method = 'POST';
        const body = {};

        const headers = new Headers();
        headers.append("Authorization", "Bearer " + this.token);

        fetch('https://lichess.org/api/board/game/' + gameId + '/move/' + move, {
            method: method,
            body: body,
            headers: headers
        })
            .then(res => res.json())
            .then(console.log);
    }

}
