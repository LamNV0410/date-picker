import {
  Box
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import './index.scss'
import { getDefaultState } from "../utils";

const Range = (props) => {
  const { handleActiveClicked, isActive } = props;
  const state = getDefaultState();
  const { rangesPresets } = state
  const [isActiveState, setIsActiveState] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setIsActiveState(isActive);
  }, [isActive])

  const handleRangeClicked = (index, id, name) => {
    setActiveIndex(index);
    handleActiveClicked(id, name);
  }
  return (
    <>
      {
        rangesPresets && rangesPresets.map((range, index) => (
          <li
            key={index}
            onClick={() => handleRangeClicked(index, range.id, range.name)}
            className={isActiveState && activeIndex === index ? 'active' : ''}>
            <span>{range.name}</span>
          </li>
        ))
      }
    </>
  )
}

function DefinedRange(props) {
  const { onActiveClicked, isActive } = props;
  const handleActiveClicked = (id, value) => {
    onActiveClicked(id, value);
  }
  return (
    <Box className='wrapper-defined-range'>
      <Box className='defined-range-header'>
        Presets
      </Box>
      <Box className='defined-range-content'>
        <ul>
          <Range handleActiveClicked={handleActiveClicked} isActive={isActive} />
        </ul>
      </Box>
    </Box>
  );
}

export default DefinedRange;
