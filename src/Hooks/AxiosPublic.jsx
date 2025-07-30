import axios from "axios";

const axiospublic=axios.create({
    baseURL:'https://tree-plantnet-server-side-project-fuvb.onrender.com/'
})
const AxiosPublic = () => {
    return axiospublic
};

export default AxiosPublic;