import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, styled } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import './layout.scss';
import CircleIcon from '@mui/icons-material/Circle';
import { FlexCol } from 'components/Layout/Layout';
import { useAppSelector } from 'store/configureStore';

const ListItemButtonChip = styled(ListItemButton)({
  borderRadius: 4,
  padding: '5px 10px'
});

const HeadItem = ({ onClick, item, isActive, ...props }) => {
  return (
    <ListItemButtonChip
      onClick={() => onClick(item)}
      sx={{
        background: isActive ? '#565771' : '#fff',
        color: isActive ? '#fff' : 'black',
        ':hover': {
          background: isActive ? '#565771' : '#fff',
          color: isActive ? '#fff' : 'black'
        }
      }}
      {...props}>
      {!item.isOpen ? (
        <KeyboardArrowRightIcon sx={{ width: '1rem', marginRight: '10px' }} />
      ) : (
        <KeyboardArrowUpIcon sx={{ width: '1rem', marginRight: '10px' }} />
      )}
      <ListItemText primary={item.title} sx={{ fontWeight: '500', fontSize: '14px' }} />
    </ListItemButtonChip>
  );
};

export const MenuItem = ({ item, parent, onClick, level = 0 }) => {
  const isParent = Boolean(item.subItems);
  const { activeChildId, activeParentId } = useAppSelector((state) => state.sidebar);
  const isActive = isParent ? item.id === activeParentId : item.id === activeChildId;

  return (
    <>
      {isParent && <HeadItem item={item} onClick={onClick} isActive={isActive} />}
      {isParent ? (
        <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
          <FlexCol sx={{ gap: 0.5 }}>
            {item?.subItems?.map((subItem, j) => {
              return (
                <MenuItem
                  item={subItem}
                  parent={item}
                  key={subItem.title}
                  onClick={onClick}
                  level={level + 1}
                />
              );
            })}
          </FlexCol>
        </Collapse>
      ) : (
        <Link
          onClick={() => onClick(parent, item)}
          to={item.path}
          key={item.title}
          component={RouterLink}
          sx={{ textDecoration: 'none' }}>
          <ListItemButtonChip
            sx={{
              background: isActive ? '#878787' : '#F5F5F5',
              color: isActive ? '#fff' : 'black',
              ':hover': {
                background: isActive ? '#878787' : '#F5F5F5',
                color: isActive ? '#fff' : 'black'
              }
            }}>
            <CircleIcon sx={{ fontSize: 5, margin: '0 15px' }} />
            <ListItemText primary={item.title} />
          </ListItemButtonChip>
        </Link>
      )}
    </>
  );
};

// export default function MenuItem({ handleClick, item }) {
//   const { pathname } = useLocation();

//   return (
//     <React.Fragment>
//       <HeadItem onClick={handleClick} item={item} />

//       {item?.subItems?.length > 0 && (
//         <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {item?.subItems?.map((subItem, j) => {
//               const isActive = isCurrentPath(subItem.path, pathname);
//               return (
//                 <Link
//                   to={subItem.path}
//                   key={j}
//                   component={RouterLink}
//                   sx={{ textDecoration: 'none' }}>
//                   <ListItemButton
//                     sx={{
//                       pl: 4,
//                       background: isActive ? '#1fbdf8' : '#fff',
//                       color: isActive ? '#fff' : 'normal',
//                       '&:hover': {
//                         background: isActive ? '#1fbdf8' : 'normal'
//                       }
//                     }}
//                     key={j}>
//                     <ListItemText primary={subItem.title} />
//                   </ListItemButton>
//                 </Link>
//               );
//             })}
//           </List>
//         </Collapse>
//       )}
//     </React.Fragment>
//   );
// }
