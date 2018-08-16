import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

export const Level = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "space-between";
  min-height: ${({isFullHeight}) => isFullHeight && '100vh'};
`;

Level.Item = styled.div`
  display: flex;
  align-items: center;
  ${({narrow}) => !narrow && css`
    flex-grow: 1;
    flex-shrink: 0;
  `}
`

Level.Item.propTypes = {
  narrow: PropTypes.bool
}
