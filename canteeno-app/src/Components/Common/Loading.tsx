import styled, { keyframes } from "styled-components";

const beat = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const BeatLoader = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(203, 32, 46, 0.92);
  border-radius: 50%;
  animation: ${beat} 0.5s infinite ease-in-out;
`;

export const Loading = () => {
  return (
    <LoadingOverlay>
      <BeatLoader />
    </LoadingOverlay>
  );
};
