import axios from 'axios';

const customAxios = () => {
	return axios.create({
		baseURL: 'http://sulleong.site/',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	});
};

export default customAxios;
