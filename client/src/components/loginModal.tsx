import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import style from '../styles/loginModal.module.css';

interface LoginModalProps {
	openModal: boolean;
	setOpenModal: (value: boolean) => void;
}

function LoginModal({ openModal, setOpenModal }: LoginModalProps) {
	const handleClose = () => setOpenModal(false);

	return (
		<div>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={style.box}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						align="center"
					>
						로그인이 필요합니다
					</Typography>
					<div className={style.buttonBox}>
						<Button className={style.button} onClick={() => handleClose()}>
							돌아가기
						</Button>
						<Link to="/login">
							<Button className={style.button}>로그인</Button>
						</Link>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default LoginModal;
