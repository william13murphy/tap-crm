/*
DynamicBackRoute:
* Allows you to remove the current page from the url, for dynamic back-linking in the app.

Example:
```
<Link
  to={dynamicBackRoute(
    this.props.match.url,
    `/detail/${this.props.schoolId}/discounts`
  )}
>
  From Inner Link with Id
</Link>
```
*/
export function dynamicBackRoute(url, currentPage) {
  const backRoute = url.substr(0, url.indexOf(currentPage));
  return backRoute;
}

export function getSchoolIdFromPath(pathname) {
  const urlLeft = '/app/school-app/';
  if (pathname.indexOf(urlLeft) === -1) {
    return;
  }
  const detailIndex = pathname.indexOf(urlLeft);
  const schoolIdIndex = urlLeft.length + detailIndex;
  const pathLeft = pathname.substring(0, schoolIdIndex);
  const pathCenterRight = pathname.substring(pathLeft.length);
  const nextSlash = pathCenterRight.indexOf('/');
  const pathCenter = pathCenterRight.substring(0, nextSlash);
  return pathCenter;
}

export function replaceSchoolIdInUrl({ schoolId, pathname }) {
  const urlLeft = '/app/school-app/';
  if (pathname.indexOf(urlLeft) === -1) {
    return;
  }
  const detailIndex = pathname.indexOf(urlLeft);
  const schoolIdIndex = urlLeft.length + detailIndex;
  const pathLeft = pathname.substring(0, schoolIdIndex);
  const pathCenterRight = pathname.substring(pathLeft.length);
  const nextSlash = pathCenterRight.indexOf('/');
  const pathRight = pathCenterRight.substring(nextSlash);
  const pathRightNoSlash = pathRight.substr(1);
  const pathRightNextSlash = pathRightNoSlash.indexOf('/');
  let pathRightInner = '';

  // Redirect user to base of the section they are in (disabled):
  pathRightInner = '/' + pathRightNoSlash;

  // Since access control is not enabled for most of the app,
  // must redirect user to base school page, or else
  // they will see content that they shouldn't.
  // const schoolsRedirectPage = '/staff';
  // Option 1 (unsecure!): Send them to the original path.
  // const newPath = pathLeft + schoolId + pathRight;
  // Option 2 (most bullet-proof): Send them to the school's redirect page, currently "staff".
  // const newPath = pathLeft + schoolId + schoolsRedirectPage; // + pathRight; // pathRight removed to prevent access control issues
  // Option 3 (preferred UX): Send them to the base page for the section they are in:
  const newPath = pathLeft + schoolId + pathRightInner;

  return newPath;
}

export function mapSchoolIdToRoutes(schoolId, appRoutes) {
  const baseSchoolAppUrl = `/app/school-app/${schoolId}`;
  return appRoutes.map((cV, i) => {
    if (cV.path.indexOf('/app') === -1) {
      // New path, prepend the baseSchoolAppUrl:
      cV.path = `${baseSchoolAppUrl}${cV.path}`;
    } else {
      // Path already exists, so only replace the schoolId:
      const newPath = replaceSchoolIdInUrl({
        schoolId,
        pathname: cV.path,
      });
      cV.path = newPath;
    }
    return cV;
  });
}
