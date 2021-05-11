

export default class LichessAPIClient {

    token?: string;

    updateToken(token: string) {
        console.log("Updating LichessAPIToken to: " + token);
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
