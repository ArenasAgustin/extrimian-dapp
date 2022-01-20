import React, { useEffect } from "react";
import { getTxList } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks/hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getTxList())
    }, []);

  return <div>Home</div>;
}
