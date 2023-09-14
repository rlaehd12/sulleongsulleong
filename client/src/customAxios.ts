import axios from 'axios';

const customAxios = () => {
	const token = sessionStorage.getItem('authorization');

	return axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers: token ? { Authorization: `${token}` } : {},
	});
};

export default customAxios;
