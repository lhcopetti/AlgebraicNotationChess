

export default class LichessAPIClient {

    token: string;

    constructor(token: string) {
        this.token = token;
    }

    sendMove(gameId: string, move: string) {
        const method = 'POST';
        const body = {} as any;

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
