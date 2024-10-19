import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import styles from "./styles.module.css";
import { UserContext } from "../../Context/UserContext";
import { Vortex } from "react-loader-spinner";
import google from "../../assets/img/google.png";
import { auth } from "../../config/firebase";

const Login = () => {
    const [loading, isLoading] = useState(false);

    const {
        setAuthTime,
        setExp,
        setName,
        setEmail,
        setPhotoURL,
        isSessionValid,
    } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(isSessionValid()) {
            navigate("/home");
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        isLoading(true);

        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if(credential && auth.currentUser) {
                    const { currentUser } = auth;
                    const token = await currentUser.getIdTokenResult();
                    const { authTime, expirationTime }  =token;
                    setAuthTime(new Date(authTime).getTime());
                    setExp(new Date(expirationTime).getTime());
                    setName(currentUser.displayName || "");
                    setEmail(currentUser.email || "");
                    setPhotoURL(currentUser.photoURL || "");
                    navigate("/home");
                } else {
                    console.log("Falha na autenticação");
                }
            })
            .catch((erro) => {
                const { code, message } = erro;
                console.log(code);
                console.log(message);
                isLoading(false);
            });
    };

    return (
        <div className={styles.loginPanel}>
            {loading && (
                <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            )}

            {!loading && (
                <>
                    <h1 className={styles.tittle}>Agenda TSI</h1>

                    <button onClick={handleLogin} className={styles.btnLogin}>
                        <img src={google} alt="Login com Google" />
                        <span>Entrar com Google</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default Login;