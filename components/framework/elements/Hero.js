import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Hero = styled.div`
  display: flex;
  align-items: 'stretch';
  flex-direction: 'column';
  justify-content: 'space-between';
  min-height: ${({ isFullHeight }) => isFullHeight && '100vh'};
`;

Hero.propTypes = {
  isFullHeight: PropTypes.bool
};

Hero.Body = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;

  & > div {
    flex-grow: 1;
    flex-shrink: 1;
  }
`;

