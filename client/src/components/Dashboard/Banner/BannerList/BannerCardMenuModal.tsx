import React, { Dispatch } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import Modal from '@components/Common/Modal/Modal';

import trashIcon from '@assets/icons/trash.svg';
import { toast } from 'react-toastify';

type Props = {
  banner: CurrentBanner;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteBanner: (bannerId: string) => any;
  getBanners: () => void;
};

const BannerCardMenuModal = ({
  banner,
  isModalOpen,
  setIsModalOpen,
  deleteBanner,
  getBanners,
}: Props) => {
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const onDeleteBanner = () => {
    deleteBanner(banner.bannerId)
      .then((response: MessageResponse) => {
        getBanners();
        onCloseModal();
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) =>
        toast.error(error.response.data.message),
      );
  };

  return (
    <Modal
      open={isModalOpen}
      icon={<Trash />}
      title="배너가 삭제됩니다."
      onClickCancel={onCloseModal}
      onClickConfirm={onDeleteBanner}
    >
      <Em>[ {banner.bannerTitle} ]</Em>이/가 영구적으로 삭제됩니다.
      삭제하시겠습니까?
    </Modal>
  );
};

const Trash = styled(trashIcon)`
  width: 100%;
`;

const Em = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.color.green};
`;

const mapDispatchToProps = (dispatch: Dispatch<BannerAction>) => ({
  deleteBanner: (bannerId: string) => dispatch(actions.deleteBanner(bannerId)),
  getBanners: () => dispatch(actions.getBanners()),
});

export default connect(null, mapDispatchToProps)(BannerCardMenuModal);
