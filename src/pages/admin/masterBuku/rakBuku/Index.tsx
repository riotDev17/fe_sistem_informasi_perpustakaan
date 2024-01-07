import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import BreadcrumbsBasic from '../../../../components/breadcrumbs/BreadcrumbsBasic';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Rak Buku'));
  });

  return (
    <>
      <div className="flex justify-end">
        <BreadcrumbsDefault
          menus={[
            {
              label: 'Rak Buku',
              link: '/rak-buku',
              icon: 'bxs:book',
            },
          ]}
        />
      </div>
    </>
  );
};

export default Index;
