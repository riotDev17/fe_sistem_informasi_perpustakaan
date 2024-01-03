import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../store/themeConfigSlice";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Buku'));
  });

  return (
    <>
      <h1>Buku</h1>
    </>
  );
};

export default Index;
