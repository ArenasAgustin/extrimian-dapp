import React, { useEffect } from "react";
/* import { getTxList } from "../redux/actions"; */
import { init } from "../utils/web3Client";
/* import { useAppDispatch } from "../redux/hooks/hooks"; */

export default function Home() {
    /* const dispatch = useAppDispatch(); */
    
    useEffect(() => {
        init()
    }, []);

  return <div>Home</div>;
}
