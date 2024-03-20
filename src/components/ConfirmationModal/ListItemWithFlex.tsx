import { Flex, ListItem, ListItemProps } from '@chakra-ui/react';
import React from 'react';

type ListItemWithFlexProps = ListItemProps & {
  children: React.ReactNode;
};
const ListItemWithFlex: React.FC<ListItemWithFlexProps> = ({
  children,
  ...props
}) => (
  <ListItem
    as={Flex}
    p="16px"
    alignItems="center"
    justifyContent="space-between"
    border="1px solid"
    borderColor="--Sand-Light-5"
    {...props}
  >
    {children}
  </ListItem>
);

export default ListItemWithFlex;
