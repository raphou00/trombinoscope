import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <ToastContainer theme="dark" />
            {children}
        </>
    )
}

export default Providers;