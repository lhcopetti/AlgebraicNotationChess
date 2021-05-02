

export default class Arrays {

    public static clone<Type>(arr: Type[]): Type[] {
        const result: Type[] = [];
        arr.forEach(e => result.push(e));
        return result;
    }

    public static cloneMatrix<Type>(arr: Type[][]): Type[][]  {
        const result: Type[][] = [];
        arr.forEach(e => result.push(Arrays.clone(e)));
        return result;
    }
}
