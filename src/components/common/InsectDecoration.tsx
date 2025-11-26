import styled from 'styled-components';
import Image from 'next/image';

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
    opacity: ${({ $opacity = 0.15 }) => $opacity};
    transform: rotate(${({ $rotate = 0 }) => $rotate}deg) scaleX(${({ $flipHorizontal }) => $flipHorizontal ? -1 : 1});
    pointer-events: none;
    z-index: 1;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;

    img {
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
        width: 100%;
        height: 100%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        ${({ $hideOnMobile }) => $hideOnMobile && 'display: none;'}
        width: ${({ $size }) => $size / 2}px;
        height: ${({ $size }) => $size / 2}px;
    }
`;

export default function InsectDecoration({
  src, top, right, bottom, left, size = 100, opacity = 0.25, rotate = 0, flipHorizontal = false, hideOnMobile = false,
}: InsectDecorationProps) {
  return (<StyledInsect
    $top={top}
    $right={right}
    $bottom={bottom}
    $left={left}
    $size={size}
    $opacity={opacity}
    $rotate={rotate}
    $flipHorizontal={flipHorizontal}
    $hideOnMobile={hideOnMobile}
  >
    <Image
      src={src}
      alt=''
      width={size}
      height={size}
      priority={false}
    />
  </StyledInsect>);
}
