import axios from 'axios';

const fetchData = (url) => {
    return axios.get(url, {
        headers:
        {
            Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
        }
    }
    )
}

export default fetchData