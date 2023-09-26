import axios from 'axios';

const customAxios = () => {
	const token = sessionStorage.getItem('authorization');
	const role = sessionStorage.getItem('role');

	return axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers: {
			...(token ? { Authorization: `${token}` } : {}),
			...(role ? { Role: `${role}` } : {}),
		},
	});
};

export default customAxios;
