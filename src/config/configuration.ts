interface EnvironmentVariables {
    PORT: number;
    ENVIRONMENT: string;
    DATABASE: {
        HOST: string;
        PORT: number;
        DATABASE: string;
        USERNAME: string;
        PASSWORD: string;
        CONNECTION: string;
    };
}

export default (): EnvironmentVariables => ({
    PORT: parseInt(process.env.SERVER_PORT, 10) || 3115,
    ENVIRONMENT: process.env.NODE_ENV || 'DEVELOPMENT',
    DATABASE: {
        HOST: process.env.DB_HOST || 'localhost',
        PORT: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        DATABASE: process.env.DB_DATABASE,
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
        CONNECTION: process.env.DB_CONNECTION || 'mysql',
    }
});
