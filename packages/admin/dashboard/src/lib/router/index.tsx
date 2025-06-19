import { useMeQuery } from "../hooks/useMeQuery";

export const Router = () => {
    const { data, isLoading, error } = useMeQuery();
    console.log(data, isLoading, error)


    return (
        <div>
            abc abc
        </div>
    )
}