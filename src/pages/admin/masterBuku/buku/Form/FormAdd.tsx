import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormAdd = () => {
  return (
    <>
      <BreadcrumbsDefault
        header="Buku"
        menus={[
          {
            label: 'Buku',
            link: '/buku',
            icon: 'iconoir:book-solid',
          },
          {
            label: 'Tambah Buku',
            link: '/buku/tambah-buku',
          },
        ]}
      />
    </>
  );
};

export default FormAdd;
