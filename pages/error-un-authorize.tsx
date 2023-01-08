import styles from 'styles/error-un-authorize.module.css'


const ErrorUnAuthorize = () => {

    return (
        <div className = {styles.container}>
            <p className={styles.error}>Error : Un Authorized User</p>
        </div>
    );
};

export default ErrorUnAuthorize;