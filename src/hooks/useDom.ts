import { useEffect, useRef, useState } from 'react';

const useDom = (id: string = 'root') => {
  const domRef = useRef(document.createElement('div'));

  useEffect(() => {
    let parentEle = document.querySelector(`#${id}`);
    if (!parentEle) {
      parentEle = document.createElement('div');
      parentEle.setAttribute('id', id);
    }
    parentEle.appendChild(domRef.current);

    return () => {
      parentEle && domRef.current.remove();
    }
  });
  return domRef.current;
};

export { useDom }
