import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../utils';

const Left = styled.css`
`

const Right = styled(Left)`

`

export const Level = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'space-between';
  min-height: ${({ isFullHeight }) => isFullHeight && '100vh'};

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  img {
    display: inline-block;
    vertical-align: top;
  }

  ${({mobile}) => mobile && css`
    & ${Left},
    & ${Right} {
      display: flex;
    }

    & ${Left} + ${Right} {
      margin-top: 0;
    }
  `}

`;

Level.Item = styled.div`
  display: flex;
  align-items: center;
  ${({ narrow }) =>
    !narrow &&
    css`
      flex-grow: 1;
      flex-shrink: 0;
    `} ${media('tablet')} {
  }
`;

Level.Item.propTypes = {
  narrow: PropTypes.bool
};
