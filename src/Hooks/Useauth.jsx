import  { useContext } from 'react';
import { Authcontext } from '../Provider/Authprovider';

const Useauth = () => {
    const auth=useContext(Authcontext)
    return auth;
};
export default Useauth;