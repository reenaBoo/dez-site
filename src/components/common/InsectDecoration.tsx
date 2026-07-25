import styled from 'styled-components';

interface InsectDecorationProps {
  src: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  size?: number;
  opacity?: number;
  rotate?: number;
  flipHorizontal?: boolean;
  hideOnMobile?: boolean;
}

const StyledInsect = styled.div<{
  $src: string;
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
  $size: number;
  $opacity?: number;
  $rotate?: number;
  $flipHorizontal?: boolean;
  $hideOnMobile?: boolean;
}>`
  position: absolute;
  top: ${({ $top }) => $top || 'auto'};
  right: ${({ $right }) => $right || 'auto'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  left: ${({ $left }) => $left || 'auto'};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  opacity: ${({ $opacity = 0.14 }) => $opacity};
  transform: rotate(${({ $rotate = 0 }) => $rotate}deg) scaleX(${({ $flipHorizontal }) => $flipHorizontal ? -1 : 1});
  background-color: ${({ theme }) => theme.colors.primary};
  -webkit-mask: url(${({ $src }) => $src}) no-repeat center / contain;
  mask: url(${({ $src }) => $src}) no-repeat center / contain;
  pointer-events: none;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $hideOnMobile }) => $hideOnMobile && 'display: none;'}
    width: ${({ $size }) => $size / 2}px;
    height: ${({ $size }) => $size / 2}px;
  }
`;

export default function InsectDecoration({
  src, top, right, bottom, left, size = 100, opacity = 0.14, rotate = 0, flipHorizontal = false, hideOnMobile = false,
}: InsectDecorationProps) {
  return (
    <StyledInsect
      aria-hidden
      $src={src}
      $top={top}
      $right={right}
      $bottom={bottom}
      $left={left}
      $size={size}
      $opacity={opacity}
      $rotate={rotate}
      $flipHorizontal={flipHorizontal}
      $hideOnMobile={hideOnMobile}
    />
  );
}
