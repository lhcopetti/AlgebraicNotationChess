

export default class Objects {

    public static  nonNull<Type>(arg: Type | null | undefined): arg is Type {
        return arg != null;
    }

}
