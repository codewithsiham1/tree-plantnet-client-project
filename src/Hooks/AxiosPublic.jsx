import axios from "axios";

const axiospublic=axios.create({
    baseURL:'https://y-hqwq5corh-sihams-projects-6b0cef74.vercel.app'
})
const AxiosPublic = () => {
    return axiospublic
};

export default AxiosPublic;