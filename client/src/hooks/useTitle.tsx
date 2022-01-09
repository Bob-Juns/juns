import { useState, useEffect } from 'react';

const useTitle = () => {
  const [title, setTitle] = useState<any>(null);

  useEffect(() => {
    const htmlTitle: any = document.querySelector('title');
    htmlTitle.innerText = title;
  }, [title]);

  return setTitle;
};

export default useTitle;
