import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { styled } from '@mui/material/styles';

const Icon = styled((props) => (
  <div {...props}>
    <div className="n py-1.3 px-1.7 rounded-full  bg-pink-500 shadow">
      <ImportExportIcon />
    </div>
    <div className="y py-1.3 px-1.7 rounded-full  bg-gray-100 shadow">
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

const SwitchIcon = ({handleMenuItemClick, outputToken}) => {

  const 
  
  
  return (
    <div className="text-center -mt-2">
      <button
        className="w-fit"
        onClick={(event) => handleMenuItemClick(event, 1, outputToken[1])}
      >
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
