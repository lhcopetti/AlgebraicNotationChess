export default class TokenStorage {
    private tokenKey: string = 'lichessAPIToken';

    public static getToken(): Promise<string> {
        const promise: Promise<string> = new Promise((resolve, reject) => {
            chrome.storage.sync.get(null, (item) => {
                resolve(item.lichessAPIToken);
            });
        });

        return promise;
    }

    public static setToken(token: string) {
        const obj = {
            lichessAPIToken: token,
        };

        chrome.storage.sync.set(obj);
        console.log(`Token with value: [${token}] saved`);
    }

    public static addTokenChangedListener(listener: (newToken: string) => void) {
        chrome.storage.onChanged.addListener((changes, area) => {
            console.log('Chrome storage changed event: ');
            console.log(changes);
            console.log('Area changed:');
            console.log(area);

            const newValue = changes.lichessAPIToken?.newValue;
            if (area === 'sync' && newValue) {
                console.log(`Calling listener with: ${newValue}`);
                listener(newValue);
            }
        });
    }
}
