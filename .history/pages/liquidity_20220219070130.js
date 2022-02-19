import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import MenuItemList from '../components/MenuItemList.js';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { styled } from '@mui/material/styles';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Liquidity = () => {
  return (
    <div>liquidity</div>
  )
}

export default Liquidity