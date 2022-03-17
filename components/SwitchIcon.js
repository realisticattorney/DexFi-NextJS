import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { styled } from '@mui/material/styles';
import { useRef, useCallback } from 'react';

const Icon = styled((props) => (
  <div {...props}>
    <div className="n py-1.1 px-1.7 rounded-full  bg-pink-500 shadow-slate-500 shadow-sm">
      <ImportExportIcon />
    </div>
    <div className="y py-1.1 px-1.7 rounded-full  bg-gray-100 shadow-slate-500 shadow-sm">
      <ArrowDownwardIcon />
    </div>
  </div>
))`
  & > .y {
    display: block;
  }
  & > .y > * {
    font-size: 1.3rem;
  }
  & > .n > * {
    font-size: 1.3rem;
    color: #fff;
  }
  & > .n {
    display: none;
  }
  &:hover > .y {
    display: none;
  }
  &:hover > .n {
    display: block;
  }
`;

const SwitchIcon = ({ handleMenuItemClick, outputToken, inputToken }) => {
  const ref = useRef(true);
  const handleClick = useCallback(() => {
    if (outputToken[1] === 1 || inputToken[1] === 1) {
      handleMenuItemClick(1, outputToken[1]);
    } else if (ref.current === true) {
      handleMenuItemClick(outputToken[1], 1);
      ref.current = false;
    } else {
      handleMenuItemClick(inputToken[1], 2);
      ref.current = true;
    }
  }, [handleMenuItemClick, outputToken, inputToken]);

  return (
    <div className="text-center -mt-2 -mb-2">
      <button className="w-fit" onClick={() => handleClick()}>
        <Icon
          sx={{
            color: '#EC4899',
            fontSize: 16,
          }}
        />
      </button>
    </div>
  );
};

export default SwitchIcon;
