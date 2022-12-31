import {Text} from '@fluentui/react-components';
import moment from 'moment';

const Footer = () => {
    const now = moment().format('YYYY');
    const years = now === '2018' ? now : `2018 - ${now}`;
    return (
        <>
            <Text>© {years} Hiroki Tanabe</Text>
        </>
    );
};

export default Footer;
