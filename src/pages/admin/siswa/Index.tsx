import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../store/themeConfigSlice";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Siswa'));
  });

  return (
    <>
      <h1>Siswa</h1>
    </>
  );
};

export default Index;
