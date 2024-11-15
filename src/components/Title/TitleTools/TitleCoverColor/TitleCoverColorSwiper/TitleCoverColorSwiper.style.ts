import styled from "styled-components";

export const SwiperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 120px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
`;
export const PrevButton = styled.button`
  width: 24px;
  height: 22px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover_color_arr.png");
  background-position: 0 0;
  cursor: pointer;
`;

export const NextButton = styled.button`
  width: 24px;
  height: 22px;
  background-image: url("https://t1.daumcdn.net/brunch/static/img/help/pc/editor/btn_cover_color_arr.png");
  background-position: -28px 0;
  cursor: pointer;
`;

export const ColorSelectContainer = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`;

export const ColorCircleContainer = styled.div``;

export const ColorCircle = styled.div<{ $isSelected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "transparent" : "#fff"};
  opacity: ${({ $isSelected }) => ($isSelected ? "1" : "0.4")};
  transition: border 0.3s ease, transform 0.3s ease;
  border: ${({ $isSelected }) => ($isSelected ? "1px solid white" : "none")};
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.4)" : "scale(1)")};

  &:hover {
    transform: ${({ $isSelected }) =>
      !$isSelected && "scale(1.2) translateY(-10px)"};
  }
`;
