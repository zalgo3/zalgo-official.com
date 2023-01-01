import 'styles/global.css';

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <html>
            <head />
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
