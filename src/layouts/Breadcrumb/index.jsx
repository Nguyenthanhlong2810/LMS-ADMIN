import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';

import { breadcrumbNameMap } from './const';
import { ROUTE_PATH } from 'consts';
import _ from 'lodash';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Breadcrumb = () => {
  const location = useLocation();
  let [params] = useSearchParams();

  const pathnames = location.pathname.split('/').filter((x) => !parseInt(x) && x);
  if (!breadcrumbNameMap[`/${pathnames[0]}`]) return null;
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <LinkRouter underline="hover" to="/">
        Admin
      </LinkRouter>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        if (!breadcrumbNameMap[to]) {
          return null;
        }
        if (index === pathnames.length - 1)
          return (
            <Typography color="text.primary" key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          );

        const courseId = params.getAll('courseId')[0];
        let link = to;
        if (to === ROUTE_PATH.LESSON_STRUCTURE) {
          link = to + '/' + courseId;
        }
        return _.values(ROUTE_PATH).includes(to) ? (
          <LinkRouter underline="hover" to={link} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        ) : (
          <Link underline="none" key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
