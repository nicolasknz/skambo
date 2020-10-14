import styled from 'styled-components';

export const MainBanner = styled.div(({ color }) => {
    background: color,
        width: '900px',
            display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
});

export const Infos = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Img = styled.img`
  border-radius: 8px;
  box-shadow: 4px 4px 0 0 #336;
`;
