export default class Arrays {
    public static clone<Type>(arr: Type[]): Type[] {
        const result: Type[] = [];

        for (let i = 0; i < arr.length; i += 1) result.push(arr[i]);

        return result;
    }

    public static cloneMatrix<Type>(arr: Type[][]): Type[][] {
        const result: Type[][] = [];
        arr.forEach((e) => result.push(Arrays.clone(e)));
        return result;
    }
}
