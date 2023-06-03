const { styled, Box } = require('@mui/material');

export const TextHelper = styled('div')({
  fontSize: '14px',
  color: '#818181',
  float: 'right',
  textAlign: 'right'
});
export const TextHelperError = styled('p')({
  color: '#FF647C',
  fontWeight: 400,
  fontSize: '0.75rem',
  margin: '3px 14px 0'
});
export const Flex = styled(Box)({
  display: 'flex'
});
export const FlexRow = styled(Flex)({
  flexDirection: 'row'
});
export const FlexCol = styled(Flex)({
  flexDirection: 'column'
});
export const FormLayout = styled(FlexCol)({
  marginTop: 3,
  marginBottom: 3,
  gap: 2
});
export const HalfBox = styled(Box)({
  width: '50%'
});
export const FlexAlignItemsCenter = styled(Flex)({
  alignItems: 'center'
});
export const FlexAlignCenterJustifySpaceBetween = styled(Flex)({
  justifyContent: 'space-between',
  alignItems: 'center'
});
