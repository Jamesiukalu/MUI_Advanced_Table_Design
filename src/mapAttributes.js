import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import rem from '../../../helpers/PixelToRem';

const MapAttributes = ({ data, deptData }) => {
  return (
    <>
      <div>
        <Box
          sx={{
            marginLeft: '2%',
            marginBottom: '5%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'self-start',
          }}
        >
          <img
            src="/icons/building.svg"
            alt="Building Information"
            width={30}
            style={{ paddingRight: '5px' }}
          />
          <Typography
            sx={{
              color: '#0071DC',
              textAlign: 'center',
            }}
          >
            Building Information
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 170,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '18px 10px',
            padding: '10px 0px 0px',
            '@media (min-width: 768px) and (max-width: 900px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (max-width: 480px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
              width: '23rem',
              marginLeft: '2%',
            },
          }}
        >
          {data?.map((card, index) => (
            <Card
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 5px',
                borderRadius: '15px',
                border: '2px solid var(--Gray-Tone-1, #909196)',
                // background: 'var(--Background-Primary, #f5f3f0)',
                boxShadow: 'none',
                alignSelf: 'stretch',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                  borderRadius: '15px',
                  marginBottom: '-5px',
                  marginTop: '5px',
                  overflow: 'hidden',
                  whiteSpace: 'wrap',
                  textOverflow: 'ellipsis',
                  textAlign: 'center',
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    color: 'var(--black-100, #000)',
                    fontFamily: 'Bogle',
                    fontSize: rem(13),
                    fontWeight: 300,
                    lineHeight: '28px',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    whiteSpace: 'wrap',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                  }}
                >
                  {card.label ? card.label : 'Not Available'}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#A9A9A9',
                  marginBottom: '10px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '.3rem',
                }}
              >
                {'  '}
                <Typography
                  align="center"
                  sx={{
                    color: 'var(--Walmart-Blue, #0071DC)',
                    fontFamily: 'Bogle',
                    fontSize: rem(13),
                    fontWeight: 300,
                    lineHeight: '28px',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                  }}
                >
                  {card.value ? card.value : 'Not Available'}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: '15%',
            marginLeft: '2%',
            marginBottom: '5%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'self-start',
          }}
        >
          <img
            src="/icons/dept.svg"
            alt="Department Information"
            width={30}
            style={{ paddingRight: '5px' }}
          />
          <Typography
            sx={{
              color: '#0071DC',
              textAlign: 'center',
            }}
          >
            Department Information
          </Typography>
        </Box>
        <Box
          sx={{
            width: 260,
            height: 190,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '18px 10px',
            padding: '10px 0px 0px',
            '@media (min-width: 768px) and (max-width: 900px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (max-width: 480px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
              width: '23rem',
              marginLeft: '2%',
            },
          }}
        >
          {deptData?.map((card, index) => (
            <Card
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 5px',
                borderRadius: '15px',
                border: '2px solid var(--Gray-Tone-1, #909196)',
                // background: 'var(--Background-Primary, #f5f3f0)',
                boxShadow: 'none',
                alignSelf: 'stretch',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                  borderRadius: '15px',
                  marginBottom: '-5px',
                  marginTop: '5px',
                  overflow: 'hidden',
                  whiteSpace: 'wrap',
                  textOverflow: 'ellipsis',
                  textAlign: 'center',
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    color: 'var(--black-100, #000)',
                    fontFamily: 'Bogle',
                    fontSize: rem(13),
                    textAlign: 'center',
                    fontWeight: 300,
                    lineHeight: '28px',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    whiteSpace: 'wrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {card.label ? card.label : 'Not Available'}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#A9A9A9',
                  marginBottom: '10px',
                  textAlign: 'center',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '.3rem',
                }}
              >
                {'  '}
                <Typography
                  align="center"
                  sx={{
                    color: 'var(--Walmart-Blue, #0071DC)',
                    fontFamily: 'Bogle',
                    fontSize: rem(13),
                    textAlign: 'center',
                    fontWeight: 300,
                    lineHeight: '28px',
                    alignSelf: 'stretch',
                  }}
                >
                  {card.value ? card.value : 'Not Available'}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </div>
    </>
  );
};

export default MapAttributes;
