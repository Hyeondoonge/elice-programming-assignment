import React from 'react';

export interface ComponentProps {
  children?: React.ReactNode;
}

export interface ChipProps {
  label: string;
  selected: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export interface StyledChipProps {
  selected: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export interface FilterProps {
  name: string;
  selected: boolean;
}

export interface PageNumberProps {
  onClick: (page: number) => void;
  selected: boolean;
}

export interface IconTextProps {
  Icon: any;
  text: string;
}
