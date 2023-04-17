import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseConfig';
import { useNotification } from '../../services/notification/notificationService';
import {
    getDoc,
    doc,
} from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const VerificarAdmin = ({ onConfirm }) => {
    const location = useLocation();
    const { setNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                if (location.pathname.includes("/admin")) {
                    // Mover aquí el código que busca el documento
                    try {
                        const docRef = doc(db, 'admins', user.uid);
                        getDoc(docRef).then((doc) => {
                            if (doc.exists()) {
                                onConfirm()
                            } else {
                                console.log('No existe el documento');
                                setNotification(
                                    'error',
                                    `No tienes permiso de acceder a esta sección`
                                );
                                navigate("/")
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                setNotification(
                    'error',
                    `No tienes permiso de acceder a esta sección. Inicia sesión primero.`
                );
                navigate("/")
            }
        });
    }, []);
}
export default VerificarAdmin;