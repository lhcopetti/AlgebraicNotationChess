

export default class StringStream {

    _content: string;

    public constructor(content: string) {
        this._content = content;
    }

    public get content() {
        return this._content;
    }

    public get length() {
        return this._content.length;
    }

    public get empty() {
        return this.length == 0;
    }

    private setContent(newContent: string): void {
        this._content = newContent;
    }

    public slice(begin: number, end: number): void {
        this.setContent(this.content.substring(begin, end));
    }

    public consumeOne() {
        this.slice(1, this.length);
    }
}
