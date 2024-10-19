import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import styles from "./style.module.css";
import { UserContext } from "../../Context/UserContext";
import { auth } from "../../config/firebase";
import { Vortex } from "react-loader-spinner";

const Logout = () => {
    const { setExp, setAuthTime } = useContext(UserContext);
    const navigate = useNavigate();

    //useEffect(() => {}, []);
    useEffect(() => {
        signOut(auth)
            .then(() => {
                setExp(0);
                setAuthTime(0);
                navigate("/");
            })
            .catch((erro) => {
                const { code, message } = erro;
                console.log(code);
                console.log(message);
            })
    }, []);

    //https://mhnpd.github.io/react-loader-spinner/docs/components/rotating-triangles
    return (
        <div className={styles.container}>
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    );
};

export default Logout;