import 'styles/global.scss'

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <html>
            <head />
            <body>
                            {children}
            </body>
        </html>
    );
};

export default Layout;
