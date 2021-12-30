import { Alert } from "@material-ui/lab";

const AlertBanner = ({alertType, alertMsg}) => {
    const msg = alertMsg || "An unexpected error occured. Please try again later";
    return (
        <Alert
            severity={alertType}
            color={alertType}
            variant="outlined"
        >
            {msg}
        </Alert>
    );
}

export default AlertBanner;