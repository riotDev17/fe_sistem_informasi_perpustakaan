import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../store/themeConfigSlice";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Rak Buku'));
  });

  return (
    <>
      <h1>Rak Buku</h1>
    </>
  );
};

export default Index;
