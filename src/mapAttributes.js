import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import rem from '../../../helpers/PixelToRem';

const MapAttributes = ({ data, deptData }) => {
  return (
    <Box sx={{ padding: '0 2%' }}>
      {/* Building Information Section */}
      <Box sx={{ marginBottom: '5%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <img
            src="/icons/building.svg"
            alt="Building Information"
            width={30}
            style={{ marginRight: '5px' }}
          />
          <Typography variant="h6" sx={{ color: '#0071DC' }}>
            Building Information
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '18px 10px',
            padding: '10px 0',
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
                padding: '10px',
                borderRadius: '15px',
                border: '2px solid #909196',
                boxShadow: 'none',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#000',
                  fontFamily: 'Bogle',
                  fontSize: rem(13),
                  fontWeight: 300,
                  lineHeight: '28px',
                  textAlign: 'center',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {card.label || 'Not Available'}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#A9A9A9',
                  margin: '10px 0',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#0071DC',
                  fontFamily: 'Bogle',
                  fontSize: rem(13),
                  fontWeight: 300,
                  lineHeight: '28px',
                  textAlign: 'center',
                }}
              >
                {card.value || 'Not Available'}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Department Information Section */}
      <Box sx={{ marginTop: '15%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <img
            src="/icons/dept.svg"
            alt="Department Information"
            width={30}
            style={{ marginRight: '5px' }}
          />
          <Typography variant="h6" sx={{ color: '#0071DC' }}>
            Department Information
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '18px 10px',
            padding: '10px 0',
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
                padding: '10px',
                borderRadius: '15px',
                border: '2px solid #909196',
                boxShadow: 'none',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#000',
                  fontFamily: 'Bogle',
                  fontSize: rem(13),
                  fontWeight: 300,
                  lineHeight: '28px',
                  textAlign: 'center',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {card.label || 'Not Available'}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#A9A9A9',
                  margin: '10px 0',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#0071DC',
                  fontFamily: 'Bogle',
                  fontSize: rem(13),
                  fontWeight: 300,
                  lineHeight: '28px',
                  textAlign: 'center',
                }}
              >
                {card.value || 'Not Available'}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MapAttributes;