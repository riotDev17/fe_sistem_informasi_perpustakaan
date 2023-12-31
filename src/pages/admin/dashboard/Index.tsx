import BreadcrumbsBasic from '../../../components/breadcrumbs/BreadcrumbsBasic';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import SearchBox from '../../../components/searchs/SearchBox';
import SearchOverlay from '../../../components/searchs/SearchOverlay';
import SearchRounded from '../../../components/searchs/SearchRounded';
import TableBasic from '../../../components/tables/TableBasic';

const Index = () => {
  // const columns = [
  //   { accessor: 'id', title: 'ID' },
  //   { accessor: 'firstName', title: 'First Name' },
  //   { accessor: 'lastName', title: 'Last Name' },
  //   { accessor: 'email', title: 'Email' },
  //   { accessor: 'phone', title: 'Phone' },
  // ];

  const menus = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/category' },
    { label: 'Subcategory', link: '/category/subcategory' },
    // Tambahkan menu tambahan jika diperlukan
  ];

  const menus2 = [
    { label: 'Home', link: '/', icon: 'bx:bx-home' },
    { label: 'Category', link: '/category', icon: 'bx:bx-category' },
    { label: 'Subcategory', link: '/category/subcategory', icon: 'bx:bx-subdirectory-right' },
  ];

  return (
    <>
      {/* <h1>Hello World</h1> */}
      <BreadcrumbsBasic menus={menus} />
      <BreadcrumbsDefault menus={menus2} />
      {/* <SearchRounded /> */}
      {/* <SearchBox /> */}
      {/* <SearchOverlay /> */}
    </>
  );
};

export default Index;
